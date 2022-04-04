import express from "express";
import morgan from "morgan";
import activateViewMiddleware from "./middlewares/view.mdw.js";
import bcrypt from 'bcrypt'
import expresssession from 'express-session'
import passportlocal from 'passport-local'
//import activateRouteMiddleware from "./middlewares/routes.mdw.js";
import activateLocalMiddleware from "./middlewares/locals.mdw.js";
import activateSessionMiddleware from "./middlewares/session.mdw.js";

import bp from 'body-parser'
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use("/public", express.static("public"));
//middleware
activateSessionMiddleware(app)
activateLocalMiddleware(app);
activateViewMiddleware(app);
//activateRouteMiddleware(app);
import shoppingRouter from "./routes/shopping.route.js";
app.use(shoppingRouter);
import adminRouter from "./routes/admin.route.js";
app.use("/admin", adminRouter);
import authRouter from "./routes/auth.route.js";
app.use(authRouter);



//listen port
app.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});
