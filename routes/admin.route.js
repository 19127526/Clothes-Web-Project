import adminModel from "../models/admin.model.js";
import express from "express";
const router = express.Router();
router.get("/", async function (req, res) {
    const perPage = 12;
    const page = req.query.page || 1;
    let { pagination, listProduct } = await adminModel.findAllProducts(
      page,
      perPage
    );
    res.render("product_management", {
      pagination: {
        page: pagination.current_page,
        limit: perPage,
        totalRows: pagination.total_items,
      },
      listProduct,
    });
});

router.post("/add", async function (req, res) {
    console.log(req.body);
    const ret=await adminModel.addProduct(req.body)
    res.redirect('/admin')
});



export default router;