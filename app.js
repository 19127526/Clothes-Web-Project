import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import flash from "express-flash";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";

import activateViewMiddleware from "./middlewares/view.mdw.js";
import activateLocalMiddleware from "./middlewares/locals.mdw.js";

import loginRouter from "./routes/login.route.js";
import shoppingRouter from "./routes/shopping.route.js";
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import vnpayRouter from "./routes/paypal.route.js";
import {protectAdminRoute, protectRoute} from "./middlewares/auth/protect.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(flash());
//app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000},
  })
);
app.use(passport.initialize());
app.use(passport.session());

//middleware
activateLocalMiddleware(app);
activateViewMiddleware(app);

//router
app.use(loginRouter);
app.use(shoppingRouter);
app.use(userRouter);
app.use(vnpayRouter)
app.use("/admin",protectRoute,adminRouter);
app.use("/public", express.static("public"));
app.use("/publicAdmin", express.static("publicAdmin"));

//listen port
app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
