import type { Request, Response } from "express";

export const healthCheck = (
  req: Request,
  res: Response
): void => {
  res.status(200).json({
    success: true,
    project: "OJASVI CRM",
    version: "1.0.0",
    status: "Running",
    timestamp: new Date(),
  });
};