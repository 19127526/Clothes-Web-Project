import express from "express";
const router = express.Router();

import {
  registerView,
  loginView,
  registerUser,
  loginUser,
  authValidation
} from "../controllers/auth.controller.js";

router.get("/register", registerView);
router.post("/register", authValidation('registerUser'), registerUser);

router.get("/login", loginView);
router.post("/login", authValidation('loginUser'), loginUser);

export default router;