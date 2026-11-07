export function ReflectionCard({
  question,
  value,
  onChange,
  onSave,
  saved = false,
}: {
  question: string;
  value?: string;
  onChange?: (value: string) => void;
  onSave?: () => void;
  saved?: boolean;
}) {
  const interactive = Boolean(onChange);
  return (
    <section className="rounded-[1.75rem] bg-lavender/70 p-5 sm:p-6">
      <p className="text-xs font-semibold tracking-[0.16em] text-ink/70 uppercase">
        Reflection
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">{question}</h2>
      {interactive ? (
        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSave?.();
          }}
        >
          <label htmlFor="reflection" className="sr-only">
            Your reflection
          </label>
          <textarea
            id="reflection"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            rows={4}
            className="w-full resize-y rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none"
            placeholder="A sentence or two is enough."
          />
          <button
            type="submit"
            className="mt-3 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream"
          >
            {saved ? "Saved on this device" : "Save note"}
          </button>
        </form>
      ) : (
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          The daily page keeps a private note with this question. Notes stay in this browser.
        </p>
      )}
    </section>
  );
}
