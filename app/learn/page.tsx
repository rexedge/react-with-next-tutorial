import type { Metadata } from "next";
import Link from "next/link";

import { allLessons, capstoneCount, lessonCount, modules, tiers } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "Course roadmap",
  description: "Every lesson in the React and Next.js course, in order.",
};

export default function LearnIndexPage() {
  const firstLesson = allLessons[0];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Course roadmap
      </h1>
      <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
        {lessonCount} lessons and {capstoneCount} projects, in order, from your
        first component to a deployed full-stack application. Work through them
        top to bottom.
      </p>

      {firstLesson ? (
        <Link
          href={firstLesson.href}
          className="mt-6 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Start with {firstLesson.lesson.title}
        </Link>
      ) : null}

      <div className="mt-12 space-y-12">
        {tiers.map((tier) => {
          const tierModules = modules.filter((module) => module.tier === tier.number);
          if (tierModules.length === 0) return null;

          return (
            <section key={tier.number}>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Tier {tier.number} — {tier.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{tier.summary}</p>

              <div className="mt-5 space-y-6">
                {tierModules.map((module) => (
                  <div key={module.slug}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                      {module.title}
                    </h3>
                    <ul className="mt-2 divide-y divide-zinc-200 dark:divide-zinc-800">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.slug} className="py-2">
                          <Link
                            href={`/learn/${module.slug}/${lesson.slug}`}
                            className="group flex items-baseline justify-between gap-4"
                          >
                            <span>
                              <span className="font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
                                {lesson.title}
                              </span>
                              <span className="ml-2 text-sm text-zinc-500">
                                {lesson.summary}
                              </span>
                            </span>
                            {lesson.status === "planned" ? (
                              <span className="shrink-0 text-[10px] uppercase tracking-wide text-zinc-400">
                                soon
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
