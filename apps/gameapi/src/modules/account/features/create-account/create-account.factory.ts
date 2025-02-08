import { AccountRepository } from "@gameapi/data-source/account.repository.js";
import { CreateAccountUseCase } from "./create-account.usecase.js";
import { CreateAccountValidation } from "./create-account.validation.js";
import { Queue } from "@wyd/shared/queue.js";
import { Cryptography } from "@wyd/shared/cryptography/cryptography.cjs";
import { env } from "@gameapi/shared/env/index.js";

export function createAccountFactory() {
  const accountRepository = new AccountRepository();
  const createAccountValidation = new CreateAccountValidation();
  const queue = new Queue();
  const cryptography = new Cryptography(env.KEYS_FOLDER);

  const createAccountUseCase = new CreateAccountUseCase(
    accountRepository,
    createAccountValidation,
    queue,
    cryptography
  );

  return createAccountUseCase;
}
