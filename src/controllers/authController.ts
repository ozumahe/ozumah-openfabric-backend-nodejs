import { StatusCodes } from "http-status-codes";
import UserSchema from "../models/UserSchema";
import { attachCookiesToResponse } from "../utils/jwt";
import createTokenUser from "../utils/createTokenUser";
import { Request, Response } from "express";
import { BadRequestError } from "../errors";

const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingEmail = await UserSchema.findOne({ email });

  if (existingEmail) {
    throw new BadRequestError("Email Aready Exit");
  }

  const user = await UserSchema.create({ name, email, password });

  const tokenUser = createTokenUser(user);
  // const token = jwt.sign(tokenUser, "jwtsecret", { expiresIn: "1d" });
  // const token = createJWT({ payload: tokenUser });
  // const oneDay = 1000 * 60 * 60 * 24;

  // res.cookie("token", token, {
  //   expires: new Date(Date.now() + oneDay),
  //   httpOnly: true,
  // });
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = () => {};

export { login, signUp };
