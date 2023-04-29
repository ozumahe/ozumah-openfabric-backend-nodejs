import bcrypt from "bcryptjs";

const hashPass = async (password: string): Promise<string> => {
  let hashedPass;
  const salt = await bcrypt.genSalt(10);
  hashedPass = await bcrypt.hash(password, salt);

  return hashedPass;
};

const comparePassword = async (
  canditatePassword: string,
  userPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(canditatePassword, userPassword);
  return isMatch;
};

export { hashPass, comparePassword };
