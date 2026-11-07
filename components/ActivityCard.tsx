import Link from "next/link";
import { Clock } from "lucide-react";
import type { Activity } from "@/Lib/types";

export function ActivityCard({
  activity,
  href,
}: {
  activity: Activity;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-3 text-sm text-ink-soft">
        <span className="font-semibold text-ink">Day {activity.day}</span>
        <span className="inline-flex items-center gap-1">
          <Clock aria-hidden className="h-4 w-4" />
          {activity.estimatedMinutes} min
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight">{activity.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{activity.description}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-[1.5rem] border border-ink/10 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(36,36,36,0.45)]"
      >
        {body}
      </Link>
    );
  }

  return (
    <article className="rounded-[1.5rem] border border-ink/10 bg-white p-5">
      {body}
    </article>
  );
}
