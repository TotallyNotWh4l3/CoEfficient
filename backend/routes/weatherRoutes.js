import express from "express";

import { getWeatherController } from "../controllers/weatherController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getWeatherController);

export default router;