import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";
import CertificatesSection from "@/components/certificates-section";

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

const interests = [
  { label: "Quranic scholarship", icon: "📖", span: "md:col-span-2" },
  { label: "Travel — Morocco next", icon: "🌍", span: "" },
  { label: "Architecture", icon: "🏛", span: "" },
  { label: "Real-estate design", icon: "📐", span: "" },
  { label: "Reading", icon: "📚", span: "md:col-span-2" },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Intro */}
      <section className="mx-auto grid max-w-[1200px] gap-12 px-6 py-24 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="card sticky top-24 flex aspect-[4/5] items-center justify-center rounded-[24px] p-8">
              <span className="font-[family-name:var(--font-space)] text-[96px] font-semibold text-primary">H.</span>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal stagger>
            <p className="eyebrow">{"// about"}</p>
            <h1 className="mt-3 font-[family-name:var(--font-space)] text-[32px] font-semibold leading-[1.15] md:text-[48px]">
              Expensive, but the work is worth it.
            </h1>
            <p className="mt-8 max-w-[68ch] text-lg leading-relaxed">
              I say that openly because it&apos;s the honest version of what every client discovers anyway:
              cheap software costs more. I&apos;ve spent eight years learning exactly where products break —
              and building them so they don&apos;t.
            </p>
            <p className="mt-6 max-w-[68ch] leading-relaxed text-muted">
              My path started in Karachi, building web apps for local businesses. Mobile pulled me in
              when I realized the apps people rely on daily are the ones held to the highest standard —
              a crash isn&apos;t a bug report, it&apos;s a deleted app.
            </p>
            <p className="mt-6 max-w-[68ch] leading-relaxed text-muted">
              I love problems with constraints: offline-first sync, cold-start budgets, legacy code that
              can&apos;t stop serving users while it&apos;s being replaced. I work directly with founders and
              product teams, communicate in outcomes, and give estimates I actually hit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Career journey — vertical timeline */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
        <SectionHeader eyebrow="journey" title="How I got here" />
        <div className="mt-12 border-l-2 border-line pl-8">
          {journey.map((j) => (
            <Reveal key={j.year} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[39px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">{j.year}</p>
              <h3 className="mt-1 font-[family-name:var(--font-space)] text-lg font-medium">{j.title}</h3>
              <p className="mt-1 max-w-[60ch] text-muted">{j.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
        <SectionHeader eyebrow="education" title="Education" />
        <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {education.map((e) => (
            <div key={e.degree} className="card p-8">
              <h3 className="font-[family-name:var(--font-space)] text-lg font-medium">{e.degree}</h3>
              <p className="mt-1 text-muted">{e.school}</p>
              <p className="mt-3 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">{e.years}</p>
              <p className="mt-2 text-sm text-muted">{e.note}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Certifications */}
      <CertificatesSection />

      {/* Interests — bento */}
      <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-12">
        <SectionHeader eyebrow="interests" title="Beyond the keyboard" />
        <Reveal stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {interests.map((i) => (
            <div key={i.label} className={`card flex items-center gap-3 p-6 ${i.span}`}>
              <span className="text-2xl" aria-hidden>{i.icon}</span>
              <span className="font-[family-name:var(--font-space)] font-medium">{i.label}</span>
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
