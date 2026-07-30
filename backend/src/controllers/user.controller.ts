import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validator.js";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const validatedData = createUserSchema.parse(req.body);

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

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const validatedData = updateUserSchema.parse(req.body);

      const user = await userService.updateUser(
        req.params.id,
        validatedData
      );

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const user = await userService.deactivateUser(req.params.id);

      return res.status(200).json({
        success: true,
        message: "User deactivated successfully",
        data: user,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}