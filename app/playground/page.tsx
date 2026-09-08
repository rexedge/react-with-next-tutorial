import type { Metadata } from "next";
import Link from "next/link";

import { demos } from "@/content/demos";

export const metadata: Metadata = {
  title: "Playground",
  description: "Every live demo in the course, in one place.",
};

export default function PlaygroundIndexPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Playground
      </h1>
      <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
        Every demo in the course. Each one is a real file you can open and edit —
        the lesson it belongs to tells you what to try.
      </p>

      <ul className="mt-10 divide-y divide-zinc-200 dark:divide-zinc-800">
        {demos.map((demo) => (
          <li key={demo.slug} className="py-4">
            <Link href={`/playground/${demo.slug}`} className="group block">
              <p className="font-medium text-zinc-900 group-hover:underline dark:text-zinc-100">
                {demo.title}
              </p>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                {demo.description}
              </p>
              <code className="mt-1 block font-mono text-xs text-zinc-500">{demo.file}</code>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-zinc-500">
        More demos arrive with each tier.{" "}
        <Link href="/learn" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
          Back to the course
        </Link>
        .
      </p>
    </div>
  );
}
