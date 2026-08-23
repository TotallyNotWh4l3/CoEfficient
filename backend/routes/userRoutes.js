import express from "express";
import UserController from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";
import requireRole from "../middleware/requireRole.js";

const router = express.Router();

router.use(authenticate, requireRole("admin"));

router.get("/", UserController.list);
router.post("/", UserController.create);
router.patch("/:id/role", UserController.updateRole);
router.delete("/:id", UserController.remove);

export default router;
