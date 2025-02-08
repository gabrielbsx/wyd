import { BadRequestException } from "@gameapi/shared/domain/exceptions/bad-request.exception.js";

export class AccountAlreadyExistsException extends BadRequestException {
  constructor(username: string) {
    super(`Account with username ${username} already exists`);

    this.name = "AccountAlreadyExistsException";
  }
}
