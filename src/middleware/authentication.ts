import type { Request, Response, NextFunction } from "express";

import * as Errors from "../errors";
import { verifyJWT } from "../utils/jwt";

const authenticateUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Errors.UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { name, userId, role }: any = verifyJWT({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new Errors.UnauthenticatedError(
      "Not authorized to access this route"
    );
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
