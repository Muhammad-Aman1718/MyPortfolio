import Reveal from "@/components/reveal";
import PageHero from "@/components/page-hero";
import CtaPanel from "@/components/cta-panel";
import { skillGroups } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Skills",
  description:
    "The tech stack of Muhammad Aman — React Native, Next.js, React, TypeScript, Node.js, MongoDB, PostgreSQL, Docker and more, across mobile, frontend, backend and DevOps.",
  path: "/skills",
});

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Skills & technologies"
        title="The stack I build with."
        highlight={["build", "with."]}
        description="Modern frameworks and tools for fast, scalable, reliable applications — with clean, maintainable code and interfaces that perform in the real world."
      />

      <div className="container-site pb-6">
        {/* Jump nav — pins under the navbar while browsing groups */}
        <nav
          aria-label="Skill groups"
          className="sticky top-[84px] z-30 -mx-1 flex gap-1.5 overflow-x-auto rounded-full bg-surface/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl [scrollbar-width:none]"
        >
          {skillGroups.map((g) => (
            <a
              key={g.name}
              href={`#${slug(g.name)}`}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:bg-surface-hi hover:text-fg"
            >
              {g.name}
            </a>
          ))}
          <span className="ml-auto hidden shrink-0 items-center px-4 text-sm text-subtle sm:flex">{total} technologies</span>
        </nav>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {skillGroups.map((g, i) => {
            const lead = i === 0; // the specialty spans the full row and goes crimson
            return (
              <Reveal
                key={g.name}
                variant="fade-up"
                className={`scroll-mt-40 rounded-[24px] p-7 md:p-9 ${lead ? "bg-primary text-on-primary md:col-span-2" : "bg-surface"}`}
                id={slug(g.name)}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className={`text-sm font-medium ${lead ? "text-white" : "text-subtle"}`}>
                      {String(i + 1).padStart(2, "0")} · {g.items.length} tools{lead ? " · specialty" : ""}
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-space)] text-[28px] font-bold tracking-tight md:text-[34px]">{g.name}</h2>
                    <p className={`mt-2 max-w-[52ch] leading-relaxed ${lead ? "text-white" : "text-muted"}`}>{g.context}</p>
                  </div>
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${lead ? "bg-black/20" : "bg-surface-hi"}`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={g.icon} />
                    </svg>
                  </span>
                </div>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${lead ? "bg-black/20 text-white" : "bg-surface-hi text-fg"}`}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>

      <CtaPanel title="Have a stack in mind?" description="If your project uses these tools, let's talk about what you're building." />
    </>
  );
}
