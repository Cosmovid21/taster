"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/Lib/auth-config";
import { parseOnboardingPreferences } from "@/Lib/onboarding";
import { createSupabaseServerClient } from "@/Lib/supabase/server";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/Lib/validation";

export type AuthFormState = {
  error?: string;
  success?: string;
  demo?: boolean;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
  };
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function siteOrigin() {
  const headerList = await headers();
  return headerList.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function signIn(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readString(formData, "email");
  const password = readString(formData, "password");
  const fieldErrors: AuthFormState["fieldErrors"] = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) fieldErrors.email = emailError;
  if (passwordError) fieldErrors.password = passwordError;
  if (fieldErrors.email || fieldErrors.password) return { fieldErrors };

  if (!isSupabaseConfigured()) {
    return {
      demo: true,
      error:
        "Local development mode: Supabase is not configured, so this password was not checked and no account session was created.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  const savedSetup = data.user.user_metadata?.curio_onboarding;
  const setupComplete = Boolean(savedSetup?.completed && parseOnboardingPreferences(savedSetup));
  redirect(setupComplete ? "/dashboard" : "/onboarding");
}

export async function signUp(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = readString(formData, "name");
  const email = readString(formData, "email");
  const password = readString(formData, "password");
  const fieldErrors: AuthFormState["fieldErrors"] = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (nameError) fieldErrors.name = nameError;
  if (emailError) fieldErrors.email = emailError;
  if (passwordError) fieldErrors.password = passwordError;
  if (fieldErrors.name || fieldErrors.email || fieldErrors.password) {
    return { fieldErrors };
  }

  if (!isSupabaseConfigured()) {
    return {
      demo: true,
      error:
        "Local development mode: Supabase is not configured, so no account was created and this password was not stored.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const origin = await siteOrigin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${origin}/onboarding`,
    },
  });
  if (error) return { error: error.message };
  if (data.session) redirect("/onboarding");
  return {
    success: "Account created. Check your email to confirm it before signing in.",
  };
}

export async function requestPasswordReset(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = readString(formData, "email");
  const emailError = validateEmail(email);
  if (emailError) return { fieldErrors: { email: emailError } };

  if (!isSupabaseConfigured()) {
    return {
      demo: true,
      error:
        "Local development mode: Supabase is not configured, so Curio cannot send a password reset email.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const origin = await siteOrigin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/login`,
  });
  if (error) return { error: error.message };
  return {
    success: "If that email has a Curio account, a reset link is on its way.",
  };
}

export async function signOut() {
  if (!isSupabaseConfigured()) redirect("/");
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
