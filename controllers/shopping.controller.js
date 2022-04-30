import shoppingModel from "../models/shopping.model.js";

const homeView = async function (req, res) {
  const arrivalList = await shoppingModel.findNewArrivals();
  const popularList = await shoppingModel.findPopularProducts();
  res.render("home", {
    arrivalList,
    popularList,
  });
};

const shopView = async function (req, res) {
  const { priceRange, listCat } = await shoppingModel.findAllFilters();
  res.render("shop", {priceRange, listCat, listCatID: JSON.stringify(listCat.map(item => item.CatID))});
};

const categoryView = async function (req, res) {
  const perPage = 12;
  const catID = req.params.CatID || 0;
  const page = req.query.page || 1;
  let { pagination, listProduct } = await shoppingModel.findByCategoryID(
    catID,
    page,
    perPage
  );
  res.render("category", {
    pagination: {
      page: pagination.current_page,
      limit: perPage,
      totalRows: pagination.total_items,
    },
    listProduct,
  });
};

const productView = async function (req, res) {
  const proID = req.params.ProID || 0;
  const product = await shoppingModel.findByProductID(proID);
  res.render("product", { product });
};

const aboutView = function (req, res) {
  res.render("about");
};

const getProducts = async function (req, res) {
  const perPage = req.query.limit;
  const page = req.query.page;
  const order = req.query.order;
  const filters = req.query.filters;

  const { pagination, listProduct } = await shoppingModel.findProductWithQueries(
    page,
    perPage,
    order,
    filters
  );
  res.json({
    pagination: {
      page: pagination.current_page,
      limit: perPage,
      totalPages: pagination.total_pages,
      totalItems: pagination.total_items,
    },
    listProduct,
  });
};

export { homeView, shopView, categoryView, productView, aboutView, getProducts };
