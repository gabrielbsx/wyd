import { FileSystemAccountRepository } from "@gameapi/modules/account/data-source/fs-account.repository.js";
import { Queue } from "@wyd/shared/queue.js";
import { Cryptography } from "@wyd/shared/cryptography/cryptography.cjs";
import { env } from "@gameapi/shared/env/index.js";
import { AccountValidation } from "@gameapi/modules/account/domain/account.validation.js";
import { UpdatePasswordValidation } from "./update-password.validation.js";
import { UpdatePasswordUseCase } from "./update-password.usecase.js";

export function updatePasswordFactory() {
  const repository = new FileSystemAccountRepository();
  const requestValidation = new UpdatePasswordValidation();
  const queue = new Queue();
  const cryptography = new Cryptography(env.KEYS_FOLDER);
  const accountValidation = new AccountValidation();

  const useCase = new UpdatePasswordUseCase(
    repository,
    requestValidation,
    accountValidation,
    cryptography,
    queue
  );

  return useCase;
}
