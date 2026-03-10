import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        fullName: z
            .string()
            .min(3, "Full name should be more than 3 characters")
            .max(20, "Full name should be less than 20 characters"),
        email: z.string().email("Invalid email formate"),
        password: z
            .string()
            .min(8, "Password must contain atleast 8 characters")
            .max(50, "Password can't be greater than 50 characters"),
        phone: z
            .string()
            .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    }),
    params: z.object({}).optional(),
});
