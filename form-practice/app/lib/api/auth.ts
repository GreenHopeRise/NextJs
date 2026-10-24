import type { LoginFormData } from "../validations/auth.schema";

export async function login(data: LoginFormData) {
  const response = await fetch("https://dashboar-backend-8mr4.onrender.com/api/logi", {
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



 