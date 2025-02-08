import { IValidation } from "@gameapi/shared/domain/interfaces/validation.js";
import { ImportDonationRequest } from "./import-donation.dto.js";
import { z } from "zod";

export class ImportDonationValidation
  implements IValidation<ImportDonationRequest>
{
  private static schema = z.object({
    username: z.string().min(3).max(10),
    coins: z.number(),
    items: z.array(z.string()),
  });

  public validate(request: unknown) {
    return ImportDonationValidation.schema.parse(request);
  }
}
