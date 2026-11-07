import { PrimaryButton } from "@/components/PrimaryButton";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold tracking-[0.16em] text-ink/60 uppercase">Missing page</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">That page is not in Curio.</h1>
      <p className="mt-3 text-ink-soft">The interest or day may have moved. The catalog is still on Explore.</p>
      <div className="mt-6">
        <PrimaryButton href="/explore">Explore interests</PrimaryButton>
      </div>
    </main>
  );
}
