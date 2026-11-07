import type { ReactNode } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { HobbyPanel } from "@/components/HobbyPanel";

export function AuthScreen({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <section className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
        <BrandLogo />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <p className="text-sm font-semibold tracking-[0.16em] text-ink/60 uppercase">Curio</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-lg leading-8 text-ink-soft">{lede}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
      <HobbyPanel />
    </main>
  );
}
