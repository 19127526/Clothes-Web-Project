import shoppingModel from "../models/shopping.model.js";
import authModel from "../models/auth.model.js"

export default function (app) {
  app.use(async function (req, res, next) {
    const rawData = await shoppingModel.findAllCategories();
    res.locals.lcCategories = rawData;
    next();
  });
  app.use(async function isLoggedIn(req, res, next) {
    try{
      res.locals.user = req.session.passport.user;
      const rawUsers= await authModel.findFullNameByEmail(req.session.passport.user);
      res.locals.user=rawUsers[0];
      return next();
    }
  catch (err){
      return next();
    }

  });
}