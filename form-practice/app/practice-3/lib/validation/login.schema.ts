import z, { email } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1,'Enter Email').email('Enter valid Email'),
    password: z.string().min(1,'Enter password').min(6,'At least 6')
})

export type LoginFormData = z.infer<typeof loginSchema>