import { IAccountRepository } from "@gameapi/modules/account/domain/account.repository.js";
import { AccountAlreadyExistsException } from "@gameapi/modules/account/domain/exceptions/account-already-exists.exception.js";
import { IQueue } from "@wyd/shared/queue.js";
import { ICryptography } from "@wyd/shared/cryptography/cryptography.cjs";
import { InvalidPasswordException } from "@gameapi/modules/account/domain/exceptions/invalid-password.exception.js";
import { IUseCase } from "@gameapi/shared/domain/interfaces/usecase.js";
import { IValidation } from "@gameapi/shared/domain/interfaces/validation.js";
import { CreateAccountRequest } from "./create-account.dto.js";
import { IAccountValidation } from "@gameapi/modules/account/domain/account.validation.js";

export class CreateAccountUseCase implements IUseCase {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _createAccountValidation: IValidation<CreateAccountRequest>,
    private readonly _queue: IQueue,
    private readonly _cryptography: ICryptography,
    private readonly _accountValidation: IAccountValidation
  ) {}

  public async execute(request: unknown) {
    const { username, password } = await this._createAccountValidation.validate(
      request
    );

    const decryptedPassword = await this._cryptography.decrypt(password);

    if (!this._accountValidation.isValidPassword(decryptedPassword)) {
      await this._queue.publish("create-account/invalid-password", {
        username,
      });

      throw new InvalidPasswordException();
    }

    const hasAccount = await this._accountRepository.hasAccountByUsername(
      username
    );

    if (hasAccount) {
      await this._queue.publish("create-account/account-already-exists", {
        username,
      });

      throw new AccountAlreadyExistsException(username);
    }

    await this._accountRepository.createAccount({
      username,
      password: decryptedPassword,
    });

    await this._queue.publish("create-account/account-created", { username });
  }
}
