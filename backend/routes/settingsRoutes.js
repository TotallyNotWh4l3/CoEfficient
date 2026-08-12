import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import SettingsController from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", authMiddleware, SettingsController.getSettings);

router.put("/", authMiddleware, SettingsController.updateSettings);

export default router;