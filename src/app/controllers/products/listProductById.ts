import { Request, Response } from "express";
import { Product } from "../../models/Product";
import { StatusCodes } from "http-status-codes";

export const listProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
