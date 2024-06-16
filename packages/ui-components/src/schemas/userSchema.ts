import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type User = z.infer<typeof UserSchema>;
