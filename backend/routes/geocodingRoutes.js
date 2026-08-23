// backend/routes/geocodingRoutes.js
import express from "express";
import geocodingController from "../controllers/geocodingCotroller.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/search", geocodingController.search);
router.get("/reverse", geocodingController.reverse);

export default router;
