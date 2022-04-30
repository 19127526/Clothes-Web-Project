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
  const perPage = 12;
  const page = req.query.page || 1;
  let { pagination, listProduct } = await shoppingModel.findAllProducts(
    page,
    perPage
  );
  res.render("shop", {
    pagination: {
      page: pagination.current_page,
      limit: perPage,
      totalRows: pagination.total_items,
    },
    listProduct,
  });
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
  const nameParent="Sản phẩm"
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

export { homeView, shopView, categoryView, productView, aboutView };
