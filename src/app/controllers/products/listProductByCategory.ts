import { Product } from "./../../models/Product";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const listProductByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find().where("category").equals(categoryId);

    if (products.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Products not found" });
    }

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
