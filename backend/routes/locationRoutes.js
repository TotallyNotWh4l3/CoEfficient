// backend/routes/locationRoutes.js
import express from "express";
import locationsController from "../controllers/locationsController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", locationsController.getAll);
router.post("/", locationsController.create);
router.patch("/:id", locationsController.update);
router.delete("/:id", locationsController.remove);

export default router;
