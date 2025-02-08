import { FileSystemAccountRepository } from "@gameapi/modules/account/data-source/fs-account.repository.js";
import { CreateAccountUseCase } from "./create-account.usecase.js";
import { CreateAccountValidation } from "./create-account.validation.js";
import { Queue } from "@wyd/shared/queue.js";
import { env } from "@gameapi/shared/env/index.js";
import { AccountValidation } from "@gameapi/modules/account/domain/account.validation.js";
import { Cryptography } from "@wyd/shared/cryptography/cryptography.js";

export function createAccountFactory() {
  const repository = new FileSystemAccountRepository();
  const requestValidation = new CreateAccountValidation();
  const queue = new Queue();
  const cryptography = new Cryptography(env.KEYS_FOLDER);
  const accountValidation = new AccountValidation();

  const useCase = new CreateAccountUseCase(
    repository,
    requestValidation,
    queue,
    cryptography,
    accountValidation
  );

  return useCase;
}
