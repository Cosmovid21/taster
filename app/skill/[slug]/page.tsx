import Link from "next/link";
import { notFound } from "next/navigation";
import { skills } from "@/Lib/skills";

export function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = skills.find((s) => s.slug === slug);

  if (!skill) notFound();

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link href="/" className="text-sm text-gray-500">
        ← All skills
      </Link>
      <h1 className="mt-4 text-3xl font-bold">
        {skill.emoji} {skill.name}
      </h1>
      <p className="mt-2 text-gray-600">{skill.tagline}</p>

      <ol className="mt-8 space-y-3">
        {skill.days.map((task, i) => (
          <li key={i} className="rounded-xl border p-4">
            <div className="text-sm font-semibold text-gray-500">Day {i + 1}</div>
            <div>{task}</div>
          </li>
        ))}
      </ol>
    </main>
  );
}