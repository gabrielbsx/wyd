import { FileSystemDonationRepository } from "@gameapi/modules/donation/data-source/fs-donation.repository.js";
import { ImportDonationUseCase } from "./import-donation.usecase.js";
import { ImportDonationValidation } from "./import-donation.validation.js";
import { Queue } from "@wyd/shared/queue.js";

export function importDonationFactory() {
  const repository = new FileSystemDonationRepository();
  const requestValidation = new ImportDonationValidation();
  const queue = new Queue();

  const useCase = new ImportDonationUseCase(
    repository,
    requestValidation,
    queue
  );

  return useCase;
}
