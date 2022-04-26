import express from "express";
const router = express.Router();

import {
  homeView,
  shopView,
  categoryView,
  productView,
  aboutView,
} from "../controllers/shopping.controller.js";
import shoppingModel from "../models/shopping.model.js";
import usersModel from "../models/users.model.js";
router.get("/", homeView);

router.get("/shop", shopView);

router.get("/category/:CatID", categoryView);
<<<<<<< Updated upstream
=======
router.get("/comment",async (req,res)=>{
  res.json(!!req.isAuthenticated());
});
router.post('/product/comment',async (req,res)=>{

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
>>>>>>> Stashed changes

router.get("/cart", async (req,res)=>{
  if(req.isAuthenticated()){
    const cartList = await shoppingModel.findAllCartByID(req.session.passport.user.id,res.locals.billid);
    let subtotal=0;
    cartList.forEach(u=>{
      subtotal+=u.Total;
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
    })

    res.render('cart',{
      /* layout:false,
       comment:commentList*/
      cartlist:cartList,
      subtotal
    })
  }
  else{
    const cartList = await shoppingModel.findAllCartByID(-1,res.locals.billid);
    let subtotal=0;
    cartList.forEach(u=>{
      subtotal+=u.Total;
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
    })

    res.render('cart',{
      cartlist:cartList,
      subtotal
    })
  }
});
router.post("/getproductAuthen",async (req,res)=>{

  const list =req.body;
  list.total=parseInt(req.body.price *req.body.quantity);
  list.billid=res.locals.billid;
  console.log(res.locals.billid)
  if(req.isAuthenticated()){
    let userid = req.session.passport.user.id;
    const addCart=await shoppingModel.addOrderAuthen(userid,list);
    const totalProDuctInCart=await shoppingModel.totalProDuctInCartAuthen(userid,list.billid);
    res.render("reload-cart",{
      layout:false,
      total:totalProDuctInCart[0]
    })
  }
  else{
    const addCart=await shoppingModel.addOrderGuest(list);
    const totalProDuctInCart=await shoppingModel.totalProDuctInCartGuest(list.billid);
    res.render("reload-cart",{
      layout:false,
      total:totalProDuctInCart[0]
    })
  }

});
router.post("/gettotal",async (req,res)=>{
    const list = req.body;
      list.total=parseInt(req.body.price *req.body.amount);
    if(req.isAuthenticated()) {
      const promise = new Promise(async (resolve, reject) => {
        const updateAmount = await shoppingModel.updateQuantityByOrderID(list);
        resolve(req.body.id);
      });
      promise.then(async function (data) {
        const cartList = await shoppingModel.findAllCartByID(req.session.passport.user.id,res.locals.billid);
        let subtotal = 0;
        cartList.forEach(u => {
          subtotal += u.Total;
        });

        res.json(subtotal);
      })
    }
    else{
        const promise = new Promise(async (resolve, reject) => {
          const updateAmount = await shoppingModel.updateQuantityByOrderID(list);
          resolve(req.body.id);
        });
        promise.then(async function (data) {
          const cartList = await shoppingModel.findAllCartByID( -1,res.locals.billid);
          let subtotal = 0;
          cartList.forEach(u => {
            subtotal += u.Total;
          });

          res.json(subtotal);
        })
      }
})

let checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

router.get("/checkout", checkLoggedIn,async (req,res)=>{
  if(req.isAuthenticated()){
    const cartList = await shoppingModel.findAllCartByID(req.session.passport.user.id,res.locals.billid );
    const userList=await usersModel.getUserById(req.session.passport.user.id);
    let subtotal= 0;
    cartList.forEach(u => {
      subtotal += u.Total;
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

    const shipping=50000
    return res.render("checkout",{
      userList,
      cartList,
      subtotal:subtotal,
      shipping:shipping
    })
  }
});
router.post("/checkout", checkLoggedIn,async (req,res)=> {
  console.log(req.body);
  const list=req.body;
  if(list.radioNoLabel==='1'){
    const changeBill=await shoppingModel.changeMethodBill(res.locals.billid);
    const changeOrder=await shoppingModel.changeMethodOrder(res.locals.billid);
    res.redirect("/history")
  }

});
router.get("/product/:ProID", productView);

router.get("/about", aboutView);

<<<<<<< Updated upstream
export default router;
=======
router.get("/");
router.get("/history",checkLoggedIn,async (req,res)=>{
  const list = await shoppingModel.findAllOrderByID(req.session.passport.user.id,1);
  list.forEach(u => {
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
  res.render("history",{
    cartlist:list
  })
})

export default router;
>>>>>>> Stashed changes
