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
          equal(x1,x2){
            return x1===x2;
          },
          multi(x1,x2){
            x1=parseInt(x1);
            x2=parseInt(x2)
            return x1+x2;
          },
        check(x1){
          return x1!==0
        },
        product(index){
          return index+' Sản phẩm'
        },
        format_name(x1,x2){
          return x1+ " "+x2;
        },
        checkBlock(x1){
          return x1!==-1;
        },
        checkFilter(x1){
          console.log(x1)
          return x1==='1';
        },
        timeBill(val){
          return moment(val).format("hh:mm:ss DD/MM/YYYY");
        },
      },
      extname: ".hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "./views");
}
