import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRegister, validateLogin, validateValidate } from "../middleware/validation";

const router = Router();
const authController = new AuthController();

router.post("/register", validateRegister, authController.register.bind(authController));
router.post("/login", validateLogin, authController.login.bind(authController));
router.post("/validate", validateValidate, authController.validate.bind(authController));
router.post("/refresh", authController.refreshToken.bind(authController));
router.post("/logout", authController.logout.bind(authController));

export default router;

