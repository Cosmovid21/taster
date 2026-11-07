import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DailyActivity } from "@/components/DailyActivity";
import { getActivity, getInterest, getRelatedInterest, interests } from "@/Lib/interests";

export function generateStaticParams() {
  return interests.flatMap((interest) =>
    interest.activities.map((activity) => ({
      slug: interest.slug,
      day: String(activity.day),
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; day: string }>;
}): Promise<Metadata> {
  const { slug, day } = await params;
  const interest = getInterest(slug);
  const activity = interest ? getActivity(interest, Number(day)) : undefined;
  if (!interest || !activity) return { title: "Activity" };
  return {
    title: `Day ${activity.day}: ${activity.title}`,
    description: activity.description,
  };
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ slug: string; day: string }>;
}) {
  const { slug, day } = await params;
  const interest = getInterest(slug);
  const activity = interest ? getActivity(interest, Number(day)) : undefined;
  if (!interest || !activity) notFound();
  const related = getRelatedInterest(interest);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <DailyActivity
        interest={{
          slug: interest.slug,
          title: interest.title,
          relatedSlug: related?.slug ?? interest.slug,
          relatedTitle: related?.title ?? interest.title,
        }}
        activity={activity}
        totalDays={interest.activities.length}
      />
    </main>
  );
}
