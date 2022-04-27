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
import moment from "moment";
import dateformat from "dateformat"
import fs from "fs";
import usersModel from "../models/users.model.js";


const router = express.Router();

router.get("/",/* protectAdminRoute,*/ async function (req,res){
    res.render('admin/home',{
        layout:'layoutAdmin.hbs',
    })
});
router.get("/category/product/:proID"/*,,protectAdminRoute*/, async function (req,res){
    const productDetail=await adminModel.findDetailByProductID(req.params.proID);

    res.render("admin/detail-product",{
            layout:'layoutAdmin.hbs',
            list:productDetail
        })
});
router.get("/category/editproduct/:proID"/*,,protectAdminRoute*/, async function (req,res){
    const productDetail=await adminModel.findDetailByProductID(req.params.proID);
    const listCategory=await shoppingModel.findAllCategories();
    listCategory.forEach(u=>{
        if(u.CatID===productDetail.CatID){
            u.check=true;
        }
    });
    res.render("admin/new-product-editor",{
        layout:'layoutAdmin.hbs',
        list:productDetail,
        listCategory
    })
});

router.post("/category/editproduct/:proID"/*,,protectAdminRoute*/, async function (req,res){
    const promise=new Promise((resolve,reject)=> {
        const price = req.body.price.toString();
        let pos;
        pos = price.lastIndexOf(" VNĐ");
        let Price = price.substring(0, pos);
        const tempPrice=Price.split(",");
        let resultPrice="";
        for(let i=0;i<tempPrice.length;i++){
            resultPrice+=tempPrice[i];
        }
        const list = req.body;
        list.price = resultPrice;
        console.log(list)
        resolve(list)
    });
    promise.then(async function (data){
        const updateProduct=await adminModel.updateDesByProID(req.params.proID,data);
        return res.send(true)
    })
});

router.post("/category/remove-product"/*,,protectAdminRoute*/, async function (req,res){
    console.log(req.body);
    const myPromise=new Promise(async (resolve, reject) => {
        const delProduct = await adminModel.removeProDuctById(req.body.proid);
        resolve("done");
    });
    myPromise.then(async function (data) {
        return res.send(true);
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
    const totalProduct=await adminModel.findTotalProDuctByID(catID);
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
router.get("/account-management"/*,,protectAdminRoute*/, async function (req,res){
    const perPage = 10;
    const page = req.query.page || 1;
    const listEmail= await usersModel.findAllAccount(page, perPage);
    const totalEmail= await usersModel.findTotalAccount().then(async (u)=>{
        return res.render('admin/account_management',{
            layout:'layoutAdmin.hbs',
            list:listEmail.listProduct,
            totalEmail:u[0],
            pagination:{
                page: listEmail.pagination.current_page,
                limit: perPage,
                totalRows: listEmail.pagination.total_items,
            }
        })
    })
});

router.get("/account-detail/:UserID", async function (req,res){
    const productDetail=await adminModel.findDetailByProductID(req.params.proID);
    const totalEmail= await usersModel.findTotalAccount().then(async (u)=>{
        return res.render('admin/account_management',{
            layout:'layoutAdmin.hbs',
            list:listEmail.listProduct,
            totalEmail:u[0],
            pagination:{
                page: listEmail.pagination.current_page,
                limit: perPage,
                totalRows: listEmail.pagination.total_items,
            }
        })
    })
});


router.get("/Add-Product", async function (req,res){
    const listCategory=await shoppingModel.findAllCategories();

    res.render("admin/item-add",{
        layout:'layoutAdmin.hbs',
        listCategory
    })
});




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