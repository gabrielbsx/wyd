import { NotFoundException } from "@gameapi/shared/domain/exceptions/not-found.exception.js";

export class AccountNotFoundException extends NotFoundException {
  constructor(username: string) {
    super(`Account with username ${username} not found`);
  }
}
