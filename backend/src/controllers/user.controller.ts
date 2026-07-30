import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { createUserSchema } from "../validators/user.validator.js";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      // Validate request body
      const validatedData = createUserSchema.parse(req.body);

      // Create user
      const user = await userService.createUser(validatedData);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}