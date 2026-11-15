"use server";

import { isSupabaseConfigured } from "@/Lib/auth-config";
import { parseOnboardingPreferences } from "@/Lib/onboarding";
import { createSupabaseServerClient } from "@/Lib/supabase/server";
import type { OnboardingPreferences } from "@/Lib/types";

export async function saveOnboardingPreferences(preferences: OnboardingPreferences) {
  const validated = parseOnboardingPreferences(preferences);
  if (!validated) return { error: "Please check your answers and try again." };
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured. Save this setup in local demo mode instead." };
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Your session expired. Please log in again." };

  const { error } = await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      curio_onboarding: {
        ...validated,
        completed: true,
        completedAt: new Date().toISOString(),
      },
    },
  });
  if (error) return { error: "We couldn't save your setup. Please try again." };
  return { success: true };
}
