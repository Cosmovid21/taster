import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthScreen } from "@/components/AuthScreen";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { isSupabaseConfigured } from "@/Lib/auth-config";
import { parseOnboardingPreferences } from "@/Lib/onboarding";
import { createSupabaseServerClient } from "@/Lib/supabase/server";

export const metadata: Metadata = {
  title: "Your Curio setup",
  description: "Tell Curio what you’re curious about and get a tailored first week.",
};

export default async function OnboardingPage() {
  let name: string | undefined;
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");
    name = typeof user.user_metadata.name === "string" ? user.user_metadata.name : undefined;
    const profile = user.user_metadata.curio_onboarding;
    if (profile?.completed && parseOnboardingPreferences(profile)) redirect("/dashboard");
  }

  return (
    <AuthScreen
      title="A few quick questions"
      lede="Tell Curio what you’re curious about. We’ll shape a first week that feels like yours."
    >
      <OnboardingFlow name={name} />
    </AuthScreen>
  );
}
