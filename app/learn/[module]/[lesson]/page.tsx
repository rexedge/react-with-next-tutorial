import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CompleteButton } from "@/components/learn/complete-button";
import { allLessons, getLesson, getNeighbours, getTier } from "@/content/curriculum";

export function generateStaticParams() {
  return allLessons.map((ref) => ({
    module: ref.module.slug,
    lesson: ref.lesson.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/learn/[module]/[lesson]">): Promise<Metadata> {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const ref = getLesson(moduleSlug, lessonSlug);
  if (!ref) return {};

  return {
    title: `${ref.lesson.title} · ${ref.module.title}`,
    description: ref.lesson.summary,
  };
}

export default async function LessonPage({ params }: PageProps<"/learn/[module]/[lesson]">) {
  // In Next 16 `params` is a Promise. Lesson 27 explains why.
  const { module: moduleSlug, lesson: lessonSlug } = await params;

  const ref = getLesson(moduleSlug, lessonSlug);
  if (!ref) notFound();

  const { module, lesson, href, position } = ref;
  const { previous, next } = getNeighbours(ref);
  const tier = getTier(module.tier);

  return (
    <article className="mx-auto max-w-2xl">
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {tier ? `${tier.title} · ` : ""}
          {module.title} · Lesson {position}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {lesson.title}
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">{lesson.summary}</p>

        {lesson.objectives.length > 0 ? (
          <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              By the end you will be able to
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
              {lesson.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </header>

      <div className="prose prose-zinc max-w-none dark:prose-invert">
        <LessonBody moduleSlug={moduleSlug} lessonSlug={lessonSlug} planned={lesson.status === "planned"} />
      </div>

      <footer className="mt-16 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <div className="mb-6 flex justify-end">
          <CompleteButton href={href} />
        </div>
        <div className="flex flex-wrap justify-between gap-4 text-sm">
          {previous ? (
            <Link
              href={previous.href}
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              ← {previous.lesson.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={next.href}
              className="text-right font-medium text-zinc-900 hover:underline dark:text-zinc-100"
            >
              {next.lesson.title} →
            </Link>
          ) : null}
        </div>
      </footer>
    </article>
  );
}

async function LessonBody({
  moduleSlug,
  lessonSlug,
  planned,
}: {
  moduleSlug: string;
  lessonSlug: string;
  planned: boolean;
}) {
  if (planned) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 px-5 py-8 text-center text-zinc-500 dark:border-zinc-700">
        This lesson has not been written yet. It is on the roadmap and the course
        is being built in order, so it will land soon.
      </p>
    );
  }

  // A published lesson is guaranteed a matching MDX file by the manifest's own
  // contract, so a failure here is a real error and should surface loudly.
  const { default: Content } = await import(
    `../../../../content/lessons/${moduleSlug}/${lessonSlug}.mdx`
  );

  return <Content />;
}
