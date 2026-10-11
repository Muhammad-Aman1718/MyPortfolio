import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";
import { services } from "@/lib/data";

export const metadata: Metadata = { title: "Services — Hafiz" };

const steps = [
  { n: "01", title: "Discover", text: "A call to understand the problem, constraints, and what success means." },
  { n: "02", title: "Design", text: "Scope, architecture, and a fixed estimate you can hold me to." },
  { n: "03", title: "Build", text: "Weekly demos, honest progress reports, production-quality code." },
  { n: "04", title: "Support", text: "Launch help and a support window included in every engagement." },
];

const CheckIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Services() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12">
      <Reveal stagger>
        <p className="eyebrow">{"// services"}</p>
        <h1 className="mt-3 font-[family-name:var(--font-space)] text-[32px] font-semibold md:text-[48px]">
          Not the cheapest. The one you call when it has to work.
        </h1>
      </Reveal>

      <Reveal stagger className="mt-16 grid gap-6 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.name}
            className={`card relative flex flex-col p-8 ${
              s.featured ? "border-2 !border-accent/60" : ""
            }`}
          >
            {s.featured && (
              <span className="pill absolute -top-3 left-8">most engaged</span>
            )}
            <h2 className="font-[family-name:var(--font-space)] text-xl font-semibold">{s.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {s.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  {CheckIcon}
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <p className="font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">
                {s.engagement} · <span className="text-accent">{s.from}</span>
              </p>
              <Link
                href={`/contact?service=${encodeURIComponent(s.name)}`}
                className="btn-secondary mt-4 w-full"
              >
                Discuss this
              </Link>
            </div>
          </div>
        ))}
      </Reveal>

      <section className="mt-32">
        <SectionHeader eyebrow="process" title="How an engagement runs" center />
        <Reveal stagger className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-line font-[family-name:var(--font-jetbrains)] text-sm text-accent">
                {s.n}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-space)] font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <Reveal className="mt-32 rounded-[16px] bg-secondary/40 p-12 text-center">
        <h2 className="font-[family-name:var(--font-space)] text-[28px] font-semibold md:text-[36px]">
          Have a project in mind?
        </h2>
        <Link href="/contact" className="btn-primary mt-6">Start a conversation</Link>
      </Reveal>
    </div>
  );
}
