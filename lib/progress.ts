"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "course-progress-v1";

/**
 * Progress lives only in this browser. No account, no database: the course has
 * to work on a laptop with no connection.
 *
 * localStorage is an external store, so it is read through
 * `useSyncExternalStore` rather than copied into state inside an effect. That
 * gives us a server snapshot for free, which is what keeps hydration correct -
 * the server has no localStorage, so it renders "nothing completed" and React
 * swaps in the real value once it takes over on the client.
 */

const EMPTY: string[] = [];

// getSnapshot must return a referentially stable value or React re-renders
// forever, so the parsed array is cached and only rebuilt when the raw string
// actually changes.
let cachedRaw: string | null = null;
let cachedValue: string[] = EMPTY;

const listeners = new Set<() => void>();

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private browsing or storage disabled. Losing progress is survivable;
    // crashing the lesson is not.
    return EMPTY;
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  // Keeps other tabs of the course in sync.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function save(hrefs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(hrefs));
  } catch {
    // Ignore - see getSnapshot().
  }
  // The storage event does not fire in the tab that made the change, so tell
  // this tab's subscribers directly.
  for (const listener of listeners) listener();
}

export function useProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((href: string) => {
    const current = getSnapshot();
    save(
      current.includes(href)
        ? current.filter((item) => item !== href)
        : [...current, href],
    );
  }, []);

  const isComplete = useCallback(
    (href: string) => completed.includes(href),
    [completed],
  );

  return { completed, isComplete, toggle };
}
