import LoginPage from "./login/page";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        <LoginPage/>
      </h1>
    </main>
  );
}