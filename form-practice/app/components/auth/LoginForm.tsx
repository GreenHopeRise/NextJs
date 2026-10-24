'use client'
import { login } from "@/app/lib/api/auth"
import { LoginFormData2, loingSchema2,} from "@/app/lib/validations/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


export default function LoginForm() {
    const {register, handleSubmit, formState:{errors, isSubmitting, }}= useForm<LoginFormData2>({
        resolver: zodResolver(loingSchema2)
        
    })
    const onSubmit = async(data: LoginFormData2)=>{
       try{
        const res = await login(data)
        console.log('your login successfull:',res)
       }catch(errors){
        console.error(errors)
       }
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email"  id="email" {...register('email')} />
                {
                    errors.email&&<p>{errors.email.message}</p>
                }
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password"  id="password" {...register('password')} />
                {
                    errors.password&&<p>{errors.password.message}</p>
                }
            </div>
            <button type="submit">{isSubmitting?'Login in ...': 'Login'}</button>
        </form>
    </div>
  )
}
