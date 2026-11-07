import Image from "next/image";
import { interests } from "@/Lib/interests";

export function HobbyPanel() {
  const photos = [interests[0], interests[1], interests[6], interests[3]];
  return (
    <div className="relative hidden min-h-screen overflow-hidden bg-ink lg:block">
      <div className="absolute inset-6 grid grid-cols-2 grid-rows-2 gap-4">
        {photos.map((interest, index) => (
          <div
            key={interest.id}
            className={`relative overflow-hidden rounded-[2rem] ${
              index === 0 ? "rounded-bl-[4rem]" : ""
            } ${index === 3 ? "translate-y-6" : ""}`}
          >
            <Image
              src={interest.coverImage}
              alt={`${interest.title} practice`}
              fill
              sizes="25vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
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
