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

  async addCategory(category) {
    return await db("categories").insert(category);
  },

  async patchCategory(category) {
    const id = category.CatID;
    delete category.CatID;
    return await db("categories").where("CatID", id).update(category);
  },

  async addProduct(product) {
    return await db("products").insert({
      ProName: product.ProName,
      Price: product.Price,
      SizeS: "null",
      SizeM: "null",
      SizeL: "null",
      SizeXL: "null",
      FullDes: product.FullDes,
      CatID: product.CatID,
      Quantity: product.Quantity,
      Arrival: product.Arrival,
      Image: product.Image,
    });
  },

  async delProduct(id) {
    return await db("products").where("ProID", id).del();
  },

  async patchProduct(product) {
    const id = product.ProID;
    delete product.ProID;
    return await db("products").where("ProID", id).update(product);
  },
};
