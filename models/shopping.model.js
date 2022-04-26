import db from "../utils/db.js";


let user;
let billid;
export default {
  async findAllCategories() {
    return db("categories");
  },

  async findPopularProducts() {
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
  async addOrderAuthen(userid,entity){

    const list=await db("orders").insert({
      OrderDate:new Date(),
      UserID:userid,
      ProID:entity.id,
      SizeID: entity.size,
      Amount:entity.quantity,
      Total:entity.total,
      BillID:entity.billid,
      status:0
    })
  },

  async addOrderGuest(entity){
    const list=await db("orders").insert({
      OrderDate:new Date(),
      UserID: -1,
      ProID:entity.id,
      SizeID: entity.size,
      Amount:entity.quantity,
      Total:entity.total,
      BillID:entity.billid,
      status:0
    })
  },
 totalProDuctInCartAuthen(id,billid){
   return db("orders").count('OrderID', {as: 'total'}).join('bill','bill.BillID','orders.BillID').andWhere(function (){
     this.where( 'orders.UserID',id);
     this.where('orders.BillID',billid)
   })
  },
  async delProDuctInCartGuest(){
    /*const list=await db("orders").where('UserID', -1).del();*/
    const list2=await db("orders").where('orders.status',0).del()
    return list2;
  },

  async delBill(){
    /*const list=await db("orders").where('UserID', -1).del();*/
    const list2=await db("bill").where('bill.Status',0).del()
    console.log("hehe")
    return list2;
  },
   totalProDuctInCartGuest(billid){
    return db("orders").count('OrderID', {as: 'total'}).join('bill','bill.BillID','orders.BillID').andWhere(function (){
      this.where( 'orders.UserID',-1);
      this.where('orders.BillID',billid)
    });
  },
  async findAllCartByUserID() {
    const sql =
        "select s.*\n" +
        "from products s\n" +
        "ORDER BY s.Arrival-CURRENT_DATE DESC\n" +
        "LIMIT 9";
    const data = await db.raw(sql);
    return data[0];
  },
  async changeProductInCartAuthen(id){
    user=id;
    const list=await db("orders").where('UserID',-1).update({
      UserID: id,
    })
    return list;
  },
  async changeProductInCartGuest(){
    const list=await db("orders").where('UserID',user).update({
      UserID: -1,
    })
    return list;
  },
  async findAllCartByID(id,billid) {
    const list = await db("orders").join("products", "products.ProID", "orders.ProID").andWhere(function (){
      this.where('UserID',id);
      this.where('orders.BillID',billid);
    })
    return list;
  },
  async changeMethodBill(billid){
    const list=await db("bill").where('BillID',billid).update({
      Status:1
    })
    return list;
  },
  async changeMethodOrder(billid){
    const list=await db("orders").where('BillID',billid).update({
      Status:1
    });
    return list;
  },
  async updateQuantityByOrderID(entity){
    if(entity.amount===0){
      const list=await db("orders").where('OrderID',entity.id).del();
      return list;
    }
    else {
      const list = await db("orders").where('OrderID', entity.id).update({
        Amount: entity.amount,
        Total:entity.total
      })
      return list;
    }
  },

  async insertBill(){
    const list =await db("bill").insert({
      Status:0
    }).select("bill.BillID");
    return list;
  },


  async findAllOrderByID(id,status) {
    const list = await db("orders").join("products", "products.ProID", "orders.ProID").join('bill','bill.BillID','orders.BillID').andWhere(function (){
      this.where('UserID',id);
      this.where('orders.status',status)
    })
    return list;
  },

};