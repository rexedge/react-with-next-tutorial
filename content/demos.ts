import type { ComponentType } from "react";

/**
 * The demo registry.
 *
 * Each entry maps a `/playground/<slug>` route to a real component in
 * `components/demos/`. `load` is a function rather than a static import so that
 * each demo is code-split into its own route instead of every demo shipping
 * with every playground page.
 *
 * `file` is shown to the student, so it must stay accurate - the whole point of
 * a demo is that they open that exact file and edit it.
 */
export type Demo = {
  slug: string;
  title: string;
  description: string;
  /** Repo-relative path of the file the student edits. */
  file: string;
  /** The lesson this demo belongs to. */
  lessonHref: string;
  lessonTitle: string;
  load: () => Promise<{ default: ComponentType }>;
};

export const demos: Demo[] = [
  {
    slug: "array-methods",
    title: "Transforming data with array methods",
    description:
      "One list of study sessions, reshaped six ways with map, filter, reduce and sort.",
    file: "components/demos/array-methods.tsx",
    lessonHref: "/learn/foundations/modern-javascript",
    lessonTitle: "Modern JavaScript refresher",
    load: () => import("@/components/demos/array-methods"),
  },
  {
    slug: "why-react",
    title: "The tracker, in React",
    description:
      "Four things on screen, one piece of state, and no way for them to disagree.",
    file: "components/demos/why-react.tsx",
    lessonHref: "/learn/react-basics/why-react",
    lessonTitle: "Why React exists",
    load: () => import("@/components/demos/why-react"),
  },
  {
    slug: "components-and-props",
    title: "One component, five cards",
    description: "The same component written once and used with different props.",
    file: "components/demos/components-and-props.tsx",
    lessonHref: "/learn/react-basics/components-and-props",
    lessonTitle: "Components and props",
    load: () => import("@/components/demos/components-and-props"),
  },
];

export function getDemo(slug: string): Demo | undefined {
  return demos.find((demo) => demo.slug === slug);
}
