import jwt from "jsonwebtoken";
import { Response } from "express";

export const jwtSecret = "euielia92092k@ujdyeenn34";

const createJWT = ({ payload }: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "");
  return token;
};

const isTokenValid = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET || "");

const attachCookiesToResponse = ({
  res,
  user,
}: {
  res: Response;
  user: any;
}) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
