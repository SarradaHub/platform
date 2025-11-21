import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import apiKeyRoutes from "./apiKey.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/api-keys", apiKeyRoutes);

export default router;

