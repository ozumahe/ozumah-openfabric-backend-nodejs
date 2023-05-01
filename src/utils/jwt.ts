import jwt from "jsonwebtoken";
import type { Response } from "express";

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

  const threeDays = 1000 * 60 * 60 * 72;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + threeDays),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
