import { z } from "zod";
import { CreateAccountRequest } from "./create-account.dto.js";
import { IValidation } from "@gameapi/shared/domain/interfaces/validation.js";

export class CreateAccountValidation
  implements IValidation<CreateAccountRequest>
{
  static schema = z
    .object({
      username: z.string().min(4).max(10),
      password: z.string(),
    })
    .strict();

  static passwordSchema = z.string().min(4).max(10);

  public validate(request: unknown): CreateAccountRequest {
    return CreateAccountValidation.schema.parse(request);
  }
}
