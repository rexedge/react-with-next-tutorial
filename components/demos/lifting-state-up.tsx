"use client";

/*
 * ============================================================================
 *  Three children that all depend on the same two facts.
 *
 *  Neither `query` nor `sessions` lives in the component that displays them.
 *  Both live in the parent, because more than one child needs them. Children
 *  receive values as props and send changes back by calling a function.
 *
 *  Try this first: move `query` into SearchInput with its own useState and see
 *  what stops working. The lesson asks you to do exactly that.
 * ============================================================================
 */

import { useState } from "react";

type Session = {
  id: number;
  topic: string;
  minutes: number;
  done: boolean;
};

const initialSessions: Session[] = [
  { id: 1, topic: "JSX", minutes: 45, done: true },
  { id: 2, topic: "Props and components", minutes: 30, done: true },
  { id: 3, topic: "State", minutes: 60, done: false },
  { id: 4, topic: "Lists and keys", minutes: 25, done: true },
  { id: 5, topic: "Routing", minutes: 90, done: false },
];

/* The parent. It owns the state and nothing else. ------------------------- */

export default function LiftingStateUpDemo() {
  const [query, setQuery] = useState("");
  const [sessions, setSessions] = useState(initialSessions);

  // Derived, not stored. Recalculated on every render from the two facts above.
  const visible = sessions.filter((session) =>
    session.topic.toLowerCase().includes(query.toLowerCase()),
  );

  function toggle(id: number) {
    setSessions(
      sessions.map((session) =>
        session.id === id ? { ...session, done: !session.done } : session,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <SearchInput value={query} onChange={setQuery} />
      <SessionList sessions={visible} onToggle={toggle} />
      <Summary visible={visible} total={sessions.length} query={query} />
    </div>
  );
}

/* The children. None of them own anything. -------------------------------- */

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Filter topics..."
      className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
    />
  );
}

function SessionList({
  sessions,
  onToggle,
}: {
  sessions: Session[];
  onToggle: (id: number) => void;
}) {
  if (sessions.length === 0) {
    return <p className="py-4 text-center text-sm text-zinc-500">Nothing matches.</p>;
  }

  return (
    <ul className="flex flex-col gap-1">
      {sessions.map((session) => (
        <li key={session.id}>
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            <input
              type="checkbox"
              checked={session.done}
              onChange={() => onToggle(session.id)}
              className="h-4 w-4"
            />
            <span
              className={
                session.done
                  ? "text-zinc-400 line-through"
                  : "text-zinc-900 dark:text-zinc-100"
              }
            >
              {session.topic}
            </span>
            <span className="ml-auto font-mono text-xs text-zinc-500">
              {session.minutes} min
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function Summary({
  visible,
  total,
  query,
}: {
  visible: Session[];
  total: number;
  query: string;
}) {
  const doneCount = visible.filter((session) => session.done).length;
  const minutes = visible.reduce((sum, session) => sum + session.minutes, 0);

  return (
    <div className="border-t border-zinc-200 pt-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <p>
        Showing {visible.length} of {total}
        {query !== "" ? ` matching "${query}"` : ""} — {doneCount} done,{" "}
        {minutes} min total
      </p>
    </div>
  );
}
