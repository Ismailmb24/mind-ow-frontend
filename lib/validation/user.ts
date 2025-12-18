import * as z from "zod"

export const userSchema = z.object({
    email: z.email("Ivalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const userCreateSchema = userSchema.extend({
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type UserInput = z.infer<typeof userSchema>
export type UserCreateInput = z.infer<typeof userCreateSchema>