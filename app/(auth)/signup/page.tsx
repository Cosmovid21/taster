import type { Metadata } from "next";
import { AuthScreen } from "@/components/AuthScreen";
import { SignupForm } from "@/components/AuthForms";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a Curio account with your name, email, and password.",
};

export default function SignupPage() {
  return (
    <AuthScreen
      title="Begin a seven-day taste"
      lede="Tell Curio your name. The first challenge can be sketching, chess, cooking, or anything in the catalog."
    >
      <SignupForm />
    </AuthScreen>
  );
}
