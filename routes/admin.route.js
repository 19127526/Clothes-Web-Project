import express from "express";
const router = express.Router();

import { productManagementView } from "../controllers/admin.controller.js";

router.get("/", productManagementView);

export default router;