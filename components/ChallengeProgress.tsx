export function ChallengeProgress({
  currentDay,
  completedDays,
  total = 7,
}: {
  currentDay: number;
  completedDays: number[];
  total?: number;
}) {
  const days = Array.from({ length: total }, (_, index) => index + 1);
  return (
    <div>
      <ol aria-label="Challenge progress" className="flex gap-2">
        {days.map((day) => {
          const complete = completedDays.includes(day);
          const current = day === currentDay;
          return (
            <li key={day} className="flex-1" aria-current={current ? "step" : undefined}>
              <span
                className={`block h-2 rounded-full ${
                  complete ? "bg-ink" : current ? "bg-lime" : "bg-ink/10"
                }`}
              />
              <span className="sr-only">
                Day {day} {complete ? "complete" : current ? "current" : "upcoming"}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm text-ink-soft">
        {completedDays.length} of {total} days complete
        {currentDay ? ` · Day ${currentDay}` : ""}
      </p>
    </div>
  );
}
