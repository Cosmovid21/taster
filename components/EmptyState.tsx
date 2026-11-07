import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-ink/15 bg-white/70 px-6 py-12 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
