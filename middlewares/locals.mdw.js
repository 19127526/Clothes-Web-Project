import categoryModel from "../models/category.model.js";


export default function (app){
    app.use(async function (req, res, next) {
        const rawData = await categoryModel.findAll();
        res.locals.lcCategories=rawData;
        next();
    });
}