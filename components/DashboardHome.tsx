"use client";

import Link from "next/link";
import { ActivityCard } from "@/components/ActivityCard";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { EmptyState } from "@/components/EmptyState";
import { InterestCard } from "@/components/InterestCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useDemoProfile, useProgress } from "@/components/useProgress";
import { isSupabaseConfigured } from "@/Lib/auth-config";
import { nextIncompleteDay } from "@/Lib/storage";
import type { Interest } from "@/Lib/types";

export function DashboardHome({
  viewer,
  interests,
}: {
  viewer: { mode: "anonymous" | "supabase"; name?: string; email?: string };
  interests: Interest[];
}) {
  const progress = useProgress();
  const demo = useDemoProfile();
  const configured = isSupabaseConfigured();
  const mode = viewer.mode === "supabase" ? "supabase" : demo ? "demo" : "anonymous";
  const name = viewer.mode === "supabase" ? viewer.name : demo?.name;
  const active = interests.find((interest) => interest.slug === progress.activeSlug) ?? null;
  const completed = active ? (progress.completedDays[active.slug] ?? []) : [];
  const today = active ? nextIncompleteDay(completed, active.activities.length) : 1;
  const todayActivity = active?.activities.find((activity) => activity.day === today);
  const recent = progress.recentSlugs
    .map((slug) => interests.find((interest) => interest.slug === slug))
    .filter((interest): interest is Interest => Boolean(interest))
    .filter((interest) => interest.slug !== active?.slug);
  const discoveries = interests.filter((interest) => interest.slug !== active?.slug).slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-ink/60 uppercase">Dashboard</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {name ? `Welcome, ${name}` : "Welcome"}
          </h1>
        </div>
        <PrimaryButton href="/explore">Discover another interest</PrimaryButton>
      </section>

      {mode === "demo" ? (
        <p className="rounded-[1.5rem] bg-lime px-5 py-4 text-sm leading-6">
          Demo mode is on for {demo?.email}. This is not a Supabase session. Challenge notes stay in this browser.
        </p>
      ) : null}
      {mode === "anonymous" && !configured ? (
        <p className="rounded-[1.5rem] bg-[#FFD9D0] px-5 py-4 text-sm leading-6">
          Local development mode. Supabase is not configured, so you are not signed in. You can still try a challenge on this device.
        </p>
      ) : null}
      {mode === "supabase" ? (
        <p className="rounded-[1.5rem] bg-sky px-5 py-4 text-sm leading-6">
          Signed in with Supabase as {viewer.email}. Activity progress is still saved only on this device.
        </p>
      ) : null}

      {active && todayActivity ? (
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)]">
          <div className="rounded-[2rem] bg-white p-6 sm:p-8">
            <p className="text-sm font-semibold text-ink-soft">Active challenge</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{active.challengeTitle}</h2>
            <p className="mt-3 max-w-xl text-ink-soft">{active.challengeDescription}</p>
            <div className="mt-6">
              <ChallengeProgress
                currentDay={today}
                completedDays={completed}
                total={active.activities.length}
              />
            </div>
            <div className="mt-6">
              <ActivityCard
                activity={todayActivity}
                href={`/interests/${active.slug}/day/${todayActivity.day}`}
              />
            </div>
          </div>
          <div className="rounded-[2rem] bg-lavender/70 p-6">
            <h2 className="text-xl font-semibold">Today</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Day {todayActivity.day}: {todayActivity.title}. About {todayActivity.estimatedMinutes} minutes.
            </p>
            <div className="mt-5">
              <PrimaryButton href={`/interests/${active.slug}/day/${todayActivity.day}`}>
                Open today
              </PrimaryButton>
            </div>
          </div>
        </section>
      ) : (
        <EmptyState
          title="No challenge yet"
          description="New here? Pick one beginner interest and try the first 15-minute activity. Nothing is stored in an account yet."
          action={<PrimaryButton href="/explore">Explore interests</PrimaryButton>}
        />
      )}

      <section>
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Discover another interest</h2>
          <Link href="/explore" className="text-sm font-semibold underline decoration-ink/30">
            See all
          </Link>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {discoveries.map((interest, index) => (
            <InterestCard key={interest.id} interest={interest} index={index + 1} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Recently explored</h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-ink-soft">
            Interests you open will show up here, on this device.
          </p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-3">
            {recent.map((interest) => (
              <li key={interest.id}>
                <Link
                  href={`/interests/${interest.slug}`}
                  className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold"
                >
                  {interest.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
