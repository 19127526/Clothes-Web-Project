import express from "express";
const router = express.Router();

import {
  registerView,
  loginView,
  registerUser,
  loginUser,
  authValidation,
  checkEmail
} from "../controllers/login.controller.js";
import shoppingModel from "../models/shopping.model.js";

router.get("/register", registerView);
router.post("/register", authValidation("registerUser"), registerUser);

router.get("/login", loginView);
router.post("/login", authValidation("loginUser"), loginUser);

router.get("/logout", async (req, res) => {
  const promise=new Promise(async (resolve, reject) => {
    const changeAuthen = await shoppingModel.changeProductInCartGuest(req.session.passport.user.id);
    resolve("data")
  });
  promise.then(function (){
    req.logout();
    res.redirect("/");
  })
});

router.post("/check_email", checkEmail);

export default router;
