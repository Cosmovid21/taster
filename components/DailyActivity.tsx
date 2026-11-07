"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { ChallengeProgress } from "@/components/ChallengeProgress";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ReflectionCard } from "@/components/ReflectionCard";
import { useProgress } from "@/components/useProgress";
import {
  completeActivity,
  markActivityStarted,
  reflectionKey,
  saveReflection,
} from "@/Lib/storage";
import type { Activity } from "@/Lib/types";

export function DailyActivity({
  interest,
  activity,
  totalDays,
}: {
  interest: {
    slug: string;
    title: string;
    relatedSlug: string;
    relatedTitle: string;
  };
  activity: Activity;
  totalDays: number;
}) {
  const progress = useProgress();
  const completed = progress.completedDays[interest.slug] ?? [];
  const done = completed.includes(activity.day);
  const started = progress.inProgressKey === reflectionKey(interest.slug, activity.day);
  const storedNote = progress.reflections[reflectionKey(interest.slug, activity.day)] ?? "";
  const [note, setNote] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const reflection = note ?? storedNote;
  const previousDay = activity.day > 1 ? activity.day - 1 : null;
  const nextDay = activity.day < totalDays ? activity.day + 1 : null;
  const finishedWeek = completed.length >= totalDays;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <article className="rounded-[2rem] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(36,36,36,0.5)] sm:p-8">
        <p className="text-sm font-semibold text-ink-soft">
          {interest.title} · Day {activity.day} of {totalDays}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{activity.title}</h1>
        <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink-soft">
          <Clock aria-hidden className="h-4 w-4" />
          About {activity.estimatedMinutes} minutes
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">{activity.description}</p>

        <h2 className="mt-8 text-sm font-semibold tracking-[0.16em] text-ink/60 uppercase">
          Instructions
        </h2>
        <ol className="mt-4 space-y-3">
          {activity.instructions.map((step, index) => (
            <li key={step} className="flex gap-3 leading-7">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime text-sm font-semibold">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <h2 className="mt-8 text-sm font-semibold tracking-[0.16em] text-ink/60 uppercase">
          Materials
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {activity.materials.map((material) => (
            <li key={material} className="rounded-full bg-sky px-3 py-1 text-sm">
              {material}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {done ? (
            <p className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-3 text-sm font-semibold">
              <Check aria-hidden className="h-4 w-4" />
              Completed on this device
            </p>
          ) : started ? (
            <PrimaryButton
              type="button"
              onClick={() => completeActivity(interest.slug, activity.day, reflection)}
            >
              Mark complete
            </PrimaryButton>
          ) : (
            <PrimaryButton
              type="button"
              onClick={() => markActivityStarted(interest.slug, activity.day)}
            >
              Start activity
            </PrimaryButton>
          )}
        </div>

        <div className="mt-8">
          <ReflectionCard
            question={activity.reflectionQuestion}
            value={reflection}
            saved={saved || Boolean(storedNote)}
            onChange={(value) => {
              setNote(value);
              setSaved(false);
            }}
            onSave={() => {
              saveReflection(interest.slug, activity.day, reflection);
              setSaved(true);
            }}
          />
        </div>

        {activity.day === totalDays && done ? (
          <section className="mt-8 rounded-[1.75rem] bg-[#FFD9D0] p-5">
            <h2 className="text-xl font-semibold tracking-tight">Seven days are complete</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Another week of this interest is not written yet. You can repeat these days, look at a related interest, or start fresh.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <PrimaryButton href={`/interests/${interest.slug}/day/1`} variant="secondary">
                Repeat day 1
              </PrimaryButton>
              <PrimaryButton href={`/interests/${interest.relatedSlug}`}>
                Explore {interest.relatedTitle}
              </PrimaryButton>
              <PrimaryButton href="/explore" variant="ghost">
                Try something new
              </PrimaryButton>
            </div>
          </section>
        ) : null}

        <nav className="mt-8 flex items-center justify-between gap-3" aria-label="Activity days">
          {previousDay ? (
            <Link
              href={`/interests/${interest.slug}/day/${previousDay}`}
              className="inline-flex items-center gap-2 text-sm font-semibold"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              Day {previousDay}
            </Link>
          ) : (
            <span />
          )}
          {nextDay ? (
            <Link
              href={`/interests/${interest.slug}/day/${nextDay}`}
              className="inline-flex items-center gap-2 text-sm font-semibold"
            >
              Day {nextDay}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <aside className="h-fit rounded-[1.75rem] bg-white p-5">
        <h2 className="text-sm font-semibold tracking-[0.16em] text-ink/60 uppercase">
          This week
        </h2>
        <div className="mt-4">
          <ChallengeProgress currentDay={activity.day} completedDays={completed} total={totalDays} />
        </div>
        {finishedWeek ? (
          <p className="mt-4 text-sm leading-6 text-ink-soft">
            You finished {interest.title}. The choice above is yours.
          </p>
        ) : null}
      </aside>
    </div>
  );
}
