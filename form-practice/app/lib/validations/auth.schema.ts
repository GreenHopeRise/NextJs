import z, { email } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1,'email is required').email('please enter valid email'),
    password: z.string().min(1,'password is required').min(6,'Password must be at least 6 characters')
})
export type LoginFormData = z.infer<typeof loginSchema>



export const loingSchema2 = z.object({
    email: z.string().min(1,'Enter Email').email('Enter Valid Email'),
    password: z.string().min(1,'Enter Passwore').min(6,'At leas 6')
})

export type LoginFormData2 = z.infer<typeof loingSchema2>