import productModel from "../models/product.model.js";
import express from "express";
const router = express.Router();

router.get("/:CatID", async function (req, res) {
  const perPage = 12;
  const catID = req.params.CatID || 0;
  const page = req.query.page || 1;
  let { pagination, listProduct } = await productModel.findByCatID(catID, page, perPage);
  res.render("product", { 
    pagination: {
      page: pagination.current_page,
      limit: perPage,
      totalRows: pagination.total_items,
    },
    listProduct,
  });
});

router.get("/detail/:ProID", async function (req, res) {
  const proID = req.params.ProID || 0;
  const ProductFindByProID = await productModel.findByProID(proID);
  res.render("detail", {
    productByProID: ProductFindByProID,
  });
});



export default router;
