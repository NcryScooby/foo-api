import { Product } from "./../../models/Product";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const listProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (products.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Products not found" });
    }

    res.status(StatusCodes.OK).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
