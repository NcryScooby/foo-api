import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./router";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const app = express();
const PORT = process.env.PORT || 3001;

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://fooclient.netlify.app/"],
    credentials: true,
  })
);

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
