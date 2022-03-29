import adminModel from "../models/admin.model.js";

const productManagementView = async function (req, res) {
    const perPage = 12;
    const page = req.query.page || 1;
    let { pagination, listProduct } = await adminModel.findAllProducts(
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

export {
    productManagementView,
};