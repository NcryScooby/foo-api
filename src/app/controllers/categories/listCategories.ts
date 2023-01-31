import { Request, Response } from "express";
import { Category } from "../../models/Category";
import { StatusCodes } from "http-status-codes";

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Categories not found" });
    }

    res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
