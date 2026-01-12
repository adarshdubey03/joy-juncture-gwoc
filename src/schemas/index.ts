import * as z from "zod";
import { isValidPhoneNumber } from 'libphonenumber-js';

export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Email or Phone is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});


export const RegisterSchema = z.object({
    email: z.email({ message: "Email is required" }),
    phoneNumber: z.string().refine((val) => isValidPhoneNumber(val), {
        message: "Invalid phone number",
    }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
    name: z.string().min(3, { message: "Name must be at least 3 characters" })
});

export const ResetSchema = z.object({
    email: z.string().min(1, { message: "Email or Phone is required" }), // Relaxing validation here to allow phone input on Reset too if desired
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
});

// Export Domains
export * from "./user";
export * from "./product"; // Includes ProductSchema
export * from "./taxonomy";
export * from "./order";
export * from "./event";
export * from "./gamification"; // Includes Content & Puzzles