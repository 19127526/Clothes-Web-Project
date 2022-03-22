import express from "express";
const router=express.Router();


router.get('',async function (req,res){
    res.render('about')
});

export default router;