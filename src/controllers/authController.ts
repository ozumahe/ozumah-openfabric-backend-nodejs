import { StatusCodes } from "http-status-codes";
import UserSchema from "../models/UserSchema";
import { attachCookiesToResponse } from "../utils/jwt";
import createTokenUser from "../utils/createTokenUser";
import { Request, Response } from "express";
import * as Errors from "../errors";

// SIGN UP
const signUp = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const existingEmail = await UserSchema.findOne({ email });

  if (existingEmail) {
    throw new Errors.BadRequestError("Email Aready Exit");
  }

  const user = await UserSchema.create({ name, email, password, role });

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// LOGIN
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    throw new Errors.BadRequestError("Please Provide email and password");
  }

  const user: any = await UserSchema.findOne({ email });

  if (!user) {
    throw new Errors.UnauthenticatedError(`No user found with email ${email}`);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new Errors.UnauthenticatedError("Invalid Password");
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export { login, signUp };
