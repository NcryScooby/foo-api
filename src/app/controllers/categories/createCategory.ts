import { Request, Response } from "express";
import { Category } from "../../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const iconPath = req.file?.filename;
    const iconPathLight = req.file?.filename;

    const { name } = req.body;

    if (!name || !iconPath || !iconPathLight) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await Category.create({ name, iconPath, iconPathLight });
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
