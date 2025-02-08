import { BadRequestException } from "@gameapi/shared/domain/exceptions/bad-request.exception.js";

export class InvalidPasswordException extends BadRequestException {
  constructor() {
    super("Password must contain only letters and numbers");
  }
}
