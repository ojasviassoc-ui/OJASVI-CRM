import type { Request, Response } from "express";
import importService from "../services/import.service.js";

class ImportController {
  async uploadVehicles(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const rows = await importService.parseCSV(req.file.path);

      return res.status(200).json({
        success: true,
        message: "CSV parsed successfully",
        totalRecords: rows.length,
        preview: rows.slice(0, 10),
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to parse CSV file",
      });
    }
  }
}

export default new ImportController();