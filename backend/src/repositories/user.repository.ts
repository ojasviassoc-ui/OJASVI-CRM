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

  async findAll() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      fullName?: string;
      email?: string;
      role?: UserRole;
      isActive?: boolean;
    }
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deactivate(id: string) {
    return prisma.user.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}