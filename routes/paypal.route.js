import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {
  productManagementView,
  detailManagementView,
  AddProduct,
  DelProduct,
} from "../controllers/admin.controller.js";
import {protectAdminRoute} from "../middlewares/auth/protect.js";
import  paypal from 'paypal-rest-sdk';
import shoppingModel from "../models/shopping.model.js";
import usersModel from "../models/users.model.js";
import BillID from "../middlewares/auth/Bill.js"
var total =0;
var entity;
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.PAYPAL_ID,
  'client_secret': process.env.PAYPAL_SECRET,
});


var create_payment_json = [{
  "name": "item",
  "sku": "item",
  "price": "1.00",
  "currency": "USD",
  "quantity": 1
}]


const router = express.Router();
router.get("/checkout/success",(req,res)=>{
  const payID=req.query.PayerID;
  var execute_payment_json = {
    "payer_id": payID,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": total.toString()
      }
    }]
  };

  var paymentId = req.query.paymentId;

  paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      const promise=new Promise(async (resolve, reject) => {
        console.log("Get Payment Response");
        entity.User=req.session.passport.user.id;
        const changeBill = await shoppingModel.changeMethodBill(res.locals.billid,entity);
        const changeOrder = await shoppingModel.changeMethodOrder(res.locals.billid);
        resolve("hello")
      });
      promise.then(async function (data) {
        const promise3=new Promise(async (resolve,reject)=>{
          const total=await shoppingModel.totalOrder(res.locals.billid);
          console.log(total[0].total);
          for (let i=0;i<total[0].total;i++){
            const select= await shoppingModel.selectProductAfterOrder(res.locals.billid);
            let update=await shoppingModel.updateQuantityProduct(select[i]);
          }
          resolve("done")
        });
        promise3.then(async function () {
          const data3 = await shoppingModel.insertBill();
          BillID.setvalue(data3[0])
          return res.redirect("/history")
        })
      })
    }
  });
});

function formatMoney(n) {
  return (Math.round(n * 100) / 100).toLocaleString() +" VNĐ";
}
router.post("/checkoutpaypal",async (req, res) => {
  const promise=new Promise(async (resolve, reject) => {
    entity=req.body;
    const cartList = await shoppingModel.findAllCartByID(req.session.passport.user.id, res.locals.billid);
    const userList = await usersModel.getUserById(req.session.passport.user.id);
    let subtotal = 0;
    let items = [];
    cartList.forEach(u => {
      subtotal += u.Total;
      if (u.SizeID === u.SizeS) {
        u.Size = "S"
      } else if (u.SizeID === u.SizeM) {
        u.Size = "M"
      } else if (u.SizeID === u.SizeL) {
        u.Size = "L"
      } else if (u.SizeID === u.SizeXL) {
        u.Size = "XL"
      }
      const price=Math.round(parseFloat(u.Price)*0.0000435303);
      console.log(price)
      const temp = {
        "name": u.ProName,
        "sku": u.Size,
        "price": price.toString(),
        "currency": "USD",
        "quantity": u.Amount.toString()
      }
      items.push(temp);
    });
    resolve({subtotal:subtotal,items:items});
  });
  promise.then(function (data){
    console.log(data.items)
    console.log(data.subtotal.toString());
    for(let i = 0;i<data.items.length;i++)
    {
      total+=parseFloat(data.items[i].price)*data.items[i].quantity;
    }
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/checkout/success",
      "cancel_url": "http://localhost:3000/checkout/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": data.items
      },
      "amount": {
        "currency": "USD",
        "total": total.toString()
      },
      "description": "This is the payment description."
    },
    ]
  };
  console.log("hahahaha")
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error
      res.render('cancel');
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href)
        }
      }
    }
  });
  });
})

export default router;