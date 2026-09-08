import type { ReactNode } from "react";

/**
 * Deliberately a native <details>. It needs no JavaScript, which keeps the
 * lesson page a Server Component, and it is a fair example of using the
 * platform before reaching for React.
 */
export function Solution({ children }: { children: ReactNode }) {
  return (
    <details className="my-4 rounded-lg border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950">
      <summary className="cursor-pointer select-none text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50">
        Show solution
      </summary>
      <div className="mt-3 text-sm [&>*:last-child]:mb-0">{children}</div>
    </details>
  );
}
