import express from "express";
import {
  productManagementView,
  detailManagementView,
  AddProduct,
  DelProduct,
} from "../controllers/admin.controller.js";
import { protectAdminRoute } from "../middlewares/auth/protect.js";
import shoppingModel from "../models/shopping.model.js";
import adminModel from "../models/admin.model.js";
import moment from "moment";
import dateformat from "dateformat"
import fs from "fs";
import usersModel from "../models/users.model.js";
import multer from 'multer';
import request from'request'
import http from'https'
import getToken from "../utils/sirv.js";
import BillID from "../middlewares/auth/Bill.js";
import bcrypt from "bcrypt";
import AdminModel from "../models/admin.model.js";




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
    const listStatusProduct=await adminModel.findAllStatusProduct();
    listStatusProduct.forEach(u=>{
        if(u.IdStatus===productDetail.IdStatus){
            u.check=true;
        }
    });
    const listCategory=await shoppingModel.findAllCategories();
    listCategory.forEach(u=>{
        if(u.CatID===productDetail.CatID){
            u.check=true;
        }
    });
    let pos;
    let image=productDetail.Image.toString();
    pos=image.lastIndexOf("s/"+productDetail.CatID.toString()+"/");
    const TempName=image.substring(pos,image.lastIndexOf("/"));
    const pos2=TempName.lastIndexOf("/");
    const ResultName=TempName.substring(pos2+1,TempName.length)
    console.log(ResultName);
    console.log(productDetail)
    res.render("admin/new-product-editor",{
        layout:'layoutAdmin.hbs',
        list:productDetail,
        listCategory,
        listStatus:listStatusProduct,
        catID:productDetail.CatID,
        proID:req.params.proID,
        total:ResultName
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
        resolve(list)
    });
    promise.then(async function (data){
        const updateProduct=await adminModel.updateDesByProID(req.params.proID,data);
        return res.send(true)
    })
});

router.post("/category/remove-product"/*,,protectAdminRoute*/, async function (req,res){
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

router.get("/account-detail/:UserID",async function(req,res){
    const listDetailUser=await adminModel.findDetailAccountByID(req.params.UserID);
    res.render("admin/detail-account",{
        layout:'layoutAdmin.hbs',
        listDetailUser:listDetailUser.list[0],
        totalBill:listDetailUser.totalBill[0]
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
    const listStatusProduct=await adminModel.findAllStatusProduct();
    res.render("admin/item-add",{
        layout:'layoutAdmin.hbs',
        listCategory,
        listStatusProduct:listStatusProduct
    })
});
router.post("/filter-bill",async function(req,res){
    if(req.body.index===0){
        res.redirect("/admin/detail-bill/"+req.body.userID);
    }
    else if(req.body.index===1){
        res.redirect("/admin/detail-bill/"+req.body.userID+"/?filter=1");
    }
})
router.get("/detail-bill/:UserID",async function(req,res){

    const listDetailUser=await adminModel.findDetailBillByID(req.params.UserID,req.query.filter||0);
    const user=await usersModel.getUserById(req.params.UserID);
    listDetailUser.filter=req.query.filter||0;
    const size=listDetailUser.count[0].total;

    for (let i=0;i<size;i++){
        const temp=await adminModel.findDetailOrder(listDetailUser.list2[i].BillID);
        temp.forEach(u => {
            if(u.SizeID===u.SizeS){
                u.Size="S"
            }
            else if(u.SizeID===u.SizeM){
                u.Size="M"
            }
            else if(u.SizeID===u.SizeL){
                u.Size="L"
            }
            else if(u.SizeID===u.SizeXL){
                u.Size="XL"
            }
        });
        listDetailUser.list2[i].listProduct=temp;
        const listStatusProduct=await adminModel.findAllStatusBill();
        listStatusProduct.forEach(u=>{
            if(u.idstatus===listDetailUser.list2[i].Status){
                u.check=true;
            }
        });
        listDetailUser.list2[i].AmountStatus=listStatusProduct;
    };

    res.render("admin/detail-bill",{
        layout:'layoutAdmin.hbs',
        list:listDetailUser.list2,
        total:listDetailUser.count[0],
        user,
        filter:listDetailUser.filter
    })
});

router.post("/setting-account",async function(req,res){
    const promise =new Promise(async (resolve, reject) => {
        const updateStatusAccount = await adminModel.updateStatusAccount(req.body);
        resolve("done")
    })
   promise.then(function (){
       res.send(true)
   })

})
router.post("/reload-bill",async function(req,res){
    const listDetail=await adminModel.findBillDetailByBillID(req.body.billid);
    res.render("admin/detail-bill-modal-reload",{
        layout:false,
        list:listDetail[0],
    })
});

router.post("/change-status-bill",async function(req,res){
    const promise=new Promise(async (resolve, reject) => {
        const changeStatusBill = await adminModel.changeMethodBillAdmin(req.body.id, req.body.status)
        const changeStatusOrder = await adminModel.changeMethodOrderAdmin(req.body.id, req.body.status)
        resolve(req.body.id)
    })
    promise.then(async function (data) {
        const listDetailUser = await adminModel.findDetailOrder(req.body.id);
        listDetailUser.forEach(u => {
            if(u.SizeID===u.SizeS){
                u.Size="S"
            }
            else if(u.SizeID===u.SizeM){
                u.Size="M"
            }
            else if(u.SizeID===u.SizeL){
                u.Size="L"
            }
            else if(u.SizeID===u.SizeXL){
                u.Size="XL"
            }
        });
        res.render("admin/detail-bill-reload", {
            layout: false,
            list:  listDetailUser
        })
    })
});
function renamefile(old,New){
    fs.rename(old, New,function (err){
        if(err){

        }
        else{
        }
    });
}
const tempDir=[];
const DirNew=[];


router.post("/upload-image-product",async function(req,res){
    const storage = multer.diskStorage({
        destination:async function (req, file, cb) {
            if((file.mimetype=="image/jpg")
                ||(file.mimetype=="image/png")
                ||(file.mimetype=="image/jpeg")){
                cb(null, 'public/temp');
            }
            else{
                cb(new Error('not Image'), false);
            }
        },
        filename:async function (req, file, cb) {
            tempDir.push("./public/temp/"+file.originalname);
            cb(null, file.originalname);

        }
    });
    const upload=multer({storage:storage})
    upload.array('image',5)(req,res,function (err){
        if(err){
        }
        else{
            let index=1;
            const promise=new Promise((resolve,reject)=>{
            for (let i=0;i<tempDir.length;i++){
                if(fs.existsSync(tempDir[i])){
                    console.log(index)
                    renamefile(tempDir[i],"./public/temp/("+index+")"+".jpg")
                    DirNew.push("("+index+")"+".jpg")
                }
                index+=1;
            }
            resolve("data")
            });
            promise.then(function (data){
                return res.send(true);
            })
        }
    })
});

router.post("/add-product",async function(req,res){
    const list=req.body;
    const promise=new Promise(async (resolve, reject) => {
        const price = req.body.price.toString();
        let pos;
        pos = price.lastIndexOf(" VNĐ");
        let Price = price.substring(0, pos);
        const tempPrice = Price.split(",");
        let resultPrice = "";
        for (let i = 0; i < tempPrice.length; i++) {
            resultPrice += tempPrice[i];
        }
        list.price = resultPrice;
        let SizeS = await bcrypt.hash("SizeS", 8);
        SizeS = SizeS.toString().substring(0, 8);
        let SizeM = await bcrypt.hash("SizeM", 8);
        SizeM = SizeM.toString().substring(0, 8);
        let SizeL = await bcrypt.hash("SizeL", 8);
        SizeL = SizeL.toString().substring(0, 8);
        let SizeXl = await bcrypt.hash("SizeXL", 8);
        SizeXl = SizeXl.toString().substring(0, 8);
        list.SizeS = SizeS;
        list.SizeM = SizeM;
        list.SizeL = SizeL;
        list.SizeXL = SizeXl;
        const proID=await adminModel.insertNewProduct(list);
        resolve({ProID:proID[0],CatID:list.category})
    });
    promise.then(function (data){
        console.log(data.ProID);
        console.log(data.CatID)
        res.render("admin/item-add-image",{
            layout:'layoutAdmin.hbs',
            catID:data.CatID,
            proID:data.ProID
        })
    })

})
router.post("/post-image-sirv",async function(req,res){
    const promise=new Promise((resolve,reject)=>{
        const token=getToken()
        resolve(token)
    });
    promise.then(function (data){
        for (let i = 0; i < DirNew.length; i++) {
            readImageNew(DirNew[i], data,req.body)
        }
    })
})


router.post("/edit-image-sirv",async function(req,res){
    const promise=new Promise((resolve,reject)=>{
        const token=getToken()
        resolve(token)
    });
    promise.then(function (data){
        const promise2=new Promise((resolve,reject)=> {
            for (let i = 0; i < DirNew.length; i++) {
                readImageEdit(DirNew[i], data, req.body)
            }
        });
        promise2.then(function (){
            return res.send(true)
        })
    })
})

function readImageEdit(dir,token,CatPro){
    const promise=new Promise((resolve,reject)=> {
        fs.readFile("./public/temp/" + dir, (err, data2) => {
            if (err) {
                throw err
            } else {
                var options = {
                    method: 'POST',
                    url: 'https://api.sirv.com/v2/files/upload',
                    qs: {filename: '/imgs/'+CatPro.catid+"/"+ CatPro.total+"/"+ dir},
                    headers: {
                        'content-type': 'image/jpeg',
                        authorization: 'Bearer' + token
                    },
                    body: data2
                };
                request(options, function (error, response, body) {
                    if (error) throw error;
                    else resolve("./public/temp/" + dir)
                });
            }
        });

    });
    promise.then(async function (data){
        const updateImageProduct=await AdminModel.updateImageProduct(CatPro);
        if (fs.existsSync(data)) {
            tempDir.splice(0,tempDir.length)
            DirNew.splice(0,tempDir.length)
            fs.unlinkSync(data);
        }
    })
}






function readImageNew(dir,token,CatPro){
    const promise=new Promise((resolve,reject)=> {
        fs.readFile("./public/temp/" + dir, (err, data2) => {
            if (err) {
                throw err
            } else {
                var options = {
                    method: 'POST',
                    url: 'https://api.sirv.com/v2/files/upload',
                    qs: {filename: '/imgs/'+CatPro.catid+"/"+ CatPro.proid+"/"+ dir},
                    headers: {
                        'content-type': 'image/jpeg',
                        authorization: 'Bearer' + token
                    },
                    body: data2
                };
                request(options, function (error, response, body) {
                    if (error) throw error;
                    else resolve("./public/temp/" + dir)
                });
            }
        });

    });
    promise.then(async function (data){
        const updateImageProduct=await AdminModel.updateImageProduct(CatPro);
        if (fs.existsSync(data)) {
            tempDir.splice(0,tempDir.length)
            DirNew.splice(0,tempDir.length)
            fs.unlinkSync(data);
        }
    })
}
/*const promise=new Promise((resolve,reject)=>{
    let i=1;
    let file;
    for(file of files) {
        const promise2=new Promise((resolve,reject)=>{
            try {
                fs.renameSync("./public/temp/" + file.toString(), "./public/temp/" + i + ".jpg");
                resolve(i + ".jpg");
            }
            catch (err){

            }
        })
        promise2.then(function (data){
            fs.readFile("./public/temp/"+data, (err, data2) => {
                if(err){
                    throw err
                }
                else{
                    var options = {
                        method: 'POST',
                        url: 'https://api.sirv.com/v2/files/upload',
                        qs: {filename: '/imgs/' + data},
                        headers: {
                            'content-type': 'image/jpeg',
                            authorization: 'Bearer' + token
                        },
                        body: data2
                    };
                    request(options, function (error, response, body) {
                        if (error) throw error;
                        else console.log("hhe")
                    });
                }
            });
        })
    }
    resolve("done")
});
promise.then(function (){
    return res.send(true);
})
});*/









router.get("/product/:ProID", async function (req, res) {
    const proID = req.params.ProID || 0;
    const product = await shoppingModel.findByProductID(proID);
    res.render("product_detail_management", { product });
});






router.post("/add", async function (req, res) {
    const ret=await adminModel.addProduct(req.body)
    res.redirect('/admin')
});

router.post("/del", async function (req, res) {
    const ret=await adminModel.delProduct(req.body.ProID)
    res.redirect('/admin')
});



router.get("/product/:ProID", protectAdminRoute, detailManagementView);

router.post("/add", protectAdminRoute, AddProduct);

router.post("/del", protectAdminRoute, DelProduct);


export default router;