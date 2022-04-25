import db from "../utils/db.js";

export default {
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
