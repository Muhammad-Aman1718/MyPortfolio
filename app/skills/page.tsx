import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import ScrollLine from "@/components/scroll-line";

export const metadata: Metadata = { title: "Skills — Hafiz" };

const categories = [
  {
    name: "Frontend",
    context: "Interfaces that are fast by default and accessible without an afterthought.",
    chips: [
      { name: "React", since: "2017", tier: "daily driver" },
      { name: "Next.js", since: "2019", tier: "daily driver" },
      { name: "TypeScript", since: "2018", tier: "daily driver" },
      { name: "Tailwind CSS", since: "2020", tier: "daily driver" },
      { name: "GSAP", since: "2021", tier: "production" },
    ],
  },
  {
    name: "Backend",
    context: "APIs designed around the product, not around the framework.",
    chips: [
      { name: "Node.js", since: "2017", tier: "daily driver" },
      { name: "NestJS", since: "2021", tier: "production" },
      { name: "tRPC", since: "2022", tier: "production" },
      { name: "GraphQL", since: "2020", tier: "production" },
    ],
  },
  {
    name: "Mobile",
    context:
      "My specialty. React Native apps that feel native, start fast, and survive offline. I've shipped fintech, e-commerce, and content apps to both stores — see the Quran Companion and FleetPulse case studies.",
    chips: [
      { name: "React Native", since: "2019", tier: "daily driver" },
      { name: "Expo", since: "2021", tier: "daily driver" },
      { name: "Reanimated", since: "2021", tier: "production" },
      { name: "Swift", since: "2022", tier: "familiar" },
      { name: "Kotlin", since: "2020", tier: "production" },
    ],
  },
  {
    name: "Database",
    context: "Schema design that anticipates the queries you'll need next year.",
    chips: [
      { name: "PostgreSQL", since: "2018", tier: "daily driver" },
      { name: "SQLite", since: "2019", tier: "daily driver" },
      { name: "Redis", since: "2020", tier: "production" },
      { name: "Prisma", since: "2021", tier: "daily driver" },
    ],
  },
  {
    name: "Cloud",
    context: "Enough infrastructure to ship reliably; never more than the product needs.",
    chips: [
      { name: "AWS", since: "2019", tier: "production" },
      { name: "Vercel", since: "2020", tier: "daily driver" },
      { name: "Docker", since: "2019", tier: "production" },
      { name: "GitHub Actions", since: "2020", tier: "daily driver" },
    ],
  },
  {
    name: "Tools",
    context: "The supporting cast that keeps quality measurable.",
    chips: [
      { name: "Git", since: "2016", tier: "daily driver" },
      { name: "Figma", since: "2020", tier: "production" },
      { name: "Sentry", since: "2020", tier: "production" },
      { name: "Linear", since: "2022", tier: "daily driver" },
    ],
  },
];

const languages = [
  { name: "Urdu", level: "native" },
  { name: "English", level: "fluent" },
  { name: "German", level: "working" },
  { name: "Arabic", level: "reading" },
];

const tierLevel: Record<string, number> = { "daily driver": 3, production: 2, familiar: 1 };

/** Categorical tier marker — three dots, filled by how often the tool is in use. */
function Tier({ tier }: { tier: string }) {
  const n = tierLevel[tier] ?? 1;
  return (
    <span className="flex gap-1" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span key={i} className={`h-1.5 w-1.5 rounded-full ${i <= n ? "bg-accent" : "bg-fg/15"}`} />
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <div className="container-site page-top pb-16">
      <header className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p data-enter="rise" className="eyebrow">{"// skills"}</p>
          <h1 data-enter="wipe" style={{ "--d": 120 } as React.CSSProperties} className="h-display mt-4 text-[44px] md:text-[72px]">
            The toolbox
          </h1>
        </div>
        <p data-enter="rise" style={{ "--d": 450 } as React.CSSProperties} className="max-w-[52ch] text-muted md:col-span-5">
          Tools are chosen per problem, not per fashion. No percentage bars — grouping and context
          say more than a number ever could.
        </p>
      </header>

      {/* Jump nav + legend — sticks under the navbar while browsing categories */}
      <div className="sticky top-[76px] z-30 -mx-5 mt-8 border-y border-line/70 bg-background/85 px-5 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-full lg:border lg:px-4">
        <div className="flex items-center gap-4">
          <nav aria-label="Skill categories" className="-my-1 flex flex-1 gap-1.5 overflow-x-auto py-1 [scrollbar-width:none]">
            {[...categories.map((c) => c.name), "Languages"].map((name, i) => (
              <a
                key={name}
                href={`#${name.toLowerCase()}`}
                data-enter="pop"
                style={{ "--d": 500 + i * 50 } as React.CSSProperties}
                className="shrink-0 rounded-full border border-line px-3 py-1 font-[family-name:var(--font-jetbrains)] text-xs text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg"
              >
                {name}
              </a>
            ))}
          </nav>
          <p className="hidden shrink-0 items-center gap-4 font-[family-name:var(--font-jetbrains)] text-[11px] text-muted md:flex">
            <span className="flex items-center gap-2"><Tier tier="daily driver" /> daily</span>
            <span className="flex items-center gap-2"><Tier tier="production" /> production</span>
            <span className="flex items-center gap-2"><Tier tier="familiar" /> familiar</span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        {categories.map((c, ci) => {
          const specialty = c.name === "Mobile";
          return (
            <section
              key={c.name}
              id={c.name.toLowerCase()}
              className="relative grid scroll-mt-36 gap-6 py-10 md:grid-cols-12 md:gap-10"
            >
              <ScrollLine axis="x" scrub={false} className="left-0 right-0 top-0 h-px" />
              <Reveal variant="slide-left" className="md:col-span-4">
                <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                  {String(ci + 1).padStart(2, "0")} / {c.chips.length} tools
                </p>
                <h2 className="mt-2 flex items-center gap-3 font-[family-name:var(--font-space)] text-2xl font-semibold tracking-tight md:text-[28px]">
                  {c.name}
                  {specialty && <span className="pill !text-[11px]">specialty</span>}
                </h2>
                <p className={`mt-3 max-w-[48ch] text-sm leading-relaxed ${specialty ? "text-fg/85" : "text-muted"}`}>
                  {c.context}
                </p>
              </Reveal>
              <Reveal
                variant="scale"
                stagger
                each={0.05}
                delay={0.15}
                className="grid grid-cols-2 content-start gap-2 sm:gap-2.5 md:col-span-8 lg:grid-cols-3"
              >
                {c.chips.map((chip) => (
                  <div
                    key={chip.name}
                    className={`card spotlight group flex items-start justify-between gap-2 p-3.5 transition-colors duration-200 hover:border-accent/40 sm:items-center sm:gap-3 sm:p-4 ${
                      specialty ? "border-accent/25" : ""
                    }`}
                  >
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="font-medium">{chip.name}</span>
                      <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-muted">
                        since {chip.since}
                        <span className="hidden sm:inline"> · </span>
                        <span className="block sm:inline">{chip.tier}</span>
                      </span>
                    </span>
                    <span className="pt-1.5 sm:pt-0">
                      <Tier tier={chip.tier} />
                    </span>
                  </div>
                ))}
              </Reveal>
            </section>
          );
        })}

        <section id="languages" className="relative grid scroll-mt-36 gap-6 py-10 md:grid-cols-12 md:gap-10">
          <ScrollLine axis="x" scrub={false} className="left-0 right-0 top-0 h-px" />
          <Reveal variant="slide-left" className="md:col-span-4">
            <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">
              {String(categories.length + 1).padStart(2, "0")} / spoken
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space)] text-2xl font-semibold tracking-tight md:text-[28px]">
              Languages
            </h2>
          </Reveal>
          <Reveal variant="slide-right" stagger each={0.08} className="flex flex-wrap content-start gap-2.5 md:col-span-8">
            {languages.map((l) => (
              <span key={l.name} className="pill !px-4 !py-2 !text-[13px]">
                {l.name} — {l.level}
              </span>
            ))}
          </Reveal>
        </section>
      </div>
    </div>
  );
}
