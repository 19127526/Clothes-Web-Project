import express from "express";
import morgan from "morgan";
import flash from "express-flash";
import session from "cookie-session";
import passport from "passport";

import activateViewMiddleware from "./middlewares/view.mdw.js";
//import activateRouteMiddleware from "./middlewares/routes.mdw.js";
import activateLocalMiddleware from "./middlewares/locals.mdw.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

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
//activateRouteMiddleware(app);

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
