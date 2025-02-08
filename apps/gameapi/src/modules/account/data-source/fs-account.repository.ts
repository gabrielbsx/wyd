import {
  AccountProps,
  firstAlphabeticOrEtc,
} from "@gameapi/modules/account/domain/account.js";
import { IAccountRepository } from "@gameapi/modules/account/domain/account.repository.js";
import { AccountAlreadyExistsException } from "@gameapi/modules/account/domain/exceptions/account-already-exists.exception.js";
import { AccountNotFoundException } from "@gameapi/modules/account/domain/exceptions/account-not-found.exception.js";
import { env } from "@gameapi/shared/env/index.js";
import { existsSync } from "node:fs";

import { open } from "node:fs/promises";
import { join } from "node:path";

export class FileSystemAccountRepository implements IAccountRepository {
  private _getAccountDirectory = (username: string) =>
    join(env.ACCOUNT_DIR, firstAlphabeticOrEtc(username), username);

  public async createAccount({ username, password }: AccountProps) {
    const accountFileDirectory = this._getAccountDirectory(username);

    if (await this.hasAccountByUsername(username))
      throw new AccountAlreadyExistsException(username);

    const accountFileHandle = await open(accountFileDirectory, "w");
    const passwordBuffer = Buffer.from(password);
    const usernameBuffer = Buffer.from(username);
    await accountFileHandle.write(usernameBuffer, 0, username.length, 0);
    await accountFileHandle.write(passwordBuffer, 0, password.length, 16);
    await accountFileHandle.close();
  }

  public async hasAccountByUsername(username: string) {
    const accountFileDirectory = this._getAccountDirectory(username);
    return await existsSync(accountFileDirectory);
  }

  public async findAccountByUsername(username: string) {
    const accountFileDirectory = this._getAccountDirectory(username);

    if (!this.hasAccountByUsername(username))
      throw new AccountNotFoundException(username);

    const accountFileHandle = await open(accountFileDirectory, "r");
    const passwordBuffer = Buffer.alloc(16);
    await accountFileHandle.read(passwordBuffer, 0, 16, 16);
    const password = passwordBuffer.toString();
    await accountFileHandle.close();

    return {
      username,
      password,
    };
  }

  public async updatePassword(username: string, password: string) {
    const accountFileDirectory = this._getAccountDirectory(username);

    if (!this.hasAccountByUsername(username))
      throw new AccountNotFoundException(username);

    const accountFileHandle = await open(accountFileDirectory, "w");
    const passwordBuffer = Buffer.from(password);
    await accountFileHandle.write(passwordBuffer, 0, password.length, 16);
    await accountFileHandle.close();
  }
}
