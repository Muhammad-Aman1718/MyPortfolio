import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import Reveal from "@/components/reveal";
import CountUp from "@/components/count-up";
import SectionHeader from "@/components/section-header";
import Marquee from "@/components/marquee";
import ProjectPreview from "@/components/project-preview";
import ServicesStack from "@/components/services-stack";
import FaqList from "@/components/faq-list";
import Carousel from "@/components/carousel";
import { Magnetic } from "@/components/pointer-fx";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { forward } from "@/components/route-transition";
import {
  stats,
  coreTools,
  toolLogo,
  companies,
  experienceByCompany,
  testimonials,
  allProjects,
  services,
  faqs,
} from "@/lib/data";
import { site } from "@/lib/site";

const enter = (name: string, d: number) => ({
  "data-enter": name,
  style: { "--d": d } as React.CSSProperties,
});

/** The stack row under the hero copy — logos from /public/logos (Simple Icons). */
const heroStack = [
  { name: "React Native", logo: "react" },
  { name: "Expo", logo: "expo" },
  { name: "Swift", logo: "swift" },
  { name: "Kotlin", logo: "kotlin" },
  { name: "TypeScript", logo: "typescript" },
  { name: "Firebase", logo: "firebase" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export default function Home() {
  const [featured, ...otherQuotes] = [
    ...testimonials.filter((t) => t.featured),
    ...testimonials.filter((t) => !t.featured),
  ];
  // Each half of the loop holds the set twice, so a half is always wider than the
  // container — the strip never shows an empty gap before the copy arrives
  const loop = [...otherQuotes, featured, ...otherQuotes, featured];

  return (
    <>
      {/* ─── Hero — content only, centred: badge, promise, intro, actions, stack ─── */}
      <section className="container-site flex flex-col items-center pb-14 pt-32 text-center md:pb-20 md:pt-40">
        <p
          {...enter("rise", 0)}
          className="inline-flex items-center gap-2.5 rounded-full bg-surface py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-muted"
        >
          <span className="flex gap-1" aria-hidden="true">
            {["apple", "android"].map((l) => (
              <span key={l} className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-hi">
                <Image src={`/logos/${l}.svg`} alt="" width={14} height={14} unoptimized className="h-3.5 w-3.5" />
              </span>
            ))}
          </span>
          {site.role} · iOS &amp; Android
        </p>

        <h1 className="h-display mt-7 max-w-[15ch] text-[44px] font-bold sm:text-[64px] lg:text-[84px]">
          <span className="sr-only">{site.name}, {site.role} — </span>
          <span className="mask-line">
            <span {...enter("mask", 120)}>I build mobile apps</span>
          </span>{" "}
          <span className="mask-line">
            <span {...enter("mask", 240)}>
              <em>people love to use.</em>
            </span>
          </span>
        </h1>

        <p {...enter("rise", 450)} className="mt-6 max-w-[54ch] leading-relaxed text-muted md:text-lg">
          Hi, I&apos;m {site.name}. I design and ship fast, reliable apps with React Native — and go native with
          Swift and Kotlin when a feature needs it.
        </p>

        <div {...enter("pop", 600)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Link href="/contact" className="btn-primary">
              Book a call with me
            </Link>
          </Magnetic>
          <a href="#work" className="btn-secondary">
            See my work
          </a>
        </div>

        <div {...enter("rise", 750)} className="mt-12 flex flex-col items-center gap-3">
          <span className="eyebrow">Built with</span>
          <ul className="flex flex-wrap justify-center gap-2">
            {heroStack.map((t) => (
              <li
                key={t.name}
                className="flex items-center gap-2 rounded-full bg-surface py-1.5 pl-1.5 pr-3.5 text-sm text-muted transition-colors duration-200 hover:bg-surface-hi hover:text-fg"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background">
                  <Image src={`/logos/${t.logo}.svg`} alt="" width={16} height={16} unoptimized className="h-4 w-4" />
                </span>
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Social proof — who the work shipped with ─── */}
      <section className="container-site" aria-label="Teams and tools">
        <div
          {...enter("fade", 900)}
          className="flex flex-col gap-5 rounded-[24px] bg-surface p-5 md:flex-row md:items-center md:gap-8 md:p-6"
        >
          <div className="shrink-0">
            <p className="eyebrow">Shipped with</p>
            <ul className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
              {companies.map((c) => (
                <li key={c} className="font-[family-name:var(--font-space)] text-lg font-bold tracking-tight text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 flex-1">
            <Marquee items={coreTools.map((name) => ({ name, logo: toolLogo(name) }))} label="Technologies I work with" />
          </div>
        </div>
      </section>

      {/* ─── Selected work — 2×2, the product visual does the talking ─── */}
      <section id="work" className="container-site section scroll-mt-24">
        <SectionHeader
          eyebrow="Latest projects"
          title="Selected work"
          highlight={["work"]}
          action={
            <Link href="/projects" className="arrow-link text-sm">
              All {allProjects.length} projects <ArrowUpRight />
            </Link>
          }
        />
        {/* Swipe carousel with arrows on phones and tablets, 2×2 grid on desktop */}
        <Reveal variant="fade-up" className="mt-8 md:mt-10">
          <Carousel label="Selected projects" desktopCols="lg:grid-cols-3">
            {allProjects.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                transitionTypes={forward}
                className="group flex w-[85%] shrink-0 snap-start flex-col gap-4 sm:w-[60%] lg:w-auto"
              >
                <ViewTransition name={`project-${p.slug}`} share={{ "nav-forward": "morph", default: "none" }} default="none">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface">
                    <ProjectPreview name={p.name} type={p.type} className="absolute inset-0" />
                  </div>
                </ViewTransition>
                <div className="flex items-start justify-between gap-4 px-1">
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-space)] text-xl font-bold tracking-tight">{p.name}</h3>
                    <p className="mt-1 text-sm text-subtle">
                      {p.type} · {p.role} · {p.year}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface px-4 py-2 text-sm font-medium transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                    View <ArrowUpRight />
                  </span>
                </div>
              </Link>
            ))}
          </Carousel>
        </Reveal>
      </section>

      {/* ─── One big quote ─── */}
      <section className="container-site section">
        <Reveal variant="blur" as="div" className="mx-auto max-w-[920px] text-center">
          <figure>
            <blockquote className="h-display text-[24px] font-bold sm:text-[30px] md:text-[40px]">
              <span className="text-primary">&ldquo;</span>
              {featured.quote}
              <span className="text-primary">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-8 inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-hi font-[family-name:var(--font-space)] text-sm font-bold">
                {initials(featured.name)}
              </span>
              <span className="text-left text-sm text-subtle">
                <span className="block font-medium text-fg">{featured.name}</span>
                {featured.role}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ─── Services — sticky intro + tools; cards stack, the top one goes primary ─── */}
      <section className="container-site section">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="Services"
                title="What I help you build…"
                highlight={["build…"]}
                description="Three ways to work together — each scoped up front, with a fixed price and weekly builds."
                motion="fade"
              />
              <p className="eyebrow mt-10">Tools I use</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {coreTools.map((t) => (
                  <li key={t} className="pill">
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="arrow-link mt-8 text-sm">
                Compare services {ArrowIcon}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ServicesStack services={services} />
          </div>
        </div>
      </section>

      {/* ─── About — the story and numbers beside the work history ─── */}
      <section className="container-site section">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="rounded-[24px] bg-surface p-7 md:p-9">
              <SectionHeader eyebrow="About me" title="Apps people keep using." highlight={["keep", "using."]} motion="blur" />
              <p className="mt-5 max-w-[60ch] leading-relaxed text-muted">
                I turn complex requirements into apps that feel simple in the hand — quick to launch, smooth to use
                and steady through store review. Today I build React Native apps at SIGMAKODE in Faisalabad.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/about" className="btn-secondary !h-11 text-sm">
                  More about me {ArrowIcon}
                </Link>
                <Link href="/experience" className="btn-secondary !h-11 text-sm">
                  Experience {ArrowIcon}
                </Link>
              </div>
            </div>

            <Reveal variant="scale" stagger className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-[20px] bg-surface p-5">
                  <CountUp
                    value={s.value}
                    suffix={s.suffix}
                    className="block font-[family-name:var(--font-space)] text-[34px] font-bold leading-none tracking-tight"
                  />
                  <p className="mt-2 text-[13px] text-subtle">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Work history — a short timeline: rail + node per company, roles as small rows */}
          <div className="flex flex-col rounded-[24px] bg-surface p-7 lg:col-span-5">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow">Work history</p>
              <span className="text-sm text-subtle">
                {experienceByCompany.reduce((n, c) => n + c.roles.length, 0)} roles
              </span>
            </div>
            <ol className="mt-6 flex flex-col">
              {experienceByCompany.map((c, i) => (
                <li key={c.company} className="relative pb-7 pl-8 last:pb-0">
                  {i < experienceByCompany.length - 1 && (
                    <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-5 w-px bg-line" />
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 ${
                      c.current ? "border-primary bg-background" : "border-line-strong bg-surface"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-[family-name:var(--font-space)] text-lg font-bold leading-none">{c.company}</p>
                    {c.current && (
                      <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">Current</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-subtle">
                    {c.period} · {c.location.split(",")[0]}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {c.roles.map((r) => (
                      <li
                        key={r.role}
                        className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 rounded-[12px] bg-surface-hi/60 px-3.5 py-2.5 text-sm"
                      >
                        <span className="font-medium">{r.role}</span>
                        <span className="text-xs text-subtle">{r.years}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <Link href="/experience" className="arrow-link mt-auto pt-7 text-sm">
              Full experience {ArrowIcon}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials — a seamless loop, kept to the content width ─── */}
      <section className="container-site section">
        <SectionHeader eyebrow="Testimonials" title="Hear it from my clients." highlight={["my", "clients."]} />
        <div className="marquee mt-10 overflow-hidden" role="region" aria-label="Client testimonials">
          {/* Twice the cards per half → slower duration keeps the reading speed the same */}
          <div className="marquee-track" style={{ animationDuration: "70s" }}>
            {[false, true].map((hidden) => (
              <ul key={String(hidden)} aria-hidden={hidden || undefined} className="flex shrink-0 items-stretch gap-4 pr-4">
                {loop.map((t, i) => (
                  <li key={`${t.name}-${i}`} className="flex w-[290px] flex-col justify-between gap-6 rounded-[20px] bg-surface p-6 sm:w-[340px]">
                    <div>
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="currentColor" aria-hidden="true">
                        <path d="M10 7H6a3 3 0 0 0-3 3v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3H6v-1a1 1 0 0 1 1-1h3zM21 7h-4a3 3 0 0 0-3 3v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3h-4v-1a1 1 0 0 1 1-1h3z" />
                      </svg>
                      <blockquote className="mt-4 text-[15px] leading-relaxed text-fg">{t.quote}</blockquote>
                    </div>
                    <p className="flex items-center gap-3 border-t border-line pt-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-hi font-[family-name:var(--font-space)] text-xs font-bold">
                        {initials(t.name)}
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block truncate text-sm font-semibold">{t.name}</span>
                        <span className="block truncate text-xs text-subtle">{t.role}</span>
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ beside a booking card ─── */}
      <section className="container-site section">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="FAQ" title="Questions, answered." highlight={["answered."]} motion="fade" />
            <div className="mt-8">
              <FaqList items={faqs} />
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal
              variant="clip-up"
              className="flex flex-col justify-between gap-8 rounded-[24px] bg-primary p-7 text-on-primary sm:p-8 md:p-10 lg:sticky lg:top-28 lg:min-h-[420px] lg:gap-10"
            >
              <span className="self-start rounded-full bg-black/15 px-3 py-1 text-xs font-medium">Free · 30 minutes</span>
              <div>
                <h3 className="h-display text-[38px] font-bold md:text-[46px]">Still not sure?</h3>
                <p className="mt-3 text-lg leading-relaxed">
                  Book a free discovery call. No pitch — just an honest answer on whether I&apos;m the right person for
                  the app you&apos;re building.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-background px-7 font-medium text-fg transition-colors duration-200 hover:bg-surface"
              >
                Book a free call {ArrowIcon}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
