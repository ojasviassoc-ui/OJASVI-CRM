import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

// Protected route
import { authenticate, authorize } from "../middleware/auth.middleware.js";

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  (req, res) => userController.create(req, res)
);
export default router;