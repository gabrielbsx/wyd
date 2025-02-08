import { z } from "zod";
import { CreateAccountRequest } from "./create-account.dto.js";

export interface ICreateAccountValidation {
  validate(request: unknown): Promise<CreateAccountRequest>;
}

export class CreateAccountValidation implements ICreateAccountValidation {
  static schema = z.object({
    username: z.string().min(4).max(10),
    password: z.string(),
  });

  public async validate(request: unknown): Promise<CreateAccountRequest> {
    return CreateAccountValidation.schema.parse(request);
  }
}
