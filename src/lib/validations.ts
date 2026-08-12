import { z } from "zod";




export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-zA-Z]/, "Must contain at least one letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
});



const registerBaseSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-zA-Z]/, "Must contain at least one letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  role: z.enum(["TENANT", "LANDLORD"]),
});

export const registerSchema = registerBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);


export const fullNameFieldSchema = registerBaseSchema.shape.fullName;
export const emailFieldSchema = registerBaseSchema.shape.email;
export const passwordFieldSchema = registerBaseSchema.shape.password;


export const loginEmailFieldSchema = loginSchema.shape.email;
export const loginPasswordFieldSchema = loginSchema.shape.password;


export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .optional(),

  phone: z
    .string()
    .trim()
    .nullable()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]{6,20}$/.test(val), {
      message: "Please enter a valid phone number",
    }),
});

export const profileNameFieldSchema = profileSchema.shape.name;
export const profilePhoneFieldSchema = profileSchema.shape.phone;