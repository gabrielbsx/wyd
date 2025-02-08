export type AccountProps = Readonly<{
  username: string;
  password: string;
}>;

export const firstAlphabeticOrEtc = (username: string) => {
  const alphaticRegex = /^[a-zA-Z]/;
  const firstLetter = username?.charAt(0);
  return alphaticRegex.test(firstLetter) ? firstLetter : "etc";
};

export const isValidPassword = (password: string) => {
  const regex = /^[a-zA-Z0-9]{4,10}$/;
  return regex.test(password);
};
