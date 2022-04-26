import express from "express";
import {
  productManagementView,
  detailManagementView,
  AddProduct,
  DelProduct,
} from "../controllers/admin.controller.js";
import { protectAdminRoute } from "../auth/protect.js";
import shoppingModel from "../models/shopping.model.js";
import adminModel from "../models/admin.model.js";

const router = express.Router();

router.get("/",/* protectAdminRoute,*/ async function (req,res){
    res.render('admin/home',{
        layout:'layoutAdmin.hbs',
    })
});

router.get("/category/:catID"/*,,protectAdminRoute*/, async function (req,res){
    const perPage = 10;
    const catID = req.params.catID || 0;
    const page = req.query.page || 1;
    let { pagination, listProduct } = await shoppingModel.findByCategoryID(
        catID,
        page,
        perPage
    );
    console.log(listProduct);
    const totalProduct=await adminModel.findTotalProDuctByID(catID);
    console.log(totalProduct)
    res.render("admin/items-list",{
       layout:'layoutAdmin.hbs',
        pagination: {
            page: pagination.current_page,
            limit: perPage,
            totalRows: pagination.total_items,
        },
        listProduct,
        totalProduct:totalProduct[0]
   });
});

/*router.get("/product"/!*,protectAdminRoute*!/, async function (req,res){
    const perPage = 12;
    const page = req.query.page || 1;
    let { pagination, listProduct } = await adminModel.findAllProducts(
        page,
        perPage
    );
    console.log(listProduct)
    res.render("admin/items-list",{
        layout:'layoutAdmin.hbs',
        pagination: {
            page: pagination.current_page,
            limit: perPage,
            totalRows: pagination.total_items,
        },
        listProduct,
    });
});*/

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
    const ret=await adminModel.addProduct(req.body)
    res.redirect('/admin')
});

router.post("/del", async function (req, res) {
    console.log(req.body);
    const ret=await adminModel.delProduct(req.body.ProID)
    res.redirect('/admin')
});




export default router;