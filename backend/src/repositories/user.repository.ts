import { UserRole } from "@prisma/client";
import { prisma } from "../config/prisma.js";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
  }) {
    return prisma.user.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}