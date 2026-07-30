import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = Router();
const userController = new UserController();

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  (req, res) => userController.getAll(req, res)
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => userController.getById(req, res)
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  (req, res) => userController.create(req, res)
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => userController.update(req, res)
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => userController.delete(req, res)
);

export default router;