import { IValidation } from "@gameapi/shared/domain/interfaces/validation.js";
import { UpdatePasswordRequest } from "./update-password.dto.js";
import { z } from "zod";

export class UpdatePasswordValidation
  implements IValidation<UpdatePasswordRequest>
{
  private static schema = z
    .object({
      username: z.string().min(4).max(10),
      password: z.string(),
    })
    .strict();

  public validate(request: unknown): UpdatePasswordRequest {
    return UpdatePasswordValidation.schema.parse(request);
  }
}
