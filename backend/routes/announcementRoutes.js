// backend/routes/announcementRoutes.js
import express from "express";
import announcementController from "../controllers/announcementController.js";
import authenticate from "../middleware/authMiddleware.js";
import JWT from "../utils/jwt.js";

const router = express.Router();

// Native EventSource cannot send an Authorization header, so the SSE stream
// takes the token as a query param instead and verifies it manually here.
// Frontend: announcementService.openStream() appends ?token=<jwt>.
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

router.get("/stream", authenticateStream, announcementController.stream);

// Everything else uses the normal header-based auth.
router.use(authenticate);

router.get("/recent", announcementController.getRecent);
router.get("/archive", announcementController.getArchived);
router.get("/sync", announcementController.getSince);
router.get("/:id/logs", announcementController.getLogs);
router.get("/", announcementController.getAll);

router.post("/", announcementController.create);
router.patch("/:id", announcementController.update);
router.delete("/:id", announcementController.remove);
router.post("/:id/archive", announcementController.archiveNow);
router.post("/:id/restore", announcementController.restore);

export default router;
