"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useProgress } from "@/lib/progress";

/**
 * The layout builds this slim shape on the server and passes it down, rather
 * than the sidebar importing the whole curriculum. Lesson summaries and
 * objectives are not needed for navigation, so they never reach the browser.
 */
export type NavLesson = {
  slug: string;
  title: string;
  href: string;
  status: "published" | "planned";
  isCapstone: boolean;
};

export type NavModule = {
  slug: string;
  title: string;
  tier: number;
  lessons: NavLesson[];
};

export type NavTier = {
  number: number;
  title: string;
};

export function Sidebar({ tiers, modules }: { tiers: NavTier[]; modules: NavModule[] }) {
  const pathname = usePathname();
  const { isComplete, completed } = useProgress();

  const total = modules.reduce((sum, module) => sum + module.lessons.length, 0);

  return (
    <nav
      aria-label="Course contents"
      className="flex h-full flex-col gap-6 overflow-y-auto border-r border-zinc-200 bg-zinc-50 px-5 py-6 text-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div>
        <Link href="/learn" className="font-semibold text-zinc-900 dark:text-zinc-100">
          React &amp; Next.js
        </Link>
        <p className="mt-1 text-xs text-zinc-500">
          {completed.length} of {total} lessons done
        </p>
      </div>

      {tiers.map((tier) => {
        const tierModules = modules.filter((module) => module.tier === tier.number);
        if (tierModules.length === 0) return null;

        return (
          <section key={tier.number}>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {tier.number}. {tier.title}
            </h2>
            <div className="flex flex-col gap-3">
              {tierModules.map((module) => (
                <div key={module.slug}>
                  <p className="mb-1 font-medium text-zinc-700 dark:text-zinc-300">
                    {module.title}
                  </p>
                  <ul className="flex flex-col gap-0.5 border-l border-zinc-200 dark:border-zinc-800">
                    {module.lessons.map((lesson) => {
                      const active = pathname === lesson.href;
                      const done = isComplete(lesson.href);

                      return (
                        <li key={lesson.slug}>
                          <Link
                            href={lesson.href}
                            aria-current={active ? "page" : undefined}
                            className={[
                              "-ml-px flex items-baseline gap-2 border-l py-1 pl-3 transition-colors",
                              active
                                ? "border-zinc-900 font-medium text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                                : "border-transparent text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
                            ].join(" ")}
                          >
                            <span
                              aria-hidden
                              className="w-3 shrink-0 text-emerald-600 dark:text-emerald-400"
                            >
                              {done ? "✓" : ""}
                            </span>
                            <span>
                              {lesson.title}
                              {lesson.isCapstone ? (
                                <span className="ml-1.5 rounded bg-zinc-200 px-1 py-0.5 text-[10px] font-medium uppercase text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                  project
                                </span>
                              ) : null}
                              {lesson.status === "planned" ? (
                                <span className="ml-1.5 text-[10px] uppercase text-zinc-400">
                                  soon
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </nav>
  );
}
