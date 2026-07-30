import { UserRole } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.js";
import type { CreateUserInput } from "../validators/user.validator.js";

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: CreateUserInput) {
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await this.userRepository.create({
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      role: data.role as UserRole,
    });

    // Don't return password
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}