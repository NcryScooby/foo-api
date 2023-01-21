import { Product } from "./../../models/Product";
import { Request, Response } from "express";

export const listProductByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find().where("category").equals(categoryId);

    if (products.length === 0) {
      return res.status(404).json({ error: "Products not found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
