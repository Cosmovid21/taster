export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}) {
  const options = ["All", ...categories];
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
      {options.map((category) => {
        const active = selected === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              active ? "bg-ink text-cream" : "bg-white text-ink hover:bg-lime"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
