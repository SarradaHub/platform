import { Router } from "express";
import { ApiKeyController } from "../controllers/apiKey.controller";
import { authenticate } from "../middleware/auth";

const router = Router();
const apiKeyController = new ApiKeyController();

router.post("/", authenticate, apiKeyController.create.bind(apiKeyController));
router.get("/", authenticate, apiKeyController.list.bind(apiKeyController));
router.delete("/:id", authenticate, apiKeyController.revoke.bind(apiKeyController));

export default router;

