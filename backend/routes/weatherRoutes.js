import express from "express";

import { getWeatherController } from "../controllers/weatherController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ message: "Weather route works!" });
});

router.get("/", authMiddleware, getWeatherController);

export default router;
