import type { Metadata } from "next";
import { AuthScreen } from "@/components/AuthScreen";
import { LoginForm } from "@/components/AuthForms";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Curio with your email and password.",
};

export default function LoginPage() {
  return (
    <AuthScreen
      title="Welcome back"
      lede="Pick up the interest you are tasting. One activity is enough for today."
    >
      <LoginForm />
    </AuthScreen>
  );
}
