'use client'

import { useForm } from "react-hook-form"
import { LoginFormData, loginSchema } from "../lib/validation/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/app/lib/api/auth"


export default function LoginForm() {
    const {register, formState:{isSubmitting, errors,}, handleSubmit}= useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })
    const onSubmit = async(data:LoginFormData)=>{
        try{
            const res = await login(data)
            console.log('data',res)
        }catch(errors){
            console.error(errors)
        }

    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email"  id="email" {...register('email')} />
            {
                errors.email&&<>{errors.email.message}</>
            }
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password"  id="password" {...register('password')} />
            {
                errors.password&&<>{errors.password.message}</>
            }
        </div>
        <button type="submit">{isSubmitting?'Login in ...':'Login'}</button>
    </form>
  )
}
