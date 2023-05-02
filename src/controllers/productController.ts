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

  res.status(StatusCodes.CREATED).json({ data: product });
};

//  GET ALL PRODUCTS
const getAllproducts = async (req: Request, res: Response) => {
  const products = await ProductSchema.find({});

  res.status(StatusCodes.OK).json({ data: products, count: products.length });
};

//  GET SINGLE PRODUCT
const getSingleProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await ProductSchema.findOne({ _id: productId });

  if (!product)
    throw new Errors.NotFoundError(`No product found with id: ${productId}`);

  res.setHeader("Access-Control-Allow-Credentials", "http://localhost:4200/");
  res.status(StatusCodes.OK).json({ data: product });
};

//  UPDATE PRODUCT
const updateProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await ProductSchema.findOneAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product)
    throw new Errors.NotFoundError(`No product found with id: ${productId}`);

  res.status(StatusCodes.OK).send({ data: product });
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const product = await ProductSchema.findOne({ _id: productId });
  if (!product)
    throw new Errors.NotFoundError(`No product found with id: ${productId}`);

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! product deleted" });
};

export {
  createProduct,
  getAllproducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
