import express from "express";
import {
  productManagementView,
  detailManagementView,
  AddProduct,
  DelProduct,
} from "../controllers/admin.controller.js";
import { protectAdminRoute } from "../middlewares/auth/protect.js";

const router = express.Router();

router.get("/", protectAdminRoute, productManagementView);

router.get("/product/:ProID", protectAdminRoute, detailManagementView);

router.post("/add", protectAdminRoute, AddProduct);

router.post("/del", protectAdminRoute, DelProduct);

router.get("/product/:ProID", async function (req, res) {
  const proID = req.params.ProID || 0;
  const product = await shoppingModel.findByProductID(proID);
  res.render("product_detail_management", { product });
});

router.post("/add", async function (req, res) {
  console.log(req.body);
  const ret = await adminModel.addProduct(req.body);
  res.redirect("/admin");
});

router.post("/del", async function (req, res) {
  console.log(req.body);
  const ret = await adminModel.delProduct(req.body.ProID);
  res.redirect("/admin");
});

export default router;
