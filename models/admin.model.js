import db from "../utils/db.js";

export default {
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
  async findByCatID(catID) {
    const list = await db('products').where('CatID', catID)
    return list
  },
  async removeProDuctById(proid){
    const check=db('products').where('ProID',proid).del();
    return check;
  },
  findTotalProDuctByID(CatID){
    return db("products").count('CatID', {as: 'total'}).where('CatID',CatID);
  },
  async findDetailByProductID(proID) {
    const list = await db("products")
        .join("categories", "products.CatID", "=", "categories.CatID")
        .where("products.ProID", proID);
    return list[0];
  },
  async updateDesByProID(proID,product){
    const check=db('products').where('ProID',proID).update({
      ProName:product.title,
      Price:product.price,
      FullDes:product.des,
      CatID:product.category,
      Quantity:product.quantity,
      Arrival:product.arrival,
    })
    return check;
  },
  async findDetailAccountByID(userID){
    const list = await db("users")
        .join("", "products.CatID", "=", "categories.CatID")
        .where("products.ProID", proID);
    return list[0];
  }
  /*async addCategory(category) {
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
  },*/
};