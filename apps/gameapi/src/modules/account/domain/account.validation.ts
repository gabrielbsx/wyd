import { z } from "zod";

export interface IAccountValidation {
  isValidUsername: (username: string) => boolean;
  isValidPassword: (password: string) => boolean;
}

export class AccountValidation implements IAccountValidation {
  static usernameSchema = z.string().min(4).max(10);
  static passwordSchema = z.string().min(4).max(10);

  public isValidUsername(username: string) {
    return AccountValidation.usernameSchema.safeParse(username).success;
  }

  public isValidPassword(password: string) {
    return AccountValidation.passwordSchema.safeParse(password).success;
  }
}
