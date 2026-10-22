import Reveal from "@/components/reveal";
import PageHero from "@/components/page-hero";
import SectionHeader from "@/components/section-header";
import SkillsExplorer from "@/components/skills-explorer";
import CtaPanel from "@/components/cta-panel";
import { coreTools, skillGroups, stats } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Skills",
  description:
    "The tech stack of Muhammad Aman — React Native, Next.js, React, TypeScript, Node.js, MongoDB, PostgreSQL, Docker and more, across mobile, frontend, backend and DevOps.",
  path: "/skills",
});

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
        <Reveal variant="fade-up">
          <SkillsExplorer groups={skillGroups} />
        </Reveal>
      </div>

      {/* Daily stack — the tools reached for most, set as big editorial type */}
      <section className="container-site section">
        <SectionHeader eyebrow="Daily stack" title="What I reach for first." highlight={["first."]} motion="fade" />
        <Reveal variant="fade" className="mt-8 rounded-[24px] bg-surface p-6 sm:p-9">
          <p className="font-[family-name:var(--font-space)] text-[26px] font-bold leading-[1.25] tracking-tight sm:text-[34px] lg:text-[42px]">
            {coreTools.map((t, i) => (
              <span key={t} className={i % 4 === 0 ? "text-fg" : "text-muted"}>
                {t}
                {i < coreTools.length - 1 && (
                  <span aria-hidden="true" className="mx-2 text-primary sm:mx-3">
                    /
                  </span>
                )}{" "}
              </span>
            ))}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[{ value: total, suffix: "", label: "technologies listed" }, ...stats.slice(0, 3)].map((s) => (
              <div key={s.label} className="rounded-[16px] bg-surface-hi p-4">
                <p className="font-[family-name:var(--font-space)] text-[28px] font-bold leading-none">
                  {s.value}
                  {s.suffix}
                </p>
                <p className="mt-1.5 text-[13px] text-subtle">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CtaPanel title="Have a stack in mind?" description="If your project uses these tools, let's talk about what you're building." />
    </>
  );
}
