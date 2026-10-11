import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";
import CertificatesSection from "@/components/certificates-section";
import ScrollLine from "@/components/scroll-line";
import SplitText from "@/components/split-text";

export const metadata: Metadata = { title: "About — Hafiz" };

const journey = [
  { year: "2018", title: "First production app", text: "Shipped my first client web app and got hooked on building things people actually use." },
  { year: "2020", title: "Went mobile", text: "Led my first React Native team and found my specialty: apps that feel native and never crash." },
  { year: "2023", title: "Independent", text: "Left full-time work to consult directly with founders who care about quality." },
  { year: "2026", title: "Today", text: "Building products for clients worldwide from Karachi, one well-scoped project at a time." },
];

const education = [
  { degree: "BS Computer Science", school: "NED University", years: "2014 — 2018", note: "Graduated with distinction" },
  { degree: "Certified Hifz Program", school: "Jamia Institute", years: "2008 — 2012", note: "Quranic scholarship foundation" },
];

// SVG icons (ui-ux-pro-max: no emoji as icons) — one stroke style site-wide
const interests = [
  { label: "Quranic scholarship", span: "md:col-span-2", icon: "M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" },
  { label: "Travel — Morocco next", span: "", icon: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" },
  { label: "Architecture", span: "", icon: "M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z" },
  { label: "Real-estate design", span: "md:col-span-2", icon: "M3 21V3l18 18zM7 17v-4l4 4zM3 8h2M3 13h2" },
  { label: "Reading", span: "md:col-span-2", icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" },
];

const facts = [
  { k: "based", v: "Karachi, Pakistan" },
  { k: "focus", v: "Mobile & web" },
  { k: "shipping since", v: "2018" },
  { k: "works with", v: "Founders & product teams" },
];

export default function About() {
  return (
    <>
      {/* Intro — fact sheet slides in from the left, statement focuses in word by word */}
      <section className="container-site page-top grid gap-10 pb-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div data-enter="left" style={{ "--d": 100 } as React.CSSProperties} className="lg:sticky lg:top-28">
            <div className="card ring-gradient overflow-hidden rounded-[24px]">
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-line lg:aspect-[5/4]">
                <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-primary/25 blur-[70px]" aria-hidden="true" />
                <span className="relative font-[family-name:var(--font-space)] text-[88px] font-semibold leading-none text-primary md:text-[112px]">
                  H.
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-px bg-line">
                {facts.map((f) => (
                  <div key={f.k} className="bg-surface p-4">
                    <dt className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">{f.k}</dt>
                    <dd className="mt-1 text-sm">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <p data-enter="rise" className="eyebrow">{"// about"}</p>
          <h1 className="h-display mt-4 text-[38px] md:text-[56px]">
            <SplitText text="Expensive, but the work is worth it." enter="blur" step={70} delay={150} accent={["worth"]} />
          </h1>
          <p data-enter="rise" style={{ "--d": 650 } as React.CSSProperties} className="mt-8 max-w-[62ch] text-lg leading-relaxed md:text-xl">
            I say that openly because it&apos;s the honest version of what every client discovers anyway:
            cheap software costs more. I&apos;ve spent eight years learning exactly where products break —
            and building them so they don&apos;t.
          </p>
          <Reveal variant="fade" stagger each={0.08} start="top 95%">
            <p className="mt-6 max-w-[64ch] leading-relaxed text-muted">
              My path started in Karachi, building web apps for local businesses. Mobile pulled me in
              when I realized the apps people rely on daily are the ones held to the highest standard —
              a crash isn&apos;t a bug report, it&apos;s a deleted app.
            </p>
            <p className="mt-5 max-w-[64ch] leading-relaxed text-muted">
              I love problems with constraints: offline-first sync, cold-start budgets, legacy code that
              can&apos;t stop serving users while it&apos;s being replaced. I work directly with founders and
              product teams, communicate in outcomes, and give estimates I actually hit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Career journey — centre rail fills as you scroll; milestones alternate sides */}
      <section className="container-site section">
        <SectionHeader eyebrow="journey" title="How I got here" center />
        <ol className="relative mx-auto mt-10 max-w-[920px]">
          <ScrollLine className="bottom-3 left-[5px] top-3 w-px md:left-1/2 md:-translate-x-1/2" />
          {journey.map((j, i) => {
            const right = i % 2 === 1;
            return (
              <li key={j.year} className="relative grid pb-10 pl-9 last:pb-0 md:grid-cols-2 md:gap-14 md:pl-0">
                <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-background md:left-1/2 md:-translate-x-1/2" />
                <Reveal
                  variant={right ? "slide-right" : "slide-left"}
                  start="top 82%"
                  className={right ? "md:col-start-2" : "md:text-right"}
                >
                  <p className="font-[family-name:var(--font-space)] text-3xl font-semibold tracking-tight text-fg/45 md:text-4xl">{j.year}</p>
                  <h3 className="mt-1 font-[family-name:var(--font-space)] text-lg font-medium">{j.title}</h3>
                  <p className={`mt-1 max-w-[42ch] text-muted ${right ? "" : "md:ml-auto"}`}>{j.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Education — ledger rows with an oversized date column */}
      <section className="container-site section">
        <SectionHeader eyebrow="education" title="Education" motion="fade" />
        <Reveal variant="clip-left" stagger each={0.08} className="mt-10 flex flex-col">
          {education.map((e) => (
            <div key={e.degree} className="grid gap-2 border-t border-line py-6 last:border-b md:grid-cols-12 md:items-baseline md:gap-6">
              <p className="font-[family-name:var(--font-jetbrains)] text-sm text-accent md:col-span-3">{e.years}</p>
              <h3 className="font-[family-name:var(--font-space)] text-xl font-medium md:col-span-5">{e.degree}</h3>
              <p className="text-muted md:col-span-4">
                {e.school} <span className="text-fg/30">·</span> <span className="text-sm">{e.note}</span>
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Certifications */}
      <CertificatesSection />

      {/* Interests — bento that springs in from the edges */}
      <section className="container-site section">
        <SectionHeader eyebrow="interests" title="Beyond the keyboard" motion="blur" />
        <Reveal variant="scale" stagger from="edges" className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {interests.map((i) => (
            <div key={i.label} className={`card spotlight group flex items-center gap-4 p-5 md:p-6 ${i.span}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-line bg-background text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={i.icon} />
                </svg>
              </span>
              <span className="font-[family-name:var(--font-space)] font-medium">{i.label}</span>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
