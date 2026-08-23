import express from "express";
import scheduleController from "../controllers/scheduleController.js";
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

router.get("/stream", authenticateStream, scheduleController.stream);

router.use(authenticate);

router.get("/today", scheduleController.getToday);
router.get("/upcoming", scheduleController.getUpcoming);
router.get("/range", scheduleController.getRange);
router.get("/sync", scheduleController.getSince);
router.get("/tags", scheduleController.getTags);
router.post("/tags", scheduleController.upsertTag);
router.delete("/tags/:id", scheduleController.removeTag);
router.get("/", scheduleController.getAll);

router.post("/", scheduleController.create);
router.patch("/:id", scheduleController.update);
router.delete("/:id", scheduleController.remove);

export default router;
