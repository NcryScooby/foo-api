import { Request, Response } from "express";
import { Product } from "../../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const imagePath = req.file?.filename;

    const { name, description, price, ingredients, category } = req.body;

    if (!name || !description || !imagePath || !price || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const productExists = await Product.findOne({ name });

    if (productExists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
