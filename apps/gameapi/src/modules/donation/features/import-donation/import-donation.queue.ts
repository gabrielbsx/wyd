import { IQueue } from "@wyd/shared/queue.js";
import { importDonationFactory } from "./import-donation.factory.js";

export function importDonationQueue(queue: IQueue) {
  const useCase = importDonationFactory();
  queue.subscriber("import-donation", useCase.execute.bind(useCase));
}
