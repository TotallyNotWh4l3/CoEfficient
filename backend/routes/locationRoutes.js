
// ===================================================
// ファイル名: locationRoutes.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: ロケーションルート — CRUD、ロケーション管理
// ===================================================

import express from "express";
import locationsController from "../controllers/locationsController.js";
import authenticate from "../middleware/authMiddleware.js";
import JWT from "../utils/jwt.js";

const router = express.Router();

function authenticateStream(req, res, next) {
    const token = req.query.token;
    if (!token) return res.status(401).json({ message: "Token missing." });
    try {
        req.user = JWT.verifyToken(token);
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token." });
    }
}

router.get("/stream", authenticateStream, locationsController.stream);

router.use(authenticate);

router.get("/", locationsController.getAll);
router.post("/", locationsController.create);
router.patch("/:id", locationsController.update);
router.delete("/:id", locationsController.remove);

export default router;
