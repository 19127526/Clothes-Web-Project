import express from "express";
const router = express.Router();
import commentModel from '../models/comment.model.js'
import {
  homeView,
  shopView,
  categoryView,
  productView,
  aboutView,
} from "../controllers/shopping.controller.js";

router.get("/", homeView);

router.get("/shop", shopView);

router.get("/category/:CatID", categoryView);
router.get("/comment",async (req,res)=>{
  res.json(!!req.isAuthenticated());
});
router.post('/product/comment',async (req,res)=>{
  console.log(req.body.userid)
  if(req.body.userid) {
    let userid = req.session.passport.user.id;
    const check = await commentModel.insertCommentByUserId(req.body.content, userid, req.body.proID);
    res.redirect("/product/"+req.body.proID);
  }
});

router.get("/product/:ProID/hi", async (req,res)=>{
  const commentList = await commentModel.findAllComment(req.params.ProID);
  res.render('comment_load',{
    layout:false,
    comment:commentList
  })

});

router.get("/product/:ProID", productView);

router.get("/about", aboutView);

export default router;