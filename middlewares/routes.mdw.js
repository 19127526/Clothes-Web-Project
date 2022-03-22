import {dirname} from "path";
import {fileURLToPath} from "url";
import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";
import productRoute from "../routes/product.route.js";


const __dirname=dirname(fileURLToPath(import.meta.url))
export default function (app){
    app.get('/', async function (req, res) {
        const arrivalList = await productModel.findArrival();
        const popularList=await productModel.findPopularProduct();
        res.render('home',{
            product:arrivalList,
            popularList
        })
    })
    app.use('/product',productRoute)
}


