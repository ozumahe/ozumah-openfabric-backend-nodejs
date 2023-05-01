import type { Request, Response, NextFunction } from "express";
import * as Errors from "../errors";
import { verifyJWT } from "../utils/jwt";
import { User } from "../utils/types";

const authenticateUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new Errors.UnauthenticatedError("Not Authorized");
  }

  try {
    const { name, userId, role }: any = verifyJWT({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new Errors.UnauthenticatedError("Not Authorized");
  }
};

const authenticatePermission = (...roles: any) => {
  return (req: Request | any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new Errors.UnauthorizedError("You are Not Permited to this Route");
    }
    next();
  };
};

export { authenticateUser, authenticatePermission };
