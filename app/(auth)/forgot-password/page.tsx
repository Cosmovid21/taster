import type { Metadata } from "next";
import { AuthScreen } from "@/components/AuthScreen";
import { ForgotPasswordForm } from "@/components/AuthForms";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset the password for your Curio account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthScreen
      title="Reset your password"
      lede="Enter the email on your account. Curio sends a reset link only when Supabase Auth is configured."
    >
      <ForgotPasswordForm />
    </AuthScreen>
  );
}
