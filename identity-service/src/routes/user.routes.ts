import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth";

const router = Router();
const userController = new UserController();

router.get("/:id", authenticate, userController.getById.bind(userController));
router.get("/", authenticate, userController.getCurrent.bind(userController));
router.patch("/:id", authenticate, userController.update.bind(userController));

export default router;

