export type UpdatePasswordRequest = Readonly<{
  username: string;
  password: string;
}>;

export type UpdatePasswordResponse = Readonly<{
  username: string;
}>;
