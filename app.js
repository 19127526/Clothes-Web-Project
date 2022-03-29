import express from "express";
import morgan from "morgan";
import flash from "express-flash";
import session from "cookie-session";
import passport from "passport";
import bodyParser from "body-parser";

import activateViewMiddleware from "./middlewares/view.mdw.js";
import activateLocalMiddleware from "./middlewares/locals.mdw.js";

const app = express();
app.use(morgan('dev'));
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//middleware
activateLocalMiddleware(app);
activateViewMiddleware(app);

import loginRouter from "./routes/login.route.js";
import shoppingRouter from "./routes/shopping.route.js";
import adminRouter from "./routes/admin.route.js";

app.use(loginRouter);
app.use(shoppingRouter);
app.use("/admin", adminRouter);

//listen port
app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
