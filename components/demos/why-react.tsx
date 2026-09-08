"use client";

/*
 * ============================================================================
 *  This is the React version of the tracker from the lesson.
 *
 *  You have not been taught any of this yet - that is deliberate. Do not try to
 *  understand every line. Just notice one thing: there is exactly ONE place
 *  where anything changes, and four things on screen that follow from it.
 *
 *  The exercise at the end of the lesson asks you to add a fifth.
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
  { id: 2, topic: "Props", minutes: 30, done: false },
  { id: 3, topic: "State", minutes: 60, done: false },
];

export default function WhyReactDemo() {
  // THE ONE PIECE OF STATE. Everything below is worked out from it.
  const [sessions, setSessions] = useState(initialSessions);

  function toggle(id: number) {
    setSessions(
      sessions.map((session) =>
        session.id === id ? { ...session, done: !session.done } : session,
      ),
    );
  }

  // None of these are stored anywhere. They are recalculated every time the
  // component renders, which means they cannot drift out of sync.
  const doneCount = sessions.filter((s) => s.done).length;
  const doneMinutes = sessions
    .filter((s) => s.done)
    .reduce((total, s) => total + s.minutes, 0);
  const percent = Math.round((doneCount / sessions.length) * 100);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <ul className="flex flex-col gap-2">
        {sessions.map((session) => (
          <li key={session.id}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              <input
                type="checkbox"
                checked={session.done}
                onChange={() => toggle(session.id)}
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

      {/* Three separate readouts, all derived from the same state. */}
      <div className="mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            {doneCount} of {sessions.length} done
          </span>
          <span className="font-mono text-zinc-600 dark:text-zinc-400">
            {doneMinutes} min studied
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="mt-2 text-center text-xs text-zinc-500">{percent}% complete</p>
      </div>
    </div>
  );
}
