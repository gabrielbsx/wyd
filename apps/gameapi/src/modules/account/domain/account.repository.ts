import { AccountProps } from "./account.js";

export interface IAccountRepository {
  createAccount: (account: AccountProps) => Promise<void>;
  findAccountByUsername: (username: string) => Promise<AccountProps>;
  hasAccountByUsername: (username: string) => Promise<boolean>;
  updatePassword: (username: string, password: string) => Promise<void>;
}
