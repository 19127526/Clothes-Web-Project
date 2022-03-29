import express from "express";
import morgan from "morgan";
import activateViewMiddleware from "./middlewares/view.mdw.js";
//import activateRouteMiddleware from "./middlewares/routes.mdw.js";
import activateLocalMiddleware from "./middlewares/locals.mdw.js";
import bp from 'body-parser'
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use("/public", express.static("public"));
app.set("trust proxy", 1); // trust first proxy

//middleware
activateLocalMiddleware(app);
activateViewMiddleware(app);
//activateRouteMiddleware(app);

import authRouter from "./routes/auth.route.js";
app.use(authRouter);
import shoppingRouter from "./routes/shopping.route.js";
app.use(shoppingRouter);
import adminRouter from "./routes/admin.route.js";
app.use("/admin", adminRouter);

//listen port
app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
