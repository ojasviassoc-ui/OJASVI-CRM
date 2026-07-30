import { Router } from "express";
import importController from "../controllers/import.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post(
  "/vehicles",
  upload.single("file"),
  (req, res) => importController.uploadVehicles(req, res)
);

export default router;