"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useProgress } from "@/components/useProgress";
import { nextIncompleteDay, startChallenge } from "@/Lib/storage";

export function StartChallengeButton({
  slug,
  total = 7,
}: {
  slug: string;
  total?: number;
}) {
  const router = useRouter();
  const progress = useProgress();
  const completed = progress.completedDays[slug] ?? [];
  const day = nextIncompleteDay(completed, total);
  const started = progress.activeSlug === slug || completed.length > 0;
  return (
    <PrimaryButton
      type="button"
      onClick={() => {
        startChallenge(slug);
        router.push(`/interests/${slug}/day/${day}`);
      }}
    >
      {started ? `Continue day ${day}` : "Start challenge"}
    </PrimaryButton>
  );
}
