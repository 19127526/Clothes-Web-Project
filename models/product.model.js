import db from "../utils/db.js";
import knex from "../utils/db.js";

export default {
  findPopularProduct() {
    return db("products")
      .join("orders", "products.ProID", "orders.ProID")
      .limit(6)
      .offset(0);
  },
 /* async findByCatID(catID, page, per_page) {
    let pagination = {};
    const total = await db("products").count('* as count').where("CatID", catID).first();
    pagination.total_pages = Math.ceil(total.count / perPage);
    page = max(1, min(page, pagination.total_pages));
    pagination.current_page = page;
    pagination.per_page = per_page;
    pagination.total_items = total.count;
    const offset = page - 1;
    const list = await db("products").where("CatID", catID).limit(perPage).offset(page * 12);
    return {pagination, list};
  },*/
  async findByCatID(catID) {
    const list = await db('products').where('CatID', catID)
    return list
  },
  async pagination(limit,offset,catID){
    const list =await db('products').where('CatID', catID).limit(limit).offset(offset)

    return list
  },
  async countByCatId(catID){
    const list =await db('products').where('CatID',catID).count({ amount:'ProID'})
    return list[0].amount;
  },

  async findArrival() {
    const sql =
      "select s.*\n" +
      "from products s\n" +
      "ORDER BY s.Arrival-CURRENT_DATE DESC\n" +
      "LIMIT 9";
    const data = await db.raw(sql);
    return data[0];
  },

  async findByProID(proID) {
    const list = await db("products")
      .join("categories", "products.CatID", "=", "categories.CatID")
      .where("products.ProID", proID);
    return list[0];
  },
};
