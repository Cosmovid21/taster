import { notFound, redirect } from "next/navigation";
import { getInterest, interests } from "@/Lib/interests";

export function generateStaticParams() {
  return interests.map((interest) => ({ slug: interest.slug }));
}

export default async function LegacySkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const interest = getInterest(slug);
  if (!interest) notFound();
  redirect(`/interests/${interest.slug}`);
}
