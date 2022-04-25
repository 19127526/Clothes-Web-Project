import express from "express";
const router = express.Router();

import {
  homeView,
  shopView,
  categoryView,
  productView,
  aboutView,
  getProducts,
} from "../controllers/shopping.controller.js";

router.get("/", homeView);

router.get("/shop", shopView);

router.get("/products", getProducts);

router.get("/category/:CatID", categoryView);

router.get("/product/:ProID", productView);

router.get("/about", aboutView);

export default router;
