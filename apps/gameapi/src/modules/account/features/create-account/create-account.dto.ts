export type CreateAccountRequest = Readonly<{
  username: string;
  password: string;
}>;

export type CreateAccountResponse = Readonly<{
  username: string;
}>;
