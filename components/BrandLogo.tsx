import Link from "next/link";

export function BrandLogo({
  href = "/",
  tone = "ink",
}: {
  href?: string;
  tone?: "ink" | "cream";
}) {
  const text = tone === "cream" ? "text-[#FAF8F3]" : "text-ink";
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-full ${text}`}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-2xl bg-ink"
      >
        <span className="relative block h-4 w-4 rounded-full bg-lime">
          <span className="absolute top-[3px] right-[3px] h-1.5 w-1.5 rounded-full bg-ink" />
        </span>
      </span>
      <span className="text-lg font-semibold tracking-tight">Curio</span>
    </Link>
  );
}
