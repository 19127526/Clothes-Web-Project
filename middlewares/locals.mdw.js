import shoppingModel from "../models/shopping.model.js";

export default function (app) {
  app.use(async function (req, res, next) {
    const rawData = await shoppingModel.findAllCategories();
    res.locals.lcCategories = rawData;
    next();
  });
}