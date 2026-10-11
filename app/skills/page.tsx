import type { Metadata } from "next";
import Reveal from "@/components/reveal";

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

export default function Skills() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12">
      <Reveal stagger>
        <p className="eyebrow">{"// skills"}</p>
        <h1 className="mt-3 font-[family-name:var(--font-space)] text-[32px] font-semibold md:text-[48px]">
          The toolbox
        </h1>
        <p className="mt-4 max-w-[60ch] text-muted">
          Tools are chosen per problem, not per fashion. No percentage bars — grouping and context
          say more than a number ever could.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col gap-20">
        {categories.map((c) => (
          <section key={c.name} id={c.name.toLowerCase()}>
            <Reveal>
              <h2 className="font-[family-name:var(--font-space)] text-2xl font-semibold">{c.name}</h2>
              <p className="mt-2 max-w-[68ch] text-muted">{c.context}</p>
            </Reveal>
            <Reveal stagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {c.chips.map((chip) => (
                <div key={chip.name} className="card flex flex-col gap-1 p-4">
                  <span className="font-medium">{chip.name}</span>
                  <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-muted">
                    since {chip.since} · {chip.tier}
                  </span>
                </div>
              ))}
            </Reveal>
          </section>
        ))}

        <section id="languages">
          <Reveal>
            <h2 className="font-[family-name:var(--font-space)] text-2xl font-semibold">Languages</h2>
          </Reveal>
          <Reveal stagger className="mt-6 flex flex-wrap gap-3">
            {languages.map((l) => (
              <span key={l.name} className="pill !text-[13px] !px-4 !py-2">
                {l.name} — {l.level}
              </span>
            ))}
          </Reveal>
        </section>
      </div>
    </div>
  );
}
