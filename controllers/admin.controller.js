import adminModel from "../models/admin.model.js";
import shoppingModel from "../models/shopping.model.js";

const productManagementView = async function (req, res) {
  const perPage = 12;
  const page = req.query.page || 1;
  let { pagination, listProduct } = await shoppingModel.findAllProducts(
    page,
    perPage
  );
  res.render("product_management", {
    pagination: {
      page: pagination.current_page,
      limit: perPage,
      totalRows: pagination.total_items,
    },
    listProduct,
  });
};

const detailManagementView = async function (req, res) {
  const proID = req.params.ProID || 0;
  const product = await shoppingModel.findByProductID(proID);
  res.render("detail_management", { product });
};

const AddProduct = async function (req, res) {
  const ret = await adminModel.addProduct(req.body);
  res.redirect("/admin");
};

const DelProduct = async function (req, res) {
  const ret = await adminModel.delProduct(req.body.ProID);
  res.redirect("/admin");
};

export { productManagementView, detailManagementView, AddProduct, DelProduct };
