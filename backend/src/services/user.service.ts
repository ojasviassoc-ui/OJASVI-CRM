import { UserRole } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.js";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../validators/user.validator.js";

export class UserService {
  private userRepository = new UserRepository();

  async createUser(data: CreateUserInput) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepository.create({
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      role: data.role as UserRole,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = await this.userRepository.update(id, {
      fullName: data.fullName,
      email: data.email,
      role: data.role as UserRole | undefined,
      isActive: data.isActive,
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deactivateUser(id: string) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const user = await this.userRepository.deactivate(id);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}