import dotenv from "dotenv";
dotenv.config();

import express from "express";
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

const app = express();
const port = process.env.PORT || 3000;

app.use(flash());
//app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
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
app.use("/admin", adminRouter);
app.use("/public", express.static("public"));

//listen port
app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
