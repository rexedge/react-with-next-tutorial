# Learning React & Next.js — Course Plan

A self-paced course that takes a developer who knows HTML, CSS, and JavaScript all the way to
shipping a full-stack Next.js 16 application. The course, its exercises, and its worked examples
all live inside this one Next.js app.

## Decisions

| Decision | Choice | Consequence |
| --- | --- | --- |
| Language | **TypeScript from day one** | Requires a TS primer *before* React starts, or module 1 is unreadable. See Tier 0. |
| Shape | **MDX lessons + live demos** | Every concept has a prose page and a real, editable demo route. Concepts stay isolated — a broken exercise never blocks the next lesson. |
| Scope | **Full-stack + deploy + advanced Next 16** | Ends with a deployed app, then a final tier on Cache Components, PPR, and parallel/intercepting routes. |

The TypeScript choice is the one with a hidden cost, so it is worth being explicit: a student fresh
off vanilla JavaScript who meets `function Greeting({ name }: { name: string })` on day one is
learning two things at once. Tier 0 exists to defuse that. It teaches only the TypeScript actually
needed to read the rest of the course — annotations, interfaces, unions, and typing props — and
deliberately defers generics, utility types, and declaration merging until the student has a reason
to want them.

## How a lesson works

Each lesson is one MDX file plus, where the concept is interactive, one demo route.

- **Read** — the MDX page explains the concept, with runnable code samples.
- **Watch it run** — a `/playground/<demo>` route renders a real component demonstrating it.
- **Edit it** — the demo is a real file in `components/demos/`. The student opens it in their editor
  and changes it; `pnpm dev` hot-reloads. This is deliberate: an in-browser sandbox would be flashier
  but would teach a workflow that does not exist off this site, and could not run Server Components
  at all.
- **Do the exercise** — a stated task with a hidden solution behind a toggle.

Progress is tracked per-lesson in `localStorage` — no account, no database. The course must be
usable offline on a laptop.

## Curriculum

Six tiers (0-5), 53 lessons and 3 capstone projects. Capstones sit at tier boundaries where the
student has just gained enough to build something real. The authoritative list is
`content/curriculum.ts`; this section is the narrative view of it.

### Tier 0 — Foundations (bridge from vanilla JS)
Everything needed to read the rest of the course without guessing.
1. How this course works; running the app
2. Modern JavaScript refresher — modules, destructuring, spread/rest, arrow functions, array methods, async/await, optional chaining
3. TypeScript primer — annotations, `interface` vs `type`, unions, literal types, typing functions and objects
4. What the toolchain does — pnpm, Turbopack, the dev server, the build

### Tier 1 — React core
The largest tier, and the one that matters most. Taught as plain React first; Next.js stays out of
the way until Tier 2.
5. Why React exists — the mental model against direct DOM manipulation
6. JSX
7. Components and props (typed)
8. Rendering lists, and why keys matter
9. Conditional rendering
10. Handling events
11. `useState` and the idea of state
12. Forms and controlled inputs
13. Lifting state up
14. Thinking in React — decomposing a design
15. `useEffect`, and the many times you should not reach for it
16. `useRef` and escape hatches
17. Context
18. `useReducer`
19. Custom hooks
20. Rules of hooks; purity and rendering
21. Composition patterns and `children`
22. React 19 hooks — `use`, `useTransition`, `useOptimistic`, `useActionState`
23. The React Compiler and what it means for memoization

**Capstone 1** — an interactive UI, client-side only.

### Tier 2 — Next.js routing and structure
24. The App Router and its file conventions
25. Pages and layouts
26. Linking and navigating
27. Dynamic routes — and `params` being a Promise
28. Route groups and nested layouts
29. `loading.tsx`, `error.tsx`, `not-found.tsx`
30. Metadata and OG images
31. Images
32. Fonts
33. CSS and Tailwind v4 in Next

### Tier 3 — Server and data
The conceptual centre of modern Next.js.
34. Server Components vs Client Components — where the boundary really is
35. Fetching data on the server
36. Streaming and Suspense
37. Mutating data with Server Actions
38. Forms with `useActionState` and validation
39. Route handlers
40. Error handling across the server/client boundary

**Capstone 2** — a server-rendered, data-driven app.

### Tier 4 — Full-stack
41. Choosing and provisioning a database
42. Schema and queries
43. Reading and writing from Server Components and Actions
44. Authentication
45. Environment variables and secrets
46. Deploying to Vercel

**Capstone 3** — ship it. The student finishes with a live URL they own.

### Tier 5 — Advanced Next 16
Topics most working developers meet much later, taught once the foundation is solid.
47. The caching model, end to end
48. Cache Components and `use cache`
49. `cacheLife`, `cacheTag`, `revalidateTag`, `updateTag`, `refresh`
50. Partial Prerendering
51. Parallel routes
52. Intercepting routes
53. `proxy.ts`
54. Performance, bundle analysis, and instrumentation

## Architecture

```
app/
  page.tsx                      landing + tier overview
  learn/
    page.tsx                    the roadmap
    layout.tsx                  sidebar nav, progress
    [module]/[lesson]/page.tsx  resolves slug -> MDX via the manifest
  playground/[demo]/page.tsx    live, editable demos
content/
  curriculum.ts                 typed manifest — single source of truth
  demos.ts                      demo registry: slug -> component, file, lesson
  lessons/<module>/<lesson>.mdx prose only
mdx-components.tsx              registers lesson chrome globally for MDX
components/
  learn/                        Callout, Exercise, Solution, DemoLink, Sidebar
  demos/                        one folder per live demo — the files students edit
lib/
  progress.ts                   localStorage progress
```

`content/curriculum.ts` is the spine. It owns lesson order, titles, slugs, objectives, and demo
links, so navigation, progress, and the table of contents all derive from one typed structure
rather than from frontmatter scattered across sixty files. This also sidesteps a real constraint:
Turbopack cannot accept remark/rehype plugins with non-serializable options, so frontmatter
plugins are awkward here. The manifest doubles as a worked example of typed data modelling that
Tier 0 can point at.

## Build order

1. ~~**The machine** — MDX wiring, the manifest, lesson routing, lesson chrome, progress. One real
   lesson end to end proves it works.~~ **Done.**
2. **Tier 0 + Tier 1** — the bulk of the writing, and the highest-value part of the course.
3. **Tiers 2–3**, with capstones 1 and 2.
4. **Tier 4**, which introduces the first external dependencies (database, auth, deploy).
5. **Tier 5**.

Content is written tier by tier so the course is usable from the moment Tier 1 lands, rather than
being an empty shell with sixty stub pages.

## Status

**Step 1 complete** — the machine works end to end. **Step 2 in progress** — Tier 0 is written.

`pnpm build` renders 63 routes and `pnpm lint` is clean.

Written so far:

- Tier 0 — *How this course works*, *Modern JavaScript refresher*, *TypeScript primer*,
  *What the toolchain does*. Tier 0 is done.

The `/playground` route and its registry (`content/demos.ts`) are live, with the first demo -
`array-methods`, attached to the Modern JavaScript lesson.

The remaining 52 lessons are declared in `content/curriculum.ts` with `status: "planned"` and render
a stub.

Next: **Tier 1, React core** — 23 lessons and the first capstone. This is the largest and most
important tier, starting with *Why React exists*, which needs a two-sided demo (the same feature
built with DOM manipulation and with React) to make its case honestly.
