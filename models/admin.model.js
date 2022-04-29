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
        .join('statusproduct','statusproduct.IdStatus','products.status')
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
      status:product.IdStatus
    })
    return check;
  },
  async findAllStatusProduct() {
    return db("statusproduct");
  },

  async findDetailAccountByID(userID){
    const list = await db("users").join('statususer','statususer.IdStatus','users.type').where("users.UserID", userID);
    const totalBill=await db('bill').count('BillID', {as: 'total'})
        .where('bill.User',userID)
    return {list ,totalBill };
  },
  async findDetailOrder(billid){
    const list3=await db('orders')
        .join('bill','bill.BillID','orders.BillID')
        .join('products','products.ProID','orders.ProID')
        .join('statusbill','statusbill.idstatus','orders.status')
        .where("orders.BillID", billid);
    return list3;
  },
  async findDetailBillByID(userID,filter){
    if(filter=='0'){
      const list = await db("users")
          .join("orders", "orders.UserID", "users.UserID")
          .join('bill','bill.BillID','orders.BillID')
          .join('statusbill','statusbill.idstatus','bill.Status')
          .join('products','products.ProID','orders.ProID').where("users.UserID", userID);
      const list2 = await db("bill")
          .join('statusbill','statusbill.idstatus','bill.Status')
          .where("bill.User", userID).orderBy('bill.Date','asc')
      const count=await db('bill').count('BillID', {as: 'total'}).where("bill.User", userID);
      /* list2.product=list;*/
      return {list2,count};
    }
    else if (filter=='1'){
      console.log("hello")
      const list2 = await db("bill")
          .join('statusbill','statusbill.idstatus','bill.Status')
          .where("bill.User", userID).orderBy('bill.Status','asc')
      const count=await db('bill').count('BillID', {as: 'total'}).where("bill.User", userID);
      /* list2.product=list;*/
      return {list2,count};
    }

  },
  async findAllStatusBill(){
    return db('statusbill')
  },
  async changeMethodBillAdmin(billid,status){
    const list=await db("bill").where('BillID',billid).update({
      Status:status,
    })
    return list;
  },
  async changeMethodOrderAdmin(billid,status){
    const list=await db("orders").where('BillID',billid).update({
      Status:status,
    });
    return list;
  },
  async updateStatusAccount(entity){
    const list=await db("users").where('UserID',entity.id).update({
      type:entity.type
    })
  },
  async findBillDetailByBillID(billid){
    const list2 = await db("bill")
        .join('statusbill','statusbill.idstatus','bill.Status')
        .where("bill.BillID", billid).select('*');
    return list2;
  }

  /*const totalBill=await db('bill')
      .join('orders','orders.BillID','bill.BillID')
      .join('statusbill','statusbill.idstatus','bill.Status')
      .where('orders.UserID',userID)*/
  /*const list = await db("users")
  .join("orders", "orders.UserID", "users.UserID")
      .join('bill','bill.BillID','orders.BillID')
      .join('statusbill','statusbill.idstatus','bill.Status')
      .join('products','products.ProID','orders.ProID').where("users.UserID", userID);*/

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