import { Request, Response } from "express";
import { Category } from "../../models/Category";
import { StatusCodes } from "http-status-codes";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const iconPath = req.file?.filename;
    const iconPathLight = req.file?.filename;

    const { name } = req.body;

    if (!name || !iconPath || !iconPathLight) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Missing required fields" });
    }

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Category already exists" });
    }

    const category = await Category.create({ name, iconPath, iconPathLight });
    res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
