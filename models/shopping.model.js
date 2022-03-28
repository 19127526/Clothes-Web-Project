import db from "../utils/db.js";

export default {
  findAllCategories() {
    return db("categories");
  },

  findPopularProducts() {
    return db("products")
      .join("orders", "products.ProID", "orders.ProID")
      .limit(6)
      .offset(0);
  },

  async findAllProducts(page, perPage) {
    let pagination = {};
    const total = await db("products").count('* as count').first();
    const total_pages = Math.ceil(total.count / perPage);
    page = Math.max(1, Math.min(page, total_pages));
    pagination.current_page = page;
    pagination.total_items = total.count;
    const offset = page - 1;
    const listProduct = await db("products").limit(perPage).offset(offset * perPage);
    return { pagination, listProduct };
  },

  async findByCategoryID(catID, page, perPage) {
    let pagination = {};
    const total = await db("products").count('* as count').where("CatID", catID).first();
    const total_pages = Math.ceil(total.count / perPage);
    page = Math.max(1, Math.min(page, total_pages));
    pagination.current_page = page;
    pagination.total_items = total.count;
    const offset = page - 1;
    const listProduct = await db("products").where("CatID", catID).limit(perPage).offset(offset * perPage);
    return { pagination, listProduct };
  },

  async findNewArrivals() {
    const sql =
      "select s.*\n" +
      "from products s\n" +
      "ORDER BY s.Arrival-CURRENT_DATE DESC\n" +
      "LIMIT 9";
    const data = await db.raw(sql);
    return data[0];
  },

  async findByProductID(proID) {
    const list = await db("products")
      .join("categories", "products.CatID", "=", "categories.CatID")
      .where("products.ProID", proID);
    return list[0];
  },
};