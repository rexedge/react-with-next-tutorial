import Link from "next/link";

import { allLessons, capstoneCount, lessonCount, tiers } from "@/content/curriculum";

export default function Home() {
  const firstLesson = allLessons[0];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        A self-paced course
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
        Learn React and Next.js
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        You know HTML, CSS and JavaScript. This takes you from there to a deployed,
        full-stack Next.js application — {lessonCount} lessons and {capstoneCount}{" "}
        projects, every one of them running in this app.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {firstLesson ? (
          <Link
            href={firstLesson.href}
            className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Start the course
          </Link>
        ) : null}
        <Link
          href="/learn"
          className="rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          See the roadmap
        </Link>
      </div>

      <ol className="mt-16 space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        {tiers.map((tier) => (
          <li key={tier.number} className="flex gap-4">
            <span className="w-6 shrink-0 font-mono text-sm text-zinc-400">
              {tier.number}
            </span>
            <span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {tier.title}
              </span>
              <span className="mt-0.5 block text-sm text-zinc-600 dark:text-zinc-400">
                {tier.summary}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
