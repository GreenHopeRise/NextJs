npm install react-hook-form zod @hookform/resolvers



form-practice/
├── app/
│   └── login/
│       └── page.tsx
│
├── components/
│   └── auth/
│       └── LoginForm.tsx
│
├── lib/
│   ├── api/
│   │   └── auth.ts
│   └── validations/
│       └── auth.schema.ts
│
└── ...



auth.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;



auth.ts
import type { LoginFormData } from "../validations/auth.schema";

export async function login(data: LoginFormData) {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message || "Login failed"
    );
  }

  return response.json();
}




LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormData,
} from "@/lib/validations/auth.schema";

import { login } from "@/lib/api/auth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data);

      console.log("Login successful:", result);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-5"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-1 block"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full rounded-md border p-2"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="w-full rounded-md border p-2"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-black p-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}


