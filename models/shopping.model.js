import db from "../utils/db.js";

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

  async findByCategoryID(catID, page, perPage) {
    let pagination = {};
    const total = await db("products")
      .count("* as count")
      .where("CatID", catID)
      .first();
    const total_pages = Math.ceil(total.count / perPage);
    page = Math.max(1, Math.min(page, total_pages));
    pagination.current_page = page;
    pagination.total_items = total.count;
    const offset = page - 1;
    const listProduct = await db("products")
      .where("CatID", catID)
      .limit(perPage)
      .offset(offset * perPage);
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
};
