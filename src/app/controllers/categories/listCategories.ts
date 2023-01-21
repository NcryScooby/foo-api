import { Request, Response } from "express";
import { Category } from "../../models/Category";

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res.status(404).json({ error: "Categories not found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
