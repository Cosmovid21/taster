import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { interestIcons } from "@/components/icons";
import type { Interest } from "@/Lib/types";

const washes = ["bg-lavender", "bg-sky", "bg-[#FFD9D0]", "bg-lime"];

export function InterestCard({
  interest,
  index = 0,
}: {
  interest: Interest;
  index?: number;
}) {
  const Icon = interestIcons[interest.icon];
  return (
    <Link
      href={`/interests/${interest.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_50px_-36px_rgba(36,36,36,0.55)] transition duration-300 hover:-translate-y-1"
    >
      <div className={`relative aspect-[4/3] ${washes[index % washes.length]}`}>
        <Image
          src={interest.coverImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold tracking-wide text-ink/70 uppercase">
          <span>{interest.category}</span>
          <Icon aria-hidden className="h-4 w-4" />
        </div>
        <h2 className="mt-3 text-xl font-semibold tracking-tight">{interest.title}</h2>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">{interest.description}</p>
        <p className="mt-4 flex items-center gap-3 text-sm text-ink">
          <span className="rounded-full bg-lime px-2.5 py-1 text-xs font-semibold">
            {interest.difficulty}
          </span>
          <span className="inline-flex items-center gap-1 text-ink-soft">
            <Clock aria-hidden className="h-4 w-4" />
            {interest.durationMinutes} min a day
          </span>
        </p>
      </div>
    </Link>
  );
}
