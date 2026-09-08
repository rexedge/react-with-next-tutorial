import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { demos, getDemo } from "@/content/demos";

export function generateStaticParams() {
  return demos.map((demo) => ({ demo: demo.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/playground/[demo]">): Promise<Metadata> {
  const { demo: slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return {};

  return { title: `${demo.title} · Playground`, description: demo.description };
}

export default async function PlaygroundPage({ params }: PageProps<"/playground/[demo]">) {
  const { demo: slug } = await params;

  const demo = getDemo(slug);
  if (!demo) notFound();

  const { default: Demo } = await demo.load();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-8">
        <Link
          href={demo.lessonHref}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← {demo.lessonTitle}
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {demo.title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{demo.description}</p>

        <p className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          This page renders{" "}
          <code className="font-mono text-xs text-zinc-900 dark:text-zinc-100">{demo.file}</code>.
          Open it, change it, save it — this page updates on its own.
        </p>
      </header>

      <Demo />
    </div>
  );
}
