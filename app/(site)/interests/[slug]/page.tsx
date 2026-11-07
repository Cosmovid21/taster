import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/ActivityCard";
import { RememberInterest } from "@/components/RememberInterest";
import { StartChallengeButton } from "@/components/StartChallengeButton";
import { interestIcons } from "@/components/icons";
import {
  getInterest,
  getRelatedInterest,
  interests,
  materialsFor,
} from "@/Lib/interests";

export function generateStaticParams() {
  return interests.map((interest) => ({ slug: interest.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const interest = getInterest(slug);
  if (!interest) return { title: "Interest" };
  return {
    title: interest.title,
    description: interest.description,
  };
}

export default async function InterestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const interest = getInterest(slug);
  if (!interest) notFound();
  const related = getRelatedInterest(interest);
  const Icon = interestIcons[interest.icon];
  const materials = materialsFor(interest);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <RememberInterest slug={interest.slug} />
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-lavender">
          <Image
            src={interest.coverImage}
            alt={`${interest.title} cover`}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.16em] text-ink/60 uppercase">
            <Icon aria-hidden className="h-4 w-4" />
            {interest.category}
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">{interest.title}</h1>
          <p className="mt-4 text-lg leading-8 text-ink-soft">{interest.description}</p>
          <p className="mt-4 text-sm font-semibold">
            {interest.difficulty} · {interest.durationMinutes} minutes a day · 7 activities
          </p>
          <div className="mt-6">
            <StartChallengeButton slug={interest.slug} total={interest.activities.length} />
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.75rem] bg-white p-6">
          <h2 className="text-2xl font-semibold tracking-tight">What you will explore</h2>
          <p className="mt-3 leading-7 text-ink-soft">{interest.challengeDescription}</p>
          <p className="mt-3 leading-7">{interest.challengeTitle}</p>
        </article>
        <article className="rounded-[1.75rem] bg-lime p-6">
          <h2 className="text-2xl font-semibold tracking-tight">After seven days</h2>
          <p className="mt-3 leading-7">{interest.outcome}</p>
          {related ? (
            <p className="mt-3 text-sm">
              If you want a neighbor, {related.title} is the closest next try.
            </p>
          ) : null}
        </article>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold tracking-tight">Seven activities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {interest.activities.map((activity) => (
            <ActivityCard
              key={activity.day}
              activity={activity}
              href={`/interests/${interest.slug}/day/${activity.day}`}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[1.75rem] bg-sky/70 p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Materials</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {materials.map((material) => (
            <li key={material} className="rounded-full bg-white px-3 py-1 text-sm">
              {material}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <StartChallengeButton slug={interest.slug} total={interest.activities.length} />
        </div>
      </section>
    </main>
  );
}
