import shoppingModel from "../models/shopping.model.js";
import express from "express";
const router = express.Router();

router.get("/", async function (req, res) {
  const arrivalList = await shoppingModel.findNewArrivals();
  const popularList = await shoppingModel.findPopularProducts();

  res.render("home", {
    arrivalList,
    popularList,
  });
});

router.get("/shop", async function (req, res) {
  const perPage = 12;
  const page = req.query.page || 1;
  let { pagination, listProduct } = await shoppingModel.findAllProducts(
    page,
    perPage
  );
  res.render("shop", {
    pagination: {
      page: pagination.current_page,
      limit: perPage,
      totalRows: pagination.total_items,
    },
    listProduct,
  });
});

router.get("/category/:CatID", async function (req, res) {
  const perPage = 12;
  const catID = req.params.CatID || 0;
  const page = req.query.page || 1;
  let { pagination, listProduct } = await shoppingModel.findByCategoryID(
    catID,
    page,
    perPage
  );
  res.render("category", {
    pagination: {
      page: pagination.current_page,
      limit: perPage,
      totalRows: pagination.total_items,
    },
    listProduct,
  });
});

router.get("/product/:ProID", async function (req, res) {
  const proID = req.params.ProID || 0;
  const product = await shoppingModel.findByProductID(proID);
  res.render("product", { product });
});

router.get("/about", async function (req, res) {
  res.render("about");
});




export default router;
