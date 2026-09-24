/*
 * ============================================================================
 *  One component, written once, used five times with different props.
 *
 *  Try these, one at a time, saving after each:
 *    - Change a `minutes` value and watch only that card move.
 *    - Add a sixth <SessionCard /> at the bottom.
 *    - Delete the `level` prop from one card and read the error.
 * ============================================================================
 */

// The props this component accepts. Every card below must supply exactly these
// - `note` is optional, because of the `?`.
type SessionCardProps = {
  topic: string;
  minutes: number;
  level: "easy" | "medium" | "hard";
  note?: string;
};

const levelStyles = {
  easy: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  medium: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  hard: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

function SessionCard({ topic, minutes, level, note }: SessionCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
          {topic}
        </h3>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${levelStyles[level]}`}
        >
          {level}
        </span>
      </div>

      <p className="mt-1 font-mono text-xs text-zinc-500">{minutes} min</p>

      {/* Only rendered when a `note` was actually passed in. */}
      {note ? (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{note}</p>
      ) : null}
    </article>
  );
}

export default function ComponentsAndPropsDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <SessionCard topic="JSX" minutes={70} level="easy" />
      <SessionCard topic="Props" minutes={30} level="easy" note="Read twice." />
      <SessionCard topic="State" minutes={60} level="medium" />
      <SessionCard
        topic="Effects"
        minutes={25}
        level="hard"
        note="The one everyone overuses."
      />
      <SessionCard topic="Routing" minutes={90} level="medium" />
      <SessionCard
        topic="Whatever I like"
        minutes={120}
        level="hard"
        note="this is a test note for everyone to see"
      />
    </div>
  );
}
