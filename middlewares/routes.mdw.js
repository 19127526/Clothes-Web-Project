import { dirname } from "path";
import { fileURLToPath } from "url";
import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";
import productRoute from "../routes/product.route.js";
import aboutRoute from "../routes/about.route.js";
import router from "../routes/product.route.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
export default function (app) {
  app.get("/", async function (req, res) {
    const arrivalList = await productModel.findArrival();
    const popularList = await productModel.findPopularProduct();
    res.render("home", {
      product: arrivalList,
      popularList,
    });
  });
  app.get("/byCat/:CatID", async function (req, res) {
    const catID = req.params.CatID || 0;
    const page=req.query.page||1;
    const limit=9;
    const offset=(page-1)*limit;
    const amountProductOfCatID= await productModel.countByCatId(catID)
    let amountPage=Math.floor(amountProductOfCatID/limit)

    if(amountProductOfCatID % limit>0){
      amountPage++;
    }
    const pageArray=[];
    for(let i=1;i<=amountPage;i++){
      pageArray.push({
        value:i,
        isCurrent: +page===i
      });
    }
    let temp=Number(page)
    const listProductFindByCatID= await productModel.pagination(limit,offset,catID)
    if(page>1 && page<amountPage){
      res.render("product", {
        listProduct:listProductFindByCatID,
        pageArray,
        pre:Number(temp-1),
        next:Number(temp+1)
      });
    }
    else if(page==amountPage){
      res.render("product", {
        listProduct:listProductFindByCatID,
        pageArray,
        pre:page,
        next:false
      });
    }
    else if(page==1){
      res.render("product", {
        listProduct:listProductFindByCatID,
        pageArray,
        pre:false,
        next:page

      });
    }

    /*const page = req.query.page || 1;
    const { pagination, listProduct } = await productModel.findByCatID(catID, page, perPage);*/
  });
  app.use("/about", aboutRoute);
  app.use("/product", productRoute);
}
