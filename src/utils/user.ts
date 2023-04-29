import { User } from "../models/userModel";

const createTokenUser = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export { createTokenUser };
