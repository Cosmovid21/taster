import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ActivityCard } from "@/components/ActivityCard";
import { InterestCard } from "@/components/InterestCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ReflectionCard } from "@/components/ReflectionCard";
import { getInterest, interests } from "@/Lib/interests";

const steps = [
  {
    title: "Choose one curiosity",
    copy: "Sketching, chess, cooking, yoga, and five more. Each one is written for a beginner.",
  },
  {
    title: "Practice for 15 minutes",
    copy: "One practical activity a day. Materials stay ordinary: a pencil, a phone, a pan, a board.",
  },
  {
    title: "Decide on day seven",
    copy: "Continue, follow a related interest, or try something new. The week is a trial, not a subscription.",
  },
];

export default function HomePage() {
  const sample = getInterest("sketching");
  const sampleActivity = sample?.activities[0];

  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
        <div className="rise">
          <p className="text-sm font-semibold tracking-[0.18em] text-ink/60 uppercase">
            A seven-day taste
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight sm:text-7xl">
            Find out if you like it, before you buy the whole hobby.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
            Curio gives you one practical 15-minute activity a day for seven days. Then you decide whether to continue, explore a neighbor, or try something else.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/explore">
              Explore interests
              <ArrowRight aria-hidden className="h-4 w-4" />
            </PrimaryButton>
            <PrimaryButton href="/signup" variant="secondary">
              Create an account
            </PrimaryButton>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[1.75rem] bg-lime p-5">
            <p className="text-4xl font-semibold">7</p>
            <p className="mt-2 text-sm leading-6">days, then a real decision</p>
          </div>
          <div className="rounded-[1.75rem] bg-lavender p-5">
            <p className="text-4xl font-semibold">15</p>
            <p className="mt-2 text-sm leading-6">minutes, including setup</p>
          </div>
          <div className="col-span-2 rounded-[1.75rem] bg-sky p-5">
            <p className="text-sm font-semibold tracking-[0.16em] uppercase">Today, not someday</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              A cup, a chord, a pawn, a paragraph.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <h2 className="text-3xl font-semibold tracking-tight">How the week works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-[1.75rem] bg-white p-6">
              <span className="text-sm font-semibold text-ink-soft">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Eight places to begin</h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              Every card is a seven-day beginner challenge. Open one to see the days before you start.
            </p>
          </div>
          <Link href="/explore" className="text-sm font-semibold underline decoration-ink/30">
            Search and filter
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest, index) => (
            <InterestCard key={interest.id} interest={interest} index={index} />
          ))}
        </div>
      </section>

      {sample && sampleActivity ? (
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-ink p-8 text-cream">
            <p className="text-sm font-semibold tracking-[0.16em] text-lime uppercase">A sample day</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              {sample.title}, day {sampleActivity.day}
            </h2>
            <p className="mt-4 text-lg leading-8 text-cream/80">{sample.challengeDescription}</p>
            <div className="mt-8">
              <PrimaryButton href={`/interests/${sample.slug}`}>See the full week</PrimaryButton>
            </div>
          </div>
          <div className="space-y-4">
            <ActivityCard activity={sampleActivity} href={`/interests/${sample.slug}/day/1`} />
            <ReflectionCard question={sampleActivity.reflectionQuestion} />
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="overflow-hidden rounded-[2rem] bg-[#FFD9D0] px-6 py-12 sm:px-12">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight">
            Start with an account when you are ready. The activities are already written.
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            Supabase Auth is wired for email and password. Without those environment variables, Curio stays in a clearly labelled local demo.
          </p>
          <div className="mt-8">
            <PrimaryButton href="/signup">Sign up</PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}
