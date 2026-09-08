import type { ReactNode } from "react";

export function Exercise({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="my-8 rounded-xl border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Your turn
      </p>
      <h3 className="mb-3 mt-0 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <div className="text-sm leading-relaxed [&>*:last-child]:mb-0">{children}</div>
    </section>
  );
}
