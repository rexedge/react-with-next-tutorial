import { modules, tiers } from "@/content/curriculum";
import { Sidebar, type NavModule } from "@/components/learn/sidebar";

// Built here, on the server, so the client bundle carries only what navigation
// actually needs - not every lesson summary and objective list.
const navModules: NavModule[] = modules.map((module) => ({
  slug: module.slug,
  title: module.title,
  tier: module.tier,
  lessons: module.lessons.map((lesson) => ({
    slug: lesson.slug,
    title: lesson.title,
    href: `/learn/${module.slug}/${lesson.slug}`,
    status: lesson.status,
    isCapstone: lesson.kind === "capstone",
  })),
}));

const navTiers = tiers.map((tier) => ({ number: tier.number, title: tier.title }));

export default function LearnLayout({ children }: LayoutProps<"/learn">) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="md:h-[calc(100vh-0px)] md:w-72 md:shrink-0 md:sticky md:top-0">
        <Sidebar tiers={navTiers} modules={navModules} />
      </aside>
      <main className="min-w-0 flex-1 px-6 py-10 md:px-12">{children}</main>
    </div>
  );
}
