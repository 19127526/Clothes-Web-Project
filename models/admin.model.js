import db from "../utils/db.js";

export default {
  async findAllProducts(page, perPage) {
    let pagination = {};
    const total = await db("products").count("* as count").first();
    const total_pages = Math.ceil(total.count / perPage);
    page = Math.max(1, Math.min(page, total_pages));
    pagination.current_page = page;
    pagination.total_items = total.count;
    const offset = page - 1;
    const listProduct = await db("products")
      .limit(perPage)
      .offset(offset * perPage);
    return { pagination, listProduct };
  },
};
