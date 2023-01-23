import { model, Schema } from "mongoose";

export const Category = model(
  "Category",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    iconPath: {
      type: String,
      required: true,
    },
  })
);
