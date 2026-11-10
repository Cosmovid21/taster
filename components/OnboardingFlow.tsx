"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { saveOnboardingPreferences } from "@/app/actions/onboarding";
import { CuriosityProfile } from "@/components/CuriosityProfile";
import { InterestCard } from "@/components/InterestCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useDemoProfile } from "@/components/useProgress";
import { isSupabaseConfigured } from "@/Lib/auth-config";
import { experienceOptions, interestOptions, onboardingGoals, recommendInterests, sessionStyles } from "@/Lib/onboarding";
import { saveDemoProfile } from "@/Lib/storage";
import type { OnboardingPreferences } from "@/Lib/types";

const stepNames = ["Interests", "Your intention", "Your rhythm", "Your suggestions"];

export function OnboardingFlow({ name }: { name?: string }) {
  const router = useRouter();
  const demoProfile = useDemoProfile();
  const configured = isSupabaseConfigured();
  const [step, setStep] = useState(0);
  const [interestSlugs, setInterestSlugs] = useState<string[]>([]);
  const [goal, setGoal] = useState<OnboardingPreferences["goal"] | "">("");
  const [sessionStyle, setSessionStyle] = useState<OnboardingPreferences["sessionStyle"] | "">("");
  const [experience, setExperience] = useState<OnboardingPreferences["experience"] | "">("");
  const [includeReading, setIncludeReading] = useState(true);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!configured && !demoProfile) router.replace("/signup");
  }, [configured, demoProfile, router]);

  function toggleInterest(slug: string) {
    setError("");
    setInterestSlugs((current) => current.includes(slug)
      ? current.filter((item) => item !== slug)
      : current.length < 3 ? [...current, slug] : current);
  }

  function nextStep() {
    setError("");
    if (step === 0 && interestSlugs.length === 0) { setError("Choose at least one interest to get started."); return; }
    if (step === 1 && (!goal || !sessionStyle)) { setError("Choose what you want from the week and the kind of session you enjoy."); return; }
    if (step === 2 && !experience) { setError("Choose the description that fits you best."); return; }
    setStep((current) => Math.min(3, current + 1));
  }

  function finishSetup() {
    setError("");
    if (!goal || !sessionStyle || !experience || interestSlugs.length === 0) return;
    const preferences: OnboardingPreferences = { interestSlugs, goal, sessionStyle, experience, includeReading };
    startTransition(async () => {
      if (configured) {
        const result = await saveOnboardingPreferences(preferences);
        if (result.error) { setError(result.error); return; }
      } else {
        const profile = demoProfile;
        if (!profile) { setError("Your demo profile could not be found. Please sign up again."); return; }
        saveDemoProfile({ ...profile, preferences, onboardingComplete: true });
      }
      router.push("/dashboard");
    });
  }

  const previewPreferences = goal && sessionStyle && experience
    ? { interestSlugs, goal, sessionStyle, experience, includeReading }
    : undefined;
  const suggestions = previewPreferences ? recommendInterests(previewPreferences) : [];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex justify-between text-xs font-semibold text-ink-soft"><span>STEP {Math.min(step + 1, 4)} OF 4</span><span>{stepNames[step]}</span></div>
        <div className="flex gap-1.5" aria-hidden="true">{stepNames.map((item, index) => <div key={item} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-lime" : "bg-ink/10"}`} />)}</div>
      </div>

      {step === 0 && <section aria-labelledby="setup-interests-title">
        <h2 id="setup-interests-title" className="text-xl font-semibold tracking-tight">What are you curious about?</h2>
        <p className="mt-1 text-sm text-ink-soft">Pick up to three. We’ll include them in your first suggestions.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">{interestOptions.map((interest) => {
          const selected = interestSlugs.includes(interest.slug);
          return <button type="button" key={interest.slug} aria-pressed={selected} onClick={() => toggleInterest(interest.slug)} className={`flex min-h-[68px] items-center gap-2 rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition ${selected ? "border-ink bg-lime" : "border-ink/10 bg-white hover:border-ink/30"}`}><span className="min-w-0 flex-1"><span className="block truncate text-[10px] font-medium text-ink-soft">{interest.category}</span><span className="block truncate">{interest.title}</span></span>{selected ? <Check aria-hidden className="ml-auto h-4 w-4 shrink-0"/> : null}</button>;
        })}</div>
        <p className="mt-2 text-xs text-ink-soft" aria-live="polite">{interestSlugs.length} of 3 selected</p>
      </section>}

      {step === 1 && <section aria-labelledby="setup-intention-title" className="space-y-5">
        <div><h2 id="setup-intention-title" className="text-xl font-semibold tracking-tight">What would feel good this week?</h2><div className="mt-3 space-y-2">{onboardingGoals.map((option) => <Choice key={option.id} label={option.label} description={option.description} selected={goal === option.id} onClick={() => setGoal(option.id)} />)}</div></div>
        <div><h2 className="text-lg font-semibold tracking-tight">How would you like to spend the time?</h2><div className="mt-3 grid grid-cols-2 gap-2">{sessionStyles.map((option) => <Choice key={option.id} label={option.label} description={option.description} selected={sessionStyle === option.id} onClick={() => setSessionStyle(option.id)} compact />)}</div></div>
      </section>}

      {step === 2 && <section aria-labelledby="setup-experience-title">
        <h2 id="setup-experience-title" className="text-xl font-semibold tracking-tight">Where are you starting from?</h2>
        <p className="mt-1 text-sm text-ink-soft">There’s no level to reach. This just helps us set the tone.</p>
        <div className="mt-4 space-y-2">{experienceOptions.map((option) => <Choice key={option.id} label={option.label} description={option.description} selected={experience === option.id} onClick={() => setExperience(option.id)} />)}</div>
        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-lavender/50 p-4 text-sm"><input type="checkbox" checked={includeReading} onChange={(event) => setIncludeReading(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#242424]"/><span><strong>Include a short reading suggestion</strong><span className="mt-1 block leading-5 text-ink-soft">A few original Curio notes to go along with the activities.</span></span></label>
      </section>}

      {step === 3 && previewPreferences && <section aria-labelledby="setup-preview-title" className="space-y-5">
        <div><h2 id="setup-preview-title" className="text-xl font-semibold tracking-tight">A first look at your Curio mix{name ? `, ${name.split(" ")[0]}` : ""}.</h2><p className="mt-1 text-sm text-ink-soft">We balanced your picks with the kind of week you described.</p></div>
        <CuriosityProfile preferences={previewPreferences}/>
        <div><h3 className="text-lg font-semibold tracking-tight">A few good places to start</h3><div className="mt-3 space-y-3">{suggestions.map(({ interest, selectedByUser }, index) => <div key={interest.id}><p className="mb-1 text-xs font-semibold text-ink-soft">{selectedByUser ? "ONE OF YOUR PICKS" : index === 0 ? "A MATCH FOR YOUR WEEK" : "ANOTHER THREAD TO FOLLOW"} · {experience === "new" ? "EASY FIRST STEPS" : experience === "returning" ? "A GENTLE WAY BACK IN" : "BUILT TO GROW FROM A FIRST TRY"}</p><InterestCard interest={interest} index={index}/></div>)}</div></div>
      </section>}

      {error && <p role="alert" className="rounded-2xl bg-[#FFD9D0] px-4 py-3 text-sm leading-6">{error}</p>}
      <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-4">{step > 0 ? <button type="button" onClick={() => { setError(""); setStep((current) => current - 1); }} className="inline-flex items-center gap-2 py-2 text-sm font-semibold"><ArrowLeft aria-hidden className="h-4 w-4"/> Back</button> : <span />}{step < 3 ? <PrimaryButton type="button" onClick={nextStep}>Continue <ArrowRight aria-hidden className="h-4 w-4"/></PrimaryButton> : <PrimaryButton type="button" onClick={finishSetup} disabled={pending}>{pending ? "Saving your setup…" : "Save and open my dashboard"}<ArrowRight aria-hidden className="h-4 w-4"/></PrimaryButton>}</div>
      <p className="text-center text-xs leading-5 text-ink-soft">Your answers help tailor your suggestions. The activity mix is not a brain scan or a health assessment.</p>
    </div>
  );
}

function Choice({ label, description, selected, onClick, compact = false }: { label: string; description: string; selected: boolean; onClick: () => void; compact?: boolean }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`flex w-full items-start gap-3 rounded-2xl border text-left transition ${compact ? "p-3" : "p-3.5"} ${selected ? "border-ink bg-lime" : "border-ink/10 bg-white hover:border-ink/30"}`}><span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${selected ? "border-ink bg-ink" : "border-ink/30"}`}>{selected ? <span className="h-1.5 w-1.5 rounded-full bg-white"/> : null}</span><span><strong className="block text-sm">{label}</strong><span className="mt-0.5 block text-xs leading-5 text-ink-soft">{description}</span></span></button>;
}
