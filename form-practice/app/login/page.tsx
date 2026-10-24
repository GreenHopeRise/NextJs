import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        <LoginForm/>
      </h1>
    </main>
  );
}