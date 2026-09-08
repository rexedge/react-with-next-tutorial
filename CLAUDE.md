# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this project is

A self-paced course that teaches React and Next.js to a student who has just finished HTML, CSS,
and JavaScript. The course content, the exercises, and the worked examples all live inside this one
Next.js app — there is no separate docs site or tutorial repo. Treat lesson material as product code:
it ships, so it has to build and lint clean.

Because the audience is a beginner, code here is read as much as it is run. Prefer the plain,
conventional form over the clever one, and keep examples self-contained enough to be understood
without jumping between five files.

## Commands

pnpm is the package manager (`packageManager` field + `pnpm-lock.yaml`). The README shows npm/yarn/bun
because it is unedited `create-next-app` boilerplate — use pnpm.

```bash
pnpm dev      # dev server (Turbopack, default in v16) on :3000
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # bare `eslint` — see note below
```

No test runner is installed. If tests are added, wire the script into `package.json` and record the
single-test invocation here.

## Stack notes that differ from older Next.js

This is **Next.js 16.3.4 / React 19.2** with the App Router. Several conventions changed in v16 and
older habits will produce broken code. Per `AGENTS.md`, read the relevant guide under
`node_modules/next/dist/docs/` before writing code. The ones that bite most often:

- **Request APIs are async.** `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()`
  all return Promises and must be awaited. This also applies to `params` in `icon`/`opengraph-image`
  and the `id` in `sitemap`.
- **Generated route types.** `LayoutProps<'/route'>`, `PageProps<'/route'>`, and `RouteContext` are
  globals emitted into `.next/dev/types` and `.next/types`, wired in via `tsconfig.json`. The root
  layout already uses `LayoutProps<"/">` instead of a hand-written `{ children: React.ReactNode }`.
  These types only exist after a `dev` or `build` run, so a clean checkout will show type errors
  until then.
- **`middleware.ts` is now `proxy.ts`.**
- **`next lint` was removed.** The `lint` script is bare `eslint`, driven by the flat config in
  `eslint.config.mjs` (ESLint 9). That config re-declares the ignore list because it overrides
  `eslint-config-next`'s defaults — extend that array rather than replacing it.
- **Turbopack is the default** for both dev and build; Turbopack config lives in `next.config.ts`.
- Caching is opt-in through Cache Components and the `use cache` directive family
  (`use cache`, `use cache: private`, `use cache: remote`), with `revalidateTag` / `updateTag` /
  `refresh`. Neither Cache Components nor PPR is enabled in `next.config.ts` yet.

## Styling

**Tailwind CSS v4**, configured CSS-first. There is no `tailwind.config.js` and adding one will not
be picked up — theme tokens are declared in the `@theme inline` block in `app/globals.css`, which
maps them onto the CSS custom properties defined on `:root`. PostCSS loads Tailwind through
`@tailwindcss/postcss`.

Fonts are Geist / Geist Mono via `next/font/google`, exposed as `--font-geist-sans` and
`--font-geist-mono` and bound to Tailwind's `--font-sans` / `--font-mono` in that same `@theme` block.

`@tailwindcss/typography` is loaded with the v4 `@plugin` directive (not a config file) and supplies
the `prose` classes that style lesson bodies. `globals.css` also carries the code-block styling, since
`rehype-pretty-code` emits dark-theme inline colours that must keep their own background in both
colour schemes.

## Course architecture

`content/curriculum.ts` is the spine and the single source of truth. Every lesson is declared there
exactly once; the sidebar, the roadmap, prev/next links, `generateStaticParams`, and progress all
derive from it, and lesson order is array order. Change the manifest, not the pages.

- **Lesson prose** is MDX in `content/lessons/<module>/<lesson>.mdx` — prose only, no frontmatter.
  Metadata lives in the manifest instead, which keeps it typed and avoids frontmatter plugins that
  Turbopack cannot accept (see below).
- **The route** `app/learn/[module]/[lesson]/page.tsx` resolves a slug through the manifest and
  dynamically imports the matching MDX by relative path. A lesson with `status: "published"` must
  have a matching file; `status: "planned"` renders a stub, so the whole roadmap is always visible.
- **Lesson chrome** — `Callout`, `Exercise`, `Solution`, `DemoLink` — is registered globally in
  `mdx-components.tsx`, so lessons use them without importing. `Solution` is a native `<details>`
  on purpose: no JavaScript, so lesson pages stay Server Components.
- **Demos** live in `components/demos/` and are registered in `content/demos.ts`, which maps a slug
  to a `load()` function so each demo code-splits into its own `/playground/<slug>` route rather
  than every demo shipping with every playground page. Demos are meant to be edited by the student
  in their editor, with HMR — not an in-browser sandbox. The `file` field is shown on the page, so
  it must stay accurate. Keep demos as Server Components unless the concept needs interactivity.
- **Progress** (`lib/progress.ts`) is per-browser `localStorage`, read through `useSyncExternalStore`
  so hydration stays correct via its server snapshot. Do not copy it into state inside an effect —
  the `react-hooks/set-state-in-effect` lint rule will reject it.

`app/learn/layout.tsx` narrows the manifest to a slim nav shape before passing it to the client
sidebar, so lesson summaries and objectives never reach the browser bundle. Keep that boundary.

## MDX

Wired through `@next/mdx` in `next.config.ts`. The important constraint: **Turbopack requires remark
and rehype plugins to be named as strings with serializable options** — imported plugin functions
cannot cross into Rust and will fail. Currently `remark-gfm`, `rehype-slug`, and `rehype-pretty-code`.

## Conventions

- TypeScript, `strict: true`. The `@/*` path alias maps to the repo root, so imports read
  `@/app/...`, `@/components/...` — there is no `src/` directory.
- Dark mode is `prefers-color-scheme` driven — CSS variables for the page ground, Tailwind `dark:`
  variants for component colours. There is no JS theme toggle, so do not add `dark` class logic
  without converting the whole approach.
- Because the audience is a beginner, prefer the plain conventional form over the clever one. Where
  the infrastructure has to be advanced (`useSyncExternalStore` in `lib/progress.ts`), comment why.

## AGENTS.md

`AGENTS.md` is generated and re-added by `next dev` (see
`node_modules/next/dist/server/lib/generate-agent-files.js`). Do not delete it to clean a diff — it
will come back. Commit it alongside your work.
