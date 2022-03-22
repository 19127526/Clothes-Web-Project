import {engine} from "express-handlebars";
import numeral from "numeral";
export default function (app) {
    app.engine('hbs', engine({
        defaultLayout: 'layout.hbs',
        helpers: {
            format_number(val) {
                val=numeral(val).format('0,0')
                return val+' VNĐ'
            }
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');
}
