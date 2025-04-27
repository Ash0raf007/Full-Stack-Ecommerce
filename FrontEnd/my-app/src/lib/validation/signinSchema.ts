import { z } from "zod";

export const signinSchema = z.object({
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
