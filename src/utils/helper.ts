import bcrypt from "bcrypt";

export const hash = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const compareHash = (hash: string, password: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
