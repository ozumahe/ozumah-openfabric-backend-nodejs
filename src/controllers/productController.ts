import { Request, Response } from "express";
import ProductSchema from "../models/ProductSchema";
import * as Errors from "../errors";
import { StatusCodes } from "http-status-codes";

interface ReqType extends Request {
  user: {
    userId: string;
  };
}

// CREATE PRODUCT
const createProduct = async (req: Request | any, res: Response) => {
  req.body.user = req.user.userId;

  const product = await ProductSchema.create(req.body);

  if (!product)
    throw new Errors.BadRequestError("Please try again somethimg went wrong");

  res.status(StatusCodes.CREATED).json({ product });
};

export { createProduct };
