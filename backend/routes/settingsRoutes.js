
// ===================================================
// ファイル名: settingsRoutes.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: 設定ルート — CRUD、設定管理
// ===================================================

import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import SettingsController from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", authMiddleware, SettingsController.getSettings);

router.put("/", authMiddleware, SettingsController.updateSettings);

export default router;