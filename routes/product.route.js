
import productModel from '../models/product.model.js';
import express from "express";
const router=express.Router();


router.get('/:CatID',async function (req,res){
    const catID=req.params.CatID||0;
    const listProductFindByCatID= await productModel.findByCatID(catID)
    res.render('product',{
        productByCatID:listProductFindByCatID,
    })
});

router.get('/detail/:ProID',async function (req,res){
    const proID=req.params.ProID||0;
    const ProductFindByProID= await productModel.findByProID(proID)
    res.render('detail',{
        productByProID:ProductFindByProID
    })
});

export default router;