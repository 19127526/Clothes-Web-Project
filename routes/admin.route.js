import express from "express";
const router = express.Router();

import {
  productManagementView,
  AddProduct,
  DelProduct,
} from "../controllers/admin.controller.js";

router.get("/", productManagementView);

router.post("/add", AddProduct);

router.post("/del", DelProduct);

export default router;
