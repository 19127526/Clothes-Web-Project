import express from "express";
const router = express.Router();

import {
  registerView,
  loginView,
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";

router.get("/register", registerView);
router.post("/register", registerUser);

router.get("/login", loginView);
router.post("/login", loginUser);

export default router;