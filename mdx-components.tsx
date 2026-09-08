import type { MDXComponents } from "mdx/types";

import { Callout } from "@/components/learn/callout";
import { Exercise } from "@/components/learn/exercise";
import { Solution } from "@/components/learn/solution";
import { DemoLink } from "@/components/learn/demo-link";

// Components available inside every lesson without an import. Keep this list
// small and obvious — a student reading a lesson's source should not have to
// hunt for where <Callout> came from.
const components: MDXComponents = {
  Callout,
  Exercise,
  Solution,
  DemoLink,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
