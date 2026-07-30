import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, healthCheck);

export default router;