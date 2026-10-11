import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";
import ScrollLine from "@/components/scroll-line";
import SplitText from "@/components/split-text";
import CtaPanel from "@/components/cta-panel";
import { ArrowIcon } from "@/components/icons";
import { services } from "@/lib/data";

export const metadata: Metadata = { title: "Services — Hafiz" };

const steps = [
  { n: "01", title: "Discover", text: "A call to understand the problem, constraints, and what success means." },
  { n: "02", title: "Design", text: "Scope, architecture, and a fixed estimate you can hold me to." },
  { n: "03", title: "Build", text: "Weekly demos, honest progress reports, production-quality code." },
  { n: "04", title: "Support", text: "Launch help and a support window included in every engagement." },
];

const CheckIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Services() {
  return (
    <>
      <div className="container-site page-top">
        <p data-enter="rise" className="eyebrow">{"// services"}</p>
        <h1 className="h-display mt-4 max-w-[20ch] text-[38px] md:text-[60px]">
          <SplitText by="line" text={"Not the cheapest.\nThe one you call when it has to work."} enter="mask" step={160} delay={100} />
        </h1>

        {/* Engagements — cards flip up in sequence; the featured one carries a gradient edge */}
        <Reveal variant="tilt" stagger each={0.12} start="top 95%" className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {services.map((s) => (
            <div
              key={s.name}
              className={`card spotlight relative flex flex-col p-7 md:p-8 ${s.featured ? "ring-gradient bg-gradient-to-b from-secondary/60 to-surface" : ""}`}
            >
              {s.featured && <span className="pill absolute -top-3 left-7 z-[2] ring-4 ring-background">most engaged</span>}
              <h2 className="font-[family-name:var(--font-space)] text-xl font-semibold tracking-tight">{s.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
              <p className="mt-6 flex items-baseline gap-2 border-y border-line py-4">
                <span className="font-[family-name:var(--font-space)] text-3xl font-semibold tracking-tight text-fg">
                  {s.from.replace("from ", "")}
                </span>
                <span className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">starting · {s.engagement}</span>
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    {CheckIcon}
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href={`/contact?service=${encodeURIComponent(s.name)}`}
                  className={`${s.featured ? "btn-primary" : "btn-secondary"} w-full`}
                >
                  Discuss this {ArrowIcon}
                </Link>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Process — a connector draws across, then each step pops in along it */}
      <section className="container-site section mt-6">
        <SectionHeader eyebrow="process" title="How an engagement runs" motion="wipe" />
        <div className="relative mt-10">
          <ScrollLine axis="x" scrub={false} className="left-6 right-6 top-6 hidden h-px md:block" />
          <ScrollLine className="bottom-6 left-6 top-6 w-px md:hidden" />
          <Reveal as="ol" variant="scale" stagger each={0.18} delay={0.2} className="grid gap-8 md:grid-cols-4 md:gap-6">
            {steps.map((s) => (
              <li key={s.n} className="relative flex gap-5 md:flex-col md:gap-0">
                <span className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-background font-[family-name:var(--font-jetbrains)] text-sm text-accent shadow-[0_0_0_6px_var(--background)]">
                  {s.n}
                </span>
                <div className="md:mt-5">
                  <h3 className="font-[family-name:var(--font-space)] text-lg font-medium">{s.title}</h3>
                  <p className="mt-1.5 max-w-[32ch] text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaPanel email={false} />
    </>
  );
}
