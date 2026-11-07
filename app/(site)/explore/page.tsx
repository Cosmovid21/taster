import type { Metadata } from "next";
import { ExploreBrowser } from "@/components/ExploreBrowser";
import { getCategories, interests } from "@/Lib/interests";

export const metadata: Metadata = {
  title: "Explore interests",
  description: "Search beginner interests and start a seven-day Curio challenge.",
};

export default function ExplorePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-sm font-semibold tracking-[0.16em] text-ink/60 uppercase">Explore</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Pick a curiosity you can try this week.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
        Every interest is labelled beginner and built around about 15 minutes a day.
      </p>
      <div className="mt-10">
        <ExploreBrowser interests={interests} categories={getCategories()} />
      </div>
    </main>
  );
}
