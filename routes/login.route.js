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

router.get("/register", registerView);
router.post("/register", authValidation("registerUser"), registerUser);

router.get("/login", loginView);
router.post("/login", authValidation("loginUser"), loginUser);

router.get("/logout", (req, res) => {
  req.session.passport

  req.logout();
  res.redirect("/");
});

router.post("/check_email", checkEmail);

export default router;
