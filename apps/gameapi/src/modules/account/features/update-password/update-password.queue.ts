import { IQueue } from "@wyd/shared/queue.js";
import { updatePasswordFactory } from "./update-password.factory.js";

export function updatePasswordQueue(queue: IQueue) {
  const useCase = updatePasswordFactory();
  queue.subscriber("update-password", useCase.execute.bind(useCase));
}
