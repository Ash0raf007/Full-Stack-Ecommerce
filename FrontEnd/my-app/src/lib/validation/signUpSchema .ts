// src/lib/validation/signUpSchema.ts
import { z } from "zod";

export const signUpSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot be longer than 50 characters"),

  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot be longer than 50 characters"),

  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot be more than 20 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
