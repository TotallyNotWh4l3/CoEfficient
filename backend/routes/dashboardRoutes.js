// backend/routes/dashboardRoutes.js
import express from "express";
import dashboardController from "../controllers/dashboardController.js";
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

router.get("/stream", authenticateStream, dashboardController.stream);

router.use(authenticate);

router.get("/", dashboardController.getState);
router.patch("/layout", dashboardController.updateLayout);
router.post("/modules", dashboardController.addModule);
router.delete("/modules/:id", dashboardController.removeModule);
router.patch("/modules/:id/settings", dashboardController.updateModuleSettings);

export default router;
