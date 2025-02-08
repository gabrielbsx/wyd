import { IUseCase } from "@gameapi/shared/domain/interfaces/usecase.js";
import { IAccountValidation } from "@gameapi/modules/account/domain/account.validation.js";
import { IValidation } from "@gameapi/shared/domain/interfaces/validation.js";
import { UpdatePasswordRequest } from "./update-password.dto.js";
import { ICryptography } from "@wyd/shared/cryptography/cryptography.cjs";
import { IQueue } from "@wyd/shared/queue.js";
import { InvalidPasswordException } from "@gameapi/modules/account/domain/exceptions/invalid-password.exception.js";
import { AccountNotFoundException } from "@gameapi/modules/account/domain/exceptions/account-not-found.exception.js";
import { IAccountRepository } from "@gameapi/modules/account/domain/account.repository.js";

export class UpdatePasswordUseCase implements IUseCase {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _updatePasswordValiadtion: IValidation<UpdatePasswordRequest>,
    private readonly _accountValidation: IAccountValidation,
    private readonly _cryptography: ICryptography,
    private readonly _queue: IQueue
  ) {}

  public async execute(request: unknown) {
    const { username, password } =
      await this._updatePasswordValiadtion.validate(request);

    const decryptedPassword = await this._cryptography.decrypt(password);

    if (!this._accountValidation.isValidPassword(decryptedPassword)) {
      await this._queue.publish("update-password/invalid-password", {
        username,
      });

      throw new InvalidPasswordException();
    }

    const hasAccount = await this._accountRepository.findAccountByUsername(
      username
    );

    if (!hasAccount) {
      await this._queue.publish("update-password/account-not-found", {
        username,
      });

      throw new AccountNotFoundException(username);
    }

    await this._accountRepository.updatePassword(username, password);

    await this._queue.publish("update-password/password-updated", { username });
  }
}
