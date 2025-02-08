import { IQueue } from "@wyd/shared/queue.js";
import { createAccountFactory } from "./create-account.factory.js";

export function createAccountQueue(queue: IQueue) {
  const createAccountUseCase = createAccountFactory();

  queue.subscriber(
    "create-account",
    createAccountUseCase.execute.bind(createAccountUseCase)
  );
}
