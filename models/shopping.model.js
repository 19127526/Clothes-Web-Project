import db from "../utils/db.js";


let user;
let billid;
export default {
  async findAllCategories() {
    return db("categories");
  },

  async findProductWithQueries(page, perPage, order, filters) {
    let pagination = {};
    const total = await db("products")
      .count("* as count")
      .first()
      .whereBetween("Price", [filters.price.min, filters.price.max])
      .whereIn("CatID", filters.categories)
      .whereILike("ProName", `%${filters.name}%`);
    const total_pages = Math.ceil(total.count / perPage);
    page = Math.max(1, Math.min(page, total_pages));
    pagination.current_page = page;
    pagination.total_items = total.count;
    pagination.total_pages = total_pages;
    const offset = page - 1;
    let listProduct;
    let orderBy = { column: "ProID", direction: "desc" };

    if (order === "price-desc") {
      orderBy.column = "Price";
    } else if (order === "price-asc") {
      orderBy.column = "Price";
      orderBy.direction = "asc";
    }
    try {
      listProduct = await db("products")
        .whereBetween("Price", [filters.price.min, filters.price.max])
        .whereIn("CatID", filters.categories)
        .whereILike("ProName", `%${filters.name}%`)
        .orderBy(orderBy.column, orderBy.direction)
        .limit(perPage)
        .offset(offset * perPage);
    } catch (error) {
      console.log(error);
    }
    return { pagination, listProduct };
  },

  async findAllFilters() {
    const list = await db("products");

    let minPrice = list[0].Price;
    let maxPrice = list[0].Price;

    for (let i = 1; i < list.length; i++) {
      if (list[i].Price < minPrice) {
        minPrice = list[i].Price;
      }
      if (list[i].Price > maxPrice) {
        maxPrice = list[i].Price;
      }
    }

    const listCat = await db("categories");

    return {
      priceRange: {
        min: minPrice,
        max: maxPrice,
      },
      listCat,
    };
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
    const listProduct = await db("products").join('statusproduct','statusproduct.IdStatus','products.status').where("CatID", catID).limit(perPage).offset(offset * perPage);
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
     async findAllProductsToChange() {
         const total = await db("products").count('ProID', {as: 'total'});
         const list =await db("products");
         return {total,list}
     },

    async ChangeStatusProduct(entity,status) {
        const list =await db("products").where('products.ProID',entity.ProID).update({
            status:status
        })
        return list;
    },

  async findByProductID(proID) {
    const list = await db("products")
      .join("categories", "products.CatID", "=", "categories.CatID")
        .join('statusproduct','statusproduct.IdStatus','products.status')
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
      status:-1
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
      status:-1
    })
  },
 totalProDuctInCartAuthen(id,billid){
   return db("orders").count('OrderID', {as: 'total'}).join('bill','bill.BillID','orders.BillID').andWhere(function (){
     this.where( 'orders.UserID',id);
     this.where('orders.BillID',billid);
     this.where('orders.status',-1)
   })
  },
  async delProDuctInCartGuest(){
    const list2=await db("orders").where('orders.status',-1).del()
    return list2;
  },

  async delBill(){
    const list2=await db("bill").where('bill.Status',-1).del()

    return list2;
  },
   totalProDuctInCartGuest(billid){
    return db("orders").count('OrderID', {as: 'total'}).join('bill','bill.BillID','orders.BillID').andWhere(function (){
      this.where( 'orders.UserID',-1);
      this.where('orders.BillID',billid);
      this.where('orders.status',-1)
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
  async changeProductInCartGuest(user){
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
  async changeMethodBill(billid,entity){
    const list=await db("bill").where('BillID',billid).update({
      Status:1,
      Address:entity.address,
      PhoneNumber:entity.phonenumber,
      Email:entity.email,
      Date:new Date(),
      User:entity.User
    })
    return list;
  },
  async changeMethodOrder(billid){
    const list=await db("orders").where('BillID',billid).update({
      Status:1,
      OrderDate:new Date()
    });
    return list;
  },
  async updateQuantityByOrderID(entity){

    if(entity.amount==='0'){
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
  async selectProductAfterOrder(billid){
    const list=await db("orders").join('products','products.ProID','orders.ProID').andWhere(function (){
      this.where('orders.BillID',billid)
      this.where('orders.status','!=',-1)
    }).select('orders.ProID', 'orders.Amount','products.Quantity');

    return list;
  },
  async totalOrder(billid){
    const total= await db("orders").count('OrderID', {as: 'total'}).where('orders.BillID',billid);
    return total
  },
  async updateQuantityProduct(entity){
    console.log(entity)
    const list=await db("products").where('ProID',entity.ProID).update({
      Quantity:(entity.Quantity-entity.Amount)
    });
    return list;
  },

  async insertBill(){
    const list =await db("bill").insert({
      Status:-1
    }).select("bill.BillID");
    return list;
  },



  async findAllOrderByID(id) {
    const list = await db("orders").join("products", "products.ProID", "orders.ProID").join('bill','bill.BillID','orders.BillID').join('statusbill','statusbill.idstatus','orders.status').andWhere(function (){
      this.where('UserID',id);
      this.where('orders.status','!=',-1)
    })
    return list;
  },


  async insertCommentByUserId(content,id,proid) {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    const dateTemp=date + "-" + month + "-" + year;
    return db("comment").insert({'comment.userid':id,
      'comment.content':content,
      'comment.date':dateTemp,
      'comment.productid':proid
    })
  },
    async findAllComment(proID) {
        const list = await db("comment")
            .join("users", "users.UserID", "comment.userid")
            .where("comment.productid", proID)
            .select(["users.firstname", "users.lastname", "comment.content", "comment.date", "comment.commentid"])
            .orderBy('comment.commentid','desc');
        return list;
    },
    async findDetailBillByID(userID){
            const list = await db("users")
                .join("orders", "orders.UserID", "users.UserID")
                .join('bill','bill.BillID','orders.BillID')
                .join('statusbill','statusbill.idstatus','bill.Status')
                .join('products','products.ProID','orders.ProID').where("users.UserID", userID);
            const list2 = await db("bill")
                .join('statusbill','statusbill.idstatus','bill.Status')
                .where("bill.User", userID).orderBy('bill.Date','desc')
            const count=await db('bill').count('BillID', {as: 'total'}).where("bill.User", userID);
            /* list2.product=list;*/
            return {list2,count};
    },
    async findProductRelatedID(id){
        const sql=`select c.* FROM products  as c
                    where c.CatID="${id}"
                   ORDER BY RAND ()
                    limit 3

        `
        const raw_data= await db.raw(sql)
        return raw_data[0]
    }

};