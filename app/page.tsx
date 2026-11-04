import { skills } from "../Lib/skills";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Taster</h1>
      <p className="mt-2 text-gray-600">
        Try a new skill for 7 days. 15 minutes a day. See if you like it.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.slug} className="rounded-xl border p-4">
            <div className="text-3xl">{skill.emoji}</div>
            <h2 className="mt-2 text-lg font-semibold">{skill.name}</h2>
            <p className="text-sm text-gray-600">{skill.tagline}</p>
          </div>
        ))}
      </div>
    </main>
  );
}