"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-ink-soft">{error.message || "Curio could not load this page."}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 w-fit rounded-full bg-lime px-5 py-3 text-sm font-semibold"
      >
        Try again
      </button>
    </main>
  );
}
