import { createAccountQueue } from "@gameapi/modules/account/features/create-account/create-account.queue.js";
import { updatePasswordQueue } from "@gameapi/modules/account/features/update-password/update-password.queue.js";
import { importDonationQueue } from "@gameapi/modules/donation/features/import-donation/import-donation.queue.js";
import { Queue } from "../../../../packages/shared/dist/queue.js";

export function listenQueue() {
  const queue = new Queue();

  createAccountQueue(queue);
  updatePasswordQueue(queue);
  importDonationQueue(queue);

  queue.listen();
}
