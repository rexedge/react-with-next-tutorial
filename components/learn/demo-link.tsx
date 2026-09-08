import Link from "next/link";

/**
 * Points at the live demo for a lesson. The `file` is shown so the student
 * knows exactly which file to open in their editor - editing the real file and
 * watching it hot-reload is the workflow this course is teaching.
 */
export function DemoLink({ slug, file }: { slug: string; file?: string }) {
  return (
    <div className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950">
      <div className="text-sm">
        <p className="font-medium text-zinc-900 dark:text-zinc-100">Try it live</p>
        {file ? (
          <p className="mt-0.5 text-zinc-500">
            Edit <code className="font-mono text-xs">{file}</code> and watch it reload.
          </p>
        ) : null}
      </div>
      <Link
        href={`/playground/${slug}`}
        className="shrink-0 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        Open demo
      </Link>
    </div>
  );
}
