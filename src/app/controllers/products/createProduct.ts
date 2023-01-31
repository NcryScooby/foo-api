import { Request, Response } from "express";
import { Product } from "../../models/Product";
import { StatusCodes } from "http-status-codes";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const imagePath = req.file?.filename;

    const {
      name,
      description,
      price,
      ingredients,
      category,
      unitOfMeasurement,
    } = req.body;

    if (
      !name ||
      !description ||
      !imagePath ||
      !price ||
      !category ||
      !unitOfMeasurement
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Missing required fields" });
    }

    const productExists = await Product.findOne({ name });

    if (productExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Category already exists" });
    }

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      unitOfMeasurement,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      category,
    });

    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
