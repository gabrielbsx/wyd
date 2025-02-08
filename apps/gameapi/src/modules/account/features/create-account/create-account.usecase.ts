import { IAccountRepository } from "@gameapi/data-source/account.repository.js";
import { AccountAlreadyExistsException } from "@gameapi/modules/account/domain/exceptions/account-already-exists.exception.js";
import { ICreateAccountValidation } from "./create-account.validation.js";
import { IQueue } from "@wyd/shared/queue.js";
import { ICryptography } from "@wyd/shared/cryptography/cryptography.cjs";
import { isValidPassword } from "@gameapi/modules/account/domain/account.js";
import { InvalidPasswordException } from "@gameapi/modules/account/domain/exceptions/invalid-password.exception.js";

export interface ICreateAccountUseCase {
  execute(request: unknown): Promise<void>;
}

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _createAccountValidation: ICreateAccountValidation,
    private readonly _queue: IQueue,
    private readonly _cryptography: ICryptography
  ) {}

  public async execute(request: unknown) {
    const { username, password } = await this._createAccountValidation.validate(
      request
    );

    const hasAccount = await this._accountRepository.hasAccountByUsername(
      username
    );

    if (hasAccount) {
      await this._queue.publish("create-account/account-already-exists", {
        username,
      });

      throw new AccountAlreadyExistsException(username);
    }

    const passwordDecrypted = await this._cryptography.decrypt(password);

    if (!isValidPassword(passwordDecrypted)) {
      await this._queue.publish("create-account/invalid-password", {
        username,
      });

      throw new InvalidPasswordException();
    }

    await this._accountRepository.createAccount({
      username,
      password: passwordDecrypted,
    });

    await this._queue.publish("create-account/account-created", { username });
  }
}
