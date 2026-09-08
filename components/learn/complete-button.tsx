"use client";

import { useProgress } from "@/lib/progress";

export function CompleteButton({ href }: { href: string }) {
  const { isComplete, toggle } = useProgress();
  const done = isComplete(href);

  return (
    <button
      type="button"
      onClick={() => toggle(href)}
      className={[
        "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
        done
          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
      ].join(" ")}
    >
      {done ? "✓ Completed" : "Mark complete"}
    </button>
  );
}
