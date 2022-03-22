import db from "../utils/db.js";

export default {
    findPopularProduct(){
        return db("products").join("orders","products.ProID","orders.ProID").limit(6).offset(0)
    },
    async findByCatID(catID) {
        const list = await db('products').where('CatID', catID)
        return list
    },
    async findArrival(){
        const sql='select s.*\n' +
            'from products s\n' +
            'ORDER BY s.Arrival-CURRENT_DATE DESC\n' +
            'LIMIT 9';
        const data=await db.raw(sql)
        return data[0]
    },
    async findByProID(proID){
        const list = await db('products').
        join('categories','products.CatID', '=', 'categories.CatID').
        where('products.ProID',proID)
        return list[0];
    },

}
