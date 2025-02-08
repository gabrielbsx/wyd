import { createAccountQueue } from "@gameapi/modules/account/features/create-account/create-account.queue.js";
import { Queue } from "@wyd/shared/queue.js";

export function listenQueue() {
  const queue = new Queue();

  createAccountQueue(queue);

  queue.listen();
}
