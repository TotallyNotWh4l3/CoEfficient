import express from "express";
import themesController from "../controllers/themesController.js";
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

router.get("/stream", authenticateStream, themesController.stream);

router.use(authenticate);

router.get("/", themesController.getAll);
router.post("/", themesController.create);
router.patch("/:id", themesController.update);
router.delete("/:id", themesController.remove);

export default router;
