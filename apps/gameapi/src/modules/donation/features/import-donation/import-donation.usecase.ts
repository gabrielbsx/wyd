import { IUseCase } from "@gameapi/shared/domain/interfaces/usecase.js";
import { IDonationRepository } from "@gameapi/modules/donation/domain/donation.repository.js";
import { IValidation } from "@gameapi/shared/domain/interfaces/validation.js";
import { ImportDonationRequest } from "./import-donation.dto.js";
import { IQueue } from "@wyd/shared/queue.js";

export class ImportDonationUseCase implements IUseCase {
  constructor(
    private readonly _donationRepository: IDonationRepository,
    private readonly _importDonationValidation: IValidation<ImportDonationRequest>,
    private readonly _queue: IQueue
  ) {}

  public async execute(request: unknown) {
    const { username, coins, items } =
      this._importDonationValidation.validate(request);

    await this._donationRepository.importCoins(username, coins);
    await this._queue.publish("import-donation/coins-imported", {
      username,
      coins,
    });

    await this._donationRepository.importItems(username, items);
    await this._queue.publish("import-donation/items-imported", {
      username,
      items,
    });

    await this._queue.publish("import-donation/imported-sucessfully", {
      username,
      coins,
      items,
    });
  }
}
