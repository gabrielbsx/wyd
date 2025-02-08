import { IQueue } from "@wyd/shared/queue.js";
import { createAccountFactory } from "./create-account.factory.js";

export function createAccountQueue(queue: IQueue) {
  const useCase = createAccountFactory();
  queue.subscriber("create-account", useCase.execute.bind(useCase));
}
