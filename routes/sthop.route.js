import productModel from "../models/product.model.js";
import express from "express";
const router = express.Router();

/*router.get("/:CatID", async function (req, res) {
  const per_page = 12;
  const catID = req.params.CatID || 0;
  const page = req.query.page || 1;
  const { pagination, listProduct } = await productModel.findByCatID(catID, page, perPage);
  res.render("product", {
    listProduct : listProduct,
    pagination: {
      page: pagination.current_page,
      limit: 7,
      totalRows: pagination.totalRows,
    },
  });
});

router.get("/detail/:ProID", async function (req, res) {
  const proID = req.params.ProID || 0;
  const ProductFindByProID = await productModel.findByProID(proID);
  res.render("detail", {
    productByProID: ProductFindByProID,
  });
});*/



export default router;
