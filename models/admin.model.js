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
  addCategories(category){
    return db('categories').insert(category);
  },
  patchCategories(category){
    const id=category.CatID;
    delete category.CatID;
    return db('categories').where('CatID',id).update(category)
  },
  addProduct(product){
    return db('products').insert({
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
      Image: product.Image
    });
  },
  delProduct(id){
    return db('products').where('ProID',id).del()
  },
  patchProduct(product){
    const id=product.ProID;
    delete product.ProID;
    return db('products').where('ProID',id).update(product)
  },
};
