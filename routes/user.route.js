import express from "express";
import { protectRoute } from "../middlewares/auth/protect.js";
import { profileView, profileChange } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/profile", protectRoute, profileView);

router.post("/update_profile", protectRoute, profileChange);

export default router;
