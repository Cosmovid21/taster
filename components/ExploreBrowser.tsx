"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EmptyState } from "@/components/EmptyState";
import { InterestCard } from "@/components/InterestCard";
import type { Interest } from "@/Lib/types";

export function ExploreBrowser({
  interests,
  categories,
}: {
  interests: Interest[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return interests.filter((interest) => {
      const matchesCategory = category === "All" || interest.category === category;
      const haystack = `${interest.title} ${interest.category} ${interest.description}`.toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [interests, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
        <form role="search" className="relative w-full lg:max-w-xs" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="interest-search" className="sr-only">
            Search interests
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="interest-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sketching, chess, yoga"
            className="w-full rounded-full border border-ink/10 bg-white py-3 pr-4 pl-11 outline-none focus:border-ink"
          />
        </form>
      </div>
      {visible.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Nothing matches yet"
            description="Try another word, or clear the category filter to see every beginner interest."
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((interest, index) => (
            <InterestCard key={interest.id} interest={interest} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
