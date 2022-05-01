import shoppingModel from "../models/shopping.model.js";
import BillID from "../middlewares/auth/Bill.js"
var something = (function() {
  var executed = false;
  return async function() {
    if (!executed) {
      executed = true;
      const promise=new Promise(async (resolve, reject) => {
        const data = await shoppingModel.delProDuctInCartGuest();
        const data2 = await shoppingModel.delBill();
        resolve("data")
      });
      promise.then(async function (){
        const data3= await shoppingModel.insertBill();
        BillID.setvalue(data3[0])
      })
    }
  };
})();

export default function (app) {
  app.use(async function (req, res, next) {
    something();
    const rawProduct=await shoppingModel.findAllProductsToChange();
    for (let i=0;i<rawProduct.total[0].total;i++){
      if(rawProduct.list[i].Quantity===0){
        const update=await shoppingModel.ChangeStatusProduct(rawProduct.list[i],0);
      }
    }
    const rawData = await shoppingModel.findAllCategories();
    res.locals.lcCategories = rawData;
    res.locals.billid = BillID.getValue();
    if (req.session.passport && req.session.passport.user) {
      res.locals.user = req.session.passport.user;
      const total=await shoppingModel.totalProDuctInCartGuest(BillID.getValue());
      if(total[0].total!==0){
          const promise=new Promise(async (resolve, reject) => {
            try {
              const changeAuthen = await shoppingModel.changeProductInCartAuthen(req.session.passport.user.id);
              resolve("done");
            }
              catch (e){

                  const totalProDuctInCart=await shoppingModel.totalProDuctInCartGuest(BillID.getValue());
                  res.locals.cart=totalProDuctInCart[0];
              }
          });
        promise.then(async function (data) {
          try {
            const totalProDuctInCart = await shoppingModel.totalProDuctInCartAuthen(req.session.passport.user.id,BillID.getValue());
            res.locals.cart = totalProDuctInCart[0];
          }
          catch (e){

            const promise=new Promise(async (resolve, reject) => {
              const changeAuthen  = await shoppingModel.changeProductInCartGuest()
              resolve("done");
            });
            promise.then(async function () {
              const totalProDuctInCart = await shoppingModel.totalProDuctInCartGuest(BillID.getValue());
              res.locals.cart = totalProDuctInCart[0];
            })
          }
        })
      }
      else
      {
        const totalProDuctInCart=await shoppingModel.totalProDuctInCartAuthen(req.session.passport.user.id,BillID.getValue());
        res.locals.cart=totalProDuctInCart[0];
      }
    }
    else{
      const totalProDuctInCart=await shoppingModel.totalProDuctInCartGuest(BillID.getValue());
      res.locals.cart=totalProDuctInCart[0];
    }
    next();
  });
}
