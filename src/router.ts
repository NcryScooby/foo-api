import { listProductByCategory } from "./app/controllers/products/listProductByCategory";
import { Router } from "express";
import multer from "multer";
import path from "node:path";

import { listCategories } from "./app/controllers/categories/listCategories";
import { createCategory } from "./app/controllers/categories/createCategory";
import { listProducts } from "./app/controllers/products/listProducts";
import { createProduct } from "./app/controllers/products/createProduct";

export const router = Router();

const upload = (folder: string) =>
  multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, path.resolve(__dirname, "..", "uploads", `${folder}`));
      },
      filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  });

// List Categories
router.get("/categories", listCategories);

// Create Category
router.post("/categories", createCategory);

// List Products
router.get("/products", listProducts);

// Create Product
router.post("/products", upload("products").single("image"), createProduct);

// Get Product by Category
router.get("/products/:categoryId", listProductByCategory);
