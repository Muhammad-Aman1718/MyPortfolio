import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";
import PageHero from "@/components/page-hero";
import Portrait from "@/components/portrait";
import CtaPanel from "@/components/cta-panel";
import { ArrowIcon } from "@/components/icons";
import { experienceByCompany, stats } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About",
  description:
    "Muhammad Aman is a mobile app developer from Faisalabad, Pakistan, building iOS and Android apps with React Native, Swift and Kotlin.",
  path: "/about",
});

const facts = [
  { k: "Based in", v: `${site.location.city}, ${site.location.country}` },
  { k: "Focus", v: "iOS & Android apps" },
  { k: "Currently", v: "Mobile App Developer at SIGMAKODE" },
  { k: "Building since", v: "2024" },
];

// One stroke style site-wide (ui-ux-pro-max: no emoji as icons)
const beyond = [
  {
    title: "Writing",
    text: "I share research-based notes on what I build on Hashnode and Medium.",
    icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  },
  {
    title: "Open source",
    text: "Contributing back and building free apps and tools in my spare time.",
    icon: "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  },
  {
    title: "Machine learning & AI",
    text: "Currently diving into ML and AI to widen the problems I can solve.",
    icon: "M12 2a4 4 0 0 1 4 4v1a3 3 0 0 1 3 3v1a3 3 0 0 1-1 5.2V18a4 4 0 0 1-6 3.5A4 4 0 0 1 6 18v-1.8A3 3 0 0 1 5 11v-1a3 3 0 0 1 3-3V6a4 4 0 0 1 4-4zM12 2v19.5",
  },
  {
    title: "New frameworks",
    text: "Experimenting with new tools before they reach client work.",
    icon: "M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
];

export default function About() {
  // Oldest first reads as a story
  const journey = [...experienceByCompany].reverse();

  return (
    <>
      <PageHero
        eyebrow="About me"
        title="I build apps people keep."
        highlight={["keep."]}
        description="Mobile app developer focused on fast, reliable iOS and Android apps — turning complex requirements into apps that feel simple in the hand."
      />

      {/* Portrait + story */}
      <section className="container-site pb-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div data-enter="left" className="flex flex-col gap-3 lg:col-span-5">
            <div className="relative flex aspect-square items-end overflow-hidden rounded-[24px] p-7 sm:aspect-[4/3] lg:aspect-[4/5]">
              <Portrait className="!absolute inset-0" sizes="(min-width: 1024px) 40vw, 92vw" />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
              <p className="relative">
                <span className="block font-[family-name:var(--font-space)] text-2xl font-bold">{site.name}</span>
                <span className="text-sm text-white/80">{site.role}</span>
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {facts.map((f) => (
                <div key={f.k} className="rounded-[20px] bg-surface p-4">
                  <dt className="text-xs text-subtle">{f.k}</dt>
                  <dd className="mt-1 text-sm font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal variant="fade" stagger each={0.08} start="top 95%" className="rounded-[24px] bg-surface p-7 md:p-10">
              <p className="text-xl leading-relaxed md:text-2xl">
                I&apos;m {site.name}, a mobile app developer building iOS and Android apps with React Native.
              </p>
              <p className="mt-6 leading-relaxed text-muted">
                I care about the details users feel: a quick launch, smooth 60fps screens, offline that just works, and
                a release that sails through store review. From the first screen to the App Store and Google Play, my
                work is shaped by apps real people use every day.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                I started on the web with React and Next.js, and moved to mobile for good. Today I build React Native
                apps at SIGMAKODE in Faisalabad — and drop into Swift or Kotlin when a feature needs to go native.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Work with me {ArrowIcon}
                </Link>
                <Link href="/experience" className="btn-secondary">
                  See my experience
                </Link>
              </div>
            </Reveal>

            <Reveal variant="scale" stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-[20px] bg-surface p-5">
                  <p className="font-[family-name:var(--font-space)] text-[34px] font-bold leading-none tracking-tight">
                    {s.value}
                    {s.suffix}
                  </p>
                  <p className="mt-2 text-[13px] text-subtle">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey — oldest to newest; the current role is the crimson card */}
      <section className="container-site section">
        <SectionHeader eyebrow="Journey" title="How I got here." highlight={["here."]} />
        <Reveal as="ol" variant="fade-up" stagger each={0.08} className="mt-10 grid gap-3 md:grid-cols-3">
          {journey.map((c, i) => (
            <li
              key={c.company}
              className={`flex min-h-[200px] flex-col justify-between gap-8 rounded-[24px] p-6 ${
                c.current ? "bg-primary text-on-primary" : "bg-surface"
              }`}
            >
              <span className={`text-sm font-medium ${c.current ? "text-white" : "text-subtle"}`}>
                {String(i + 1).padStart(2, "0")} · {c.period}
              </span>
              <span>
                <span className="block font-[family-name:var(--font-space)] text-2xl font-bold leading-tight">{c.company}</span>
                {/* Roles at the same company listed beneath it, earliest first */}
                <span className="mt-3 flex flex-col gap-1.5">
                  {[...c.roles].reverse().map((r) => (
                    <span key={r.role} className={`flex flex-wrap justify-between gap-x-3 text-sm ${c.current ? "text-white" : "text-muted"}`}>
                      <span className="font-medium">{r.role}</span>
                      <span className={c.current ? "text-white" : "text-subtle"}>{r.years}</span>
                    </span>
                  ))}
                </span>
              </span>
            </li>
          ))}
        </Reveal>
      </section>

      {/* Beyond client work */}
      <section className="container-site section">
        <SectionHeader eyebrow="Beyond the code" title="What keeps me sharp." highlight={["sharp."]} motion="blur" />
        <Reveal variant="scale" stagger className="mt-10 grid gap-3 sm:grid-cols-2">
          {beyond.map((b) => (
            <div key={b.title} className="card spotlight flex gap-5 p-6 md:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-hi text-fg">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={b.icon} />
                </svg>
              </span>
              <span>
                <span className="block font-[family-name:var(--font-space)] text-lg font-bold">{b.title}</span>
                <span className="mt-1 block leading-relaxed text-muted">{b.text}</span>
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      <CtaPanel title="Let's collaborate on your next project." />
    </>
  );
}
