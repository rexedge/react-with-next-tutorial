import type { ReactNode } from "react";

type CalloutVariant = "note" | "tip" | "warning" | "gotcha";

const variants: Record<CalloutVariant, { label: string; className: string }> = {
  note: {
    label: "Note",
    className: "border-sky-500/40 bg-sky-500/5 text-sky-900 dark:text-sky-200",
  },
  tip: {
    label: "Tip",
    className: "border-emerald-500/40 bg-emerald-500/5 text-emerald-900 dark:text-emerald-200",
  },
  warning: {
    label: "Careful",
    className: "border-amber-500/40 bg-amber-500/5 text-amber-900 dark:text-amber-200",
  },
  gotcha: {
    label: "Common mistake",
    className: "border-rose-500/40 bg-rose-500/5 text-rose-900 dark:text-rose-200",
  },
};

export function Callout({
  variant = "note",
  children,
}: {
  variant?: CalloutVariant;
  children: ReactNode;
}) {
  const { label, className } = variants[variant];

  return (
    <aside className={`my-6 rounded-lg border-l-4 px-4 py-3 ${className}`}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-80">{label}</p>
      <div className="[&>*:last-child]:mb-0 [&>p]:mb-2 [&>p]:text-sm [&>p]:leading-relaxed">
        {children}
      </div>
    </aside>
  );
}
