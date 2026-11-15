import Image from "next/image";
import { interests } from "@/Lib/interests";
import { interestIcons } from "@/components/icons";

export function HobbyPanel() {
  const photos = [interests[0], interests[1], interests[6], interests[3]];
  return (
    <div className="relative hidden min-h-screen overflow-hidden bg-ink lg:block">
      <div className="absolute inset-6 grid grid-cols-2 grid-rows-2 gap-4">
        {photos.map((interest, index) => {
          const Icon = interestIcons[interest.icon];
          return (
            <div
              key={interest.id}
              className={`group relative overflow-hidden rounded-[2rem] ${
                index === 0 ? "rounded-bl-[4rem]" : ""
              } ${index === 3 ? "translate-y-6" : ""}`}
            >
              <Image
                src={interest.coverImage}
                alt={`${interest.title} practice`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={index === 0}
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/5" />
              <div className="absolute bottom-4 left-4 inline-flex -rotate-2 items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-2 text-xs font-semibold text-ink shadow-md backdrop-blur-sm">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-lime"><Icon aria-hidden className="h-3.5 w-3.5" /></span>
                {interest.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-10 left-10 right-10 rounded-[1.75rem] bg-lime p-6 text-ink">
        <p className="text-sm font-semibold tracking-[0.16em] uppercase">One small practice</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">
          Fifteen minutes. Seven days. Then you decide.
        </p>
      </div>
    </div>
  );
}
