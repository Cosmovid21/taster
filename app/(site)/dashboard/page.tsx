import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardHome } from "@/components/DashboardHome";
import { isSupabaseConfigured } from "@/Lib/auth-config";
import { interests } from "@/Lib/interests";
import { parseOnboardingPreferences } from "@/Lib/onboarding";
import { createSupabaseServerClient } from "@/Lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Curio challenge, today activity, and recently explored interests.",
};

function DashboardFallback() {
  return <p className="text-ink-soft">Loading your dashboard…</p>;
}

async function SignedInDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    return <DashboardHome viewer={{ mode: "anonymous" }} interests={interests} />;
  }
  const savedSetup = user.user_metadata?.curio_onboarding;
  const preferences = parseOnboardingPreferences(savedSetup);
  if (!preferences || !savedSetup?.completed) redirect("/onboarding");
  const metadataName = user.user_metadata?.name;
  const name = typeof metadataName === "string" ? metadataName : undefined;
  return (
    <DashboardHome
      viewer={{ mode: "supabase", name, email: user.email ?? "", preferences }}
      interests={interests}
    />
  );
}

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      {isSupabaseConfigured() ? (
        <Suspense fallback={<DashboardFallback />}>
          <SignedInDashboard />
        </Suspense>
      ) : (
        <DashboardHome viewer={{ mode: "anonymous" }} interests={interests} />
      )}
    </main>
  );
}
