import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100),

  email: z
    .email("Invalid email address")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum([
    "ADMIN",
    "MANAGER",
    "TEAM_LEADER",
    "SALES_EXECUTIVE",
    "TELECALLER",
  ]),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;