/**
 * The course spine.
 *
 * Every lesson in the course is declared here exactly once. Navigation, the
 * sidebar, prev/next links, progress tracking and the roadmap all derive from
 * this file, so ordering is decided by array order and nothing else.
 *
 * A lesson with status "published" must have a matching MDX file at
 * `content/lessons/<module.slug>/<lesson.slug>.mdx`. Lessons that are still
 * "planned" render as a stub, so the student can always see the whole journey.
 */

export type LessonStatus = "published" | "planned";

export type Lesson = {
  slug: string;
  title: string;
  /** One line, shown in the sidebar and on module pages. */
  summary: string;
  /** What the student should be able to do afterwards. */
  objectives: string[];
  /** Slug of a route under /playground, when the concept has a live demo. */
  demo?: string;
  /** Capstones are projects rather than lessons; they get different chrome. */
  kind?: "lesson" | "capstone";
  status: LessonStatus;
};

export type Module = {
  slug: string;
  title: string;
  summary: string;
  tier: number;
  lessons: Lesson[];
};

export type Tier = {
  number: number;
  title: string;
  summary: string;
};

export const tiers: Tier[] = [
  {
    number: 0,
    title: "Foundations",
    summary:
      "The bridge from vanilla JavaScript. Just enough modern JS and TypeScript to read everything that follows.",
  },
  {
    number: 1,
    title: "React core",
    summary:
      "React on its own terms, before Next.js enters the picture. The most important tier in the course.",
  },
  {
    number: 2,
    title: "Next.js routing",
    summary: "Turning React components into a real, navigable application.",
  },
  {
    number: 3,
    title: "Server and data",
    summary:
      "Server Components, data fetching, and mutations - the conceptual centre of modern Next.js.",
  },
  {
    number: 4,
    title: "Full-stack",
    summary: "A database, authentication, and a deployment you own.",
  },
  {
    number: 5,
    title: "Advanced Next.js 16",
    summary: "Caching, prerendering, and the routing features you grow into.",
  },
];

export const modules: Module[] = [
  {
    slug: "foundations",
    title: "Getting started",
    tier: 0,
    summary:
      "How the course works, and the JavaScript and TypeScript it assumes.",
    lessons: [
      {
        slug: "how-this-course-works",
        title: "How this course works",
        summary:
          "Read, run, edit, and prove it - the loop you will repeat sixty times.",
        objectives: [
          "Run the course app locally",
          "Know where lessons, demos and exercises live",
          "Understand how progress is tracked",
        ],
        status: "published",
      },
      {
        slug: "modern-javascript",
        title: "Modern JavaScript refresher",
        summary:
          "Modules, destructuring, spread, arrow functions, array methods, and async/await.",
        objectives: [
          "Import and export between modules",
          "Destructure objects and arrays confidently",
          "Use map, filter and reduce to transform data",
        ],
        demo: "array-methods",
        status: "published",
      },
      {
        slug: "typescript-primer",
        title: "TypeScript primer",
        summary:
          "Only the TypeScript this course needs: annotations, interfaces, unions, and typing props.",
        objectives: [
          "Annotate variables, parameters and return types",
          "Describe object shapes with type and interface",
          "Read the type errors your editor shows you",
        ],
        status: "published",
      },
      {
        slug: "the-toolchain",
        title: "What the toolchain does",
        summary: "pnpm, Turbopack, the dev server, and what happens on build.",
        objectives: [
          "Explain what the dev server does when you save a file",
          "Tell the difference between dev and production builds",
        ],
        status: "published",
      },
    ],
  },
  {
    slug: "react-basics",
    title: "React basics",
    tier: 1,
    summary: "Components, JSX, props, and rendering.",
    lessons: [
      {
        slug: "why-react",
        title: "Why React exists",
        summary:
          "The same feature built twice - once with DOM manipulation, once with React.",
        objectives: [
          "Explain what problem React solves",
          "Describe the difference between imperative and declarative UI",
        ],
        demo: "why-react",
        status: "published",
      },
      {
        slug: "jsx",
        title: "JSX",
        summary: "Markup inside JavaScript, and the rules that come with it.",
        objectives: [
          "Write valid JSX",
          "Embed expressions",
          "Avoid the common JSX gotchas",
        ],
        status: "published",
      },
      {
        slug: "components-and-props",
        title: "Components and props",
        summary: "Building blocks, and passing typed data into them.",
        objectives: [
          "Write a function component",
          "Type its props",
          "Compose components together",
        ],
        demo: "components-and-props",
        status: "published",
      },
      {
        slug: "lists-and-keys",
        title: "Lists and keys",
        summary: "Rendering arrays, and why React asks for a key.",
        objectives: [
          "Render a list",
          "Choose a correct key",
          "Explain what a bad key breaks",
        ],
        status: "published",
      },
      {
        slug: "conditional-rendering",
        title: "Conditional rendering",
        summary: "Showing and hiding parts of the tree.",
        objectives: [
          "Use && and ternaries in JSX",
          "Avoid rendering stray zeroes",
        ],
        status: "published",
      },
      {
        slug: "handling-events",
        title: "Handling events",
        summary: "Responding to clicks, typing, and submits.",
        objectives: ["Attach typed event handlers", "Read values off an event"],
        status: "published",
      },
    ],
  },
  {
    slug: "react-state",
    title: "State",
    tier: 1,
    summary: "Making components remember things.",
    lessons: [
      {
        slug: "use-state",
        title: "useState",
        summary: "The hook that makes a component interactive.",
        objectives: [
          "Add state to a component",
          "Update state correctly, including from previous state",
          "Explain why mutating state does nothing",
        ],
        demo: "use-state",
        status: "published",
      },
      {
        slug: "forms-and-inputs",
        title: "Forms and controlled inputs",
        summary:
          "Wiring inputs to state, and the trade-off that comes with it.",
        objectives: ["Build a controlled input", "Handle a form submit"],
        status: "published",
      },
      {
        slug: "lifting-state-up",
        title: "Lifting state up",
        summary: "Sharing state between siblings by moving it to their parent.",
        objectives: [
          "Identify where state should live",
          "Pass state down and callbacks up",
        ],
        demo: "lifting-state-up",
        status: "published",
      },
      {
        slug: "thinking-in-react",
        title: "Thinking in React",
        summary: "Taking a design and decomposing it into a component tree.",
        objectives: [
          "Break a mockup into components",
          "Decide what is state and what is derived",
        ],
        status: "published",
      },
    ],
  },
  {
    slug: "react-effects",
    title: "Effects and refs",
    tier: 1,
    summary: "Talking to the world outside React.",
    lessons: [
      {
        slug: "use-effect",
        title: "useEffect",
        summary:
          "Synchronising with external systems - and the many times you should not.",
        objectives: [
          "Write an effect with a correct dependency array",
          "Clean up an effect",
          "Recognise the cases that need no effect at all",
        ],
        demo: "use-effect",
        status: "planned",
      },
      {
        slug: "use-ref",
        title: "useRef",
        summary:
          "Values that persist without re-rendering, and reaching for a DOM node.",
        objectives: ["Hold a mutable value", "Focus an input imperatively"],
        status: "planned",
      },
    ],
  },
  {
    slug: "react-advanced",
    title: "Sharing and structuring",
    tier: 1,
    summary: "Patterns for state and logic that outgrow a single component.",
    lessons: [
      {
        slug: "context",
        title: "Context",
        summary:
          "Passing data down without threading props through every level.",
        objectives: [
          "Create and consume a context",
          "Know when context is the wrong tool",
        ],
        status: "planned",
      },
      {
        slug: "use-reducer",
        title: "useReducer",
        summary: "State transitions as data, for when useState stops scaling.",
        objectives: [
          "Write a reducer",
          "Choose between useState and useReducer",
        ],
        status: "planned",
      },
      {
        slug: "custom-hooks",
        title: "Custom hooks",
        summary: "Extracting stateful logic you can reuse.",
        objectives: [
          "Write a custom hook",
          "Explain what makes a function a hook",
        ],
        status: "planned",
      },
      {
        slug: "rules-of-hooks",
        title: "Rules of hooks, purity and rendering",
        summary: "Why the rules exist, and what breaks when you bend them.",
        objectives: [
          "State the rules of hooks",
          "Explain what a pure render means",
          "Predict when a component re-renders",
        ],
        status: "planned",
      },
      {
        slug: "composition",
        title: "Composition and children",
        summary: "Building flexible components instead of adding another prop.",
        objectives: ["Use children", "Prefer composition over configuration"],
        status: "planned",
      },
    ],
  },
  {
    slug: "react-19",
    title: "React 19",
    tier: 1,
    summary: "The newer hooks, and the compiler that changes how you optimise.",
    lessons: [
      {
        slug: "use-and-transitions",
        title: "use and useTransition",
        summary:
          "Reading resources during render, and keeping the UI responsive.",
        objectives: ["Use the use hook", "Mark an update as a transition"],
        status: "planned",
      },
      {
        slug: "optimistic-and-action-state",
        title: "useOptimistic and useActionState",
        summary: "UI that responds before the server answers.",
        objectives: [
          "Show an optimistic update",
          "Track the state of an action",
        ],
        status: "planned",
      },
      {
        slug: "react-compiler",
        title: "The React Compiler",
        summary:
          "Automatic memoization, and what it means for useMemo and useCallback.",
        objectives: [
          "Explain what the compiler does",
          "Decide when manual memoization is still needed",
        ],
        status: "planned",
      },
      {
        slug: "capstone-interactive-ui",
        title: "Capstone: an interactive UI",
        summary:
          "Build a complete client-side app from scratch, with no new concepts.",
        objectives: [
          "Ship a working interactive app using only Tier 1 material",
        ],
        kind: "capstone",
        status: "planned",
      },
    ],
  },
  {
    slug: "nextjs-routing",
    title: "Routing and structure",
    tier: 2,
    summary: "The App Router, and the file conventions that define an app.",
    lessons: [
      {
        slug: "app-router",
        title: "The App Router",
        summary: "How the file system becomes your routing table.",
        objectives: ["Map a URL to a file", "Name the core file conventions"],
        status: "planned",
      },
      {
        slug: "pages-and-layouts",
        title: "Pages and layouts",
        summary: "Shared chrome that survives navigation.",
        objectives: ["Write a page and a layout", "Nest layouts"],
        status: "planned",
      },
      {
        slug: "linking-and-navigating",
        title: "Linking and navigating",
        summary: "Link, the router, and what prefetching buys you.",
        objectives: ["Navigate with Link", "Navigate programmatically"],
        status: "planned",
      },
      {
        slug: "dynamic-routes",
        title: "Dynamic routes",
        summary:
          "URL segments as data - and why params is a Promise in Next 16.",
        objectives: [
          "Build a dynamic segment",
          "Await params",
          "Generate static params",
        ],
        status: "planned",
      },
      {
        slug: "route-groups",
        title: "Route groups and organisation",
        summary: "Structuring a growing app without changing its URLs.",
        objectives: ["Use a route group", "Split layouts across sections"],
        status: "planned",
      },
      {
        slug: "loading-and-error",
        title: "Loading and error states",
        summary: "loading.tsx, error.tsx, and not-found.tsx.",
        objectives: [
          "Add a loading state",
          "Catch and recover from a render error",
        ],
        status: "planned",
      },
      {
        slug: "metadata",
        title: "Metadata and OG images",
        summary:
          "Titles, descriptions, and the image that shows up when you share a link.",
        objectives: ["Export metadata", "Generate an OG image"],
        status: "planned",
      },
      {
        slug: "images-and-fonts",
        title: "Images and fonts",
        summary: "next/image, next/font, and the v16 changes to both.",
        objectives: ["Optimise an image", "Load a font without layout shift"],
        status: "planned",
      },
      {
        slug: "styling",
        title: "Styling with Tailwind v4",
        summary: "CSS-first configuration, and how this very site is styled.",
        objectives: [
          "Add theme tokens in @theme",
          "Explain why there is no tailwind.config.js",
        ],
        status: "planned",
      },
    ],
  },
  {
    slug: "server-and-client",
    title: "Server and Client Components",
    tier: 3,
    summary: "The most important boundary in modern Next.js.",
    lessons: [
      {
        slug: "server-vs-client",
        title: "Server vs Client Components",
        summary: "What runs where, and what crossing the boundary costs.",
        objectives: [
          "Explain what a Server Component is",
          "Decide where the use client directive belongs",
          "Predict what ships to the browser",
        ],
        status: "planned",
      },
      {
        slug: "fetching-data",
        title: "Fetching data",
        summary: "Async components, and querying right where you render.",
        objectives: ["Fetch in a Server Component", "Handle a failed request"],
        status: "planned",
      },
      {
        slug: "streaming-and-suspense",
        title: "Streaming and Suspense",
        summary:
          "Sending the page in pieces so the slow parts do not block the fast ones.",
        objectives: [
          "Wrap a slow region in Suspense",
          "Explain what the user sees first",
        ],
        status: "planned",
      },
    ],
  },
  {
    slug: "mutations",
    title: "Mutations",
    tier: 3,
    summary: "Changing data, and everything that surrounds a form.",
    lessons: [
      {
        slug: "server-actions",
        title: "Server Actions",
        summary:
          "Calling server code from a component without writing an endpoint.",
        objectives: [
          "Write a Server Action",
          "Call it from a form",
          "Revalidate afterwards",
        ],
        status: "planned",
      },
      {
        slug: "forms-and-validation",
        title: "Forms and validation",
        summary: "useActionState, pending states, and reporting errors back.",
        objectives: [
          "Validate input on the server",
          "Show field errors",
          "Disable while pending",
        ],
        status: "planned",
      },
      {
        slug: "route-handlers",
        title: "Route handlers",
        summary: "Real HTTP endpoints, and when you still need them.",
        objectives: [
          "Write a GET and a POST handler",
          "Choose between an action and a handler",
        ],
        status: "planned",
      },
      {
        slug: "error-handling",
        title: "Error handling",
        summary: "Failing safely across the server/client boundary.",
        objectives: [
          "Distinguish expected from unexpected errors",
          "Keep error messages safe",
        ],
        status: "planned",
      },
      {
        slug: "capstone-data-app",
        title: "Capstone: a data-driven app",
        summary: "Server rendering, real data, and mutations end to end.",
        objectives: ["Ship an app that reads and writes real data"],
        kind: "capstone",
        status: "planned",
      },
    ],
  },
  {
    slug: "full-stack",
    title: "Going full-stack",
    tier: 4,
    summary: "A database, accounts, and a live deployment.",
    lessons: [
      {
        slug: "database",
        title: "Adding a database",
        summary: "Choosing one, provisioning it, and connecting safely.",
        objectives: ["Provision a Postgres database", "Connect from the app"],
        status: "planned",
      },
      {
        slug: "schema-and-queries",
        title: "Schema and queries",
        summary: "Modelling your data and reading it back.",
        objectives: ["Design a small schema", "Write typed queries"],
        status: "planned",
      },
      {
        slug: "authentication",
        title: "Authentication",
        summary: "Sessions, protected routes, and knowing who is asking.",
        objectives: [
          "Add sign-in",
          "Protect a route",
          "Read the current user on the server",
        ],
        status: "planned",
      },
      {
        slug: "environment-variables",
        title: "Environment variables and secrets",
        summary:
          "What is safe to expose, and what must never leave the server.",
        objectives: [
          "Explain the NEXT_PUBLIC_ prefix",
          "Keep a secret out of the client bundle",
        ],
        status: "planned",
      },
      {
        slug: "deploying",
        title: "Deploying",
        summary: "Getting the app onto the internet with a URL you own.",
        objectives: [
          "Deploy to Vercel",
          "Configure production environment variables",
        ],
        status: "planned",
      },
      {
        slug: "capstone-ship-it",
        title: "Capstone: ship it",
        summary: "Your own full-stack app, live, with auth and a database.",
        objectives: ["Ship and deploy an original full-stack application"],
        kind: "capstone",
        status: "planned",
      },
    ],
  },
  {
    slug: "advanced",
    title: "Advanced Next.js 16",
    tier: 5,
    summary: "Caching, prerendering, and advanced routing.",
    lessons: [
      {
        slug: "caching-model",
        title: "The caching model",
        summary: "Every cache Next.js has, and which one bit you.",
        objectives: ["Name the caching layers", "Trace a request through them"],
        status: "planned",
      },
      {
        slug: "cache-components",
        title: "Cache Components and use cache",
        summary:
          "Opting into caching explicitly, at the granularity you choose.",
        objectives: [
          "Enable Cache Components",
          "Cache a component and a function",
        ],
        status: "planned",
      },
      {
        slug: "cache-invalidation",
        title: "Invalidating caches",
        summary: "cacheLife, cacheTag, revalidateTag, updateTag and refresh.",
        objectives: [
          "Tag cached data",
          "Invalidate precisely after a mutation",
        ],
        status: "planned",
      },
      {
        slug: "partial-prerendering",
        title: "Partial Prerendering",
        summary: "A static shell with dynamic holes, in one response.",
        objectives: [
          "Enable PPR",
          "Identify the static and dynamic parts of a page",
        ],
        status: "planned",
      },
      {
        slug: "parallel-routes",
        title: "Parallel routes",
        summary: "Rendering more than one page into one layout.",
        objectives: ["Build a slot", "Supply the required default.tsx"],
        status: "planned",
      },
      {
        slug: "intercepting-routes",
        title: "Intercepting routes",
        summary: "The modal-on-navigation pattern, done properly.",
        objectives: ["Intercept a route", "Keep the URL shareable"],
        status: "planned",
      },
      {
        slug: "proxy",
        title: "proxy.ts",
        summary:
          "Code that runs before a request reaches a route - formerly middleware.",
        objectives: ["Write a proxy", "Redirect and rewrite requests"],
        status: "planned",
      },
      {
        slug: "performance",
        title: "Performance and instrumentation",
        summary: "Measuring what you shipped, and finding what is slow.",
        objectives: [
          "Analyse the bundle",
          "Read Core Web Vitals",
          "Add instrumentation",
        ],
        status: "planned",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Derived lookups. Everything below is computed from `modules` above. */
/* ------------------------------------------------------------------ */

export type LessonRef = {
  module: Module;
  lesson: Lesson;
  /** 1-based position across the whole course. */
  position: number;
  href: string;
};

export const allLessons: LessonRef[] = modules
  .flatMap((module) =>
    module.lessons.map((lesson) => ({
      module,
      lesson,
      href: `/learn/${module.slug}/${lesson.slug}`,
    })),
  )
  .map((ref, index) => ({ ...ref, position: index + 1 }));

/** Every entry, capstones included. */
export const totalLessons = allLessons.length;

export const capstoneCount = allLessons.filter(
  (ref) => ref.lesson.kind === "capstone",
).length;

/** Teaching lessons only, excluding the capstone projects. */
export const lessonCount = totalLessons - capstoneCount;

export function getModule(slug: string): Module | undefined {
  return modules.find((module) => module.slug === slug);
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string,
): LessonRef | undefined {
  return allLessons.find(
    (ref) => ref.module.slug === moduleSlug && ref.lesson.slug === lessonSlug,
  );
}

export function getNeighbours(ref: LessonRef): {
  previous?: LessonRef;
  next?: LessonRef;
} {
  const index = ref.position - 1;
  return {
    previous: allLessons[index - 1],
    next: allLessons[index + 1],
  };
}

export function getTier(number: number): Tier | undefined {
  return tiers.find((tier) => tier.number === number);
}

export function modulesByTier(tier: number): Module[] {
  return modules.filter((module) => module.tier === tier);
}
