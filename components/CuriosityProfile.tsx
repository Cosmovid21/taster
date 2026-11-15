import { BookOpen, Sparkles } from "lucide-react";
import type { OnboardingPreferences } from "@/Lib/types";
import { buildActivityMix, readingSuggestions, recommendInterests } from "@/Lib/onboarding";
import { PrimaryButton } from "@/components/PrimaryButton";

export function CuriosityProfile({ preferences }: { preferences: OnboardingPreferences }) {
  const recommended = recommendInterests(preferences);
  const mix = buildActivityMix(recommended);
  const reading = readingSuggestions[preferences.goal];

  return (
    <section className="rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-8" aria-labelledby="curiosity-profile-title">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime"><Sparkles aria-hidden className="h-5 w-5" /></span>
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] text-ink/55 uppercase">Your starting profile</p>
          <h2 id="curiosity-profile-title" className="mt-1 text-2xl font-semibold tracking-tight">Your curiosity mix</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">A snapshot of the kinds of activities in your recommendations, based on what you chose.</p>
        </div>
      </div>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4" role="group" aria-label="Activity themes in your suggested interests" aria-describedby="profile-chart-note">
          {mix.map((area) => (
            <div key={area.id}>
              <div className="mb-1.5 flex justify-between gap-3 text-sm"><span>{area.label}</span><span className="text-ink-soft">{area.value.toFixed(1)} / 5</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-cream" role="progressbar" aria-label={area.shortLabel} aria-valuemin={0} aria-valuemax={5} aria-valuenow={area.value}>
                <div className="h-full rounded-full bg-lime transition-[width] duration-500" style={{ width: `${area.value / 5 * 100}%` }} />
              </div>
            </div>
          ))}
          <p id="profile-chart-note" className="pt-1 text-xs leading-5 text-ink-soft">These 1–5 tags describe the suggested activities. They do not measure brain activity, ability, or health.</p>
        </div>
        {preferences.includeReading ? (
          <article className="rounded-3xl bg-lavender/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.13em] text-ink/60 uppercase"><BookOpen aria-hidden className="h-4 w-4" /> A short read · {reading.minutes} min</div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{reading.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{reading.summary}</p>
            <details className="group mt-4">
              <summary className="cursor-pointer text-sm font-semibold underline decoration-ink/30 underline-offset-4">Read Curio’s note</summary>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{reading.body}</p>
            </details>
            <div className="mt-5"><PrimaryButton href="/explore" variant="ghost" className="px-0">Browse all interests</PrimaryButton></div>
          </article>
        ) : (
          <article className="rounded-3xl bg-lavender/60 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.13em] text-ink/60 uppercase"><Sparkles aria-hidden className="h-4 w-4" /> Your chosen rhythm</div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">A little time, your way.</h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">Your setup favors {preferences.sessionStyle === "quiet" ? "a quiet solo moment" : preferences.sessionStyle === "handsOn" ? "hands-on activities" : preferences.sessionStyle === "movement" ? "a little movement" : "room to experiment"}. You can change this whenever your curiosity shifts.</p>
            <div className="mt-5"><PrimaryButton href="/explore" variant="ghost" className="px-0">Browse all interests</PrimaryButton></div>
          </article>
        )}
      </div>
    </section>
  );
}
