import { engine } from "express-handlebars";
import numeral from "numeral";
import paginateHelper from "express-handlebars-paginate";
import hbsHelpers from "handlebars-helpers";
import hbsSections from "express-handlebars-sections";
import moment from "moment";

export default function (app) {
  app.engine(
    "hbs",
    engine({
      defaultLayout: "layout.hbs",
      helpers: {
        format_number(val) {
          val = numeral(val).format("0,0");
          return val + " VNĐ";
        },
        paginateHelper: paginateHelper.createPagination,
        section: hbsSections(),
        hbsHelpers: hbsHelpers,
        time(val) {
          return moment(val).format("DD/MM/YYYY");
        },
      },
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "./views");
}
