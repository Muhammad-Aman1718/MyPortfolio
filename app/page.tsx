import Link from "next/link";
import { ViewTransition } from "react";
import Reveal from "@/components/reveal";
import CountUp from "@/components/count-up";
import SectionHeader from "@/components/section-header";
import Marquee from "@/components/marquee";
import ProjectPreview from "@/components/project-preview";
import ServicesStack from "@/components/services-stack";
import FaqList from "@/components/faq-list";
import Carousel from "@/components/carousel";
import { Magnetic, Tilt } from "@/components/pointer-fx";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { forward } from "@/components/route-transition";
import { stats, coreTools, companies, experienceByCompany, testimonials, allProjects, services, faqs } from "@/lib/data";
import { site } from "@/lib/site";

const enter = (name: string, d: number) => ({ "data-enter": name, style: { "--d": d } as React.CSSProperties });

/** Syntax-tinted profile card for the hero — each line types in after the last. */
const codeLines: React.ReactNode[] = [
  <><span className="text-primary">const</span> aman = {"{"}</>,
  <>  role: <span className="text-fg">&quot;Full-Stack Engineer&quot;</span>,</>,
  <>  focus: [<span className="text-fg">&quot;mobile&quot;</span>, <span className="text-fg">&quot;web&quot;</span>],</>,
  <>  now: <span className="text-fg">&quot;SIGMAKODE&quot;</span>,</>,
  <>  based: <span className="text-fg">&quot;Faisalabad, PK&quot;</span>,</>,
  <>  available: <span className="text-primary">true</span>,</>,
  <>{"};"}</>,
];

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("");

export default function Home() {
  const [featured, ...otherQuotes] = [
    ...testimonials.filter((t) => t.featured),
    ...testimonials.filter((t) => !t.featured),
  ];

  return (
    <>
      {/* ─── Hero — one idea, poster-sized: two words, the code card layered in front ─── */}
      <section className="relative overflow-hidden">
        <div className="container-site relative flex min-h-[100svh] flex-col pb-10 pt-28 md:pt-32">
          {/* Type is left-set so the short first word leaves room on its right for the card,
              which then overlaps only the tail of the second line */}
          <div className="relative flex flex-1 flex-col justify-center py-10">
            <h1 className="h-mega -ml-[0.04em] text-[22vw] md:text-[17vw] lg:text-[min(18.5vw,15rem)]">
              <span className="sr-only">{site.name}, {site.role} — software built to last.</span>
              <span aria-hidden="true" className="block" {...enter("rise", 100)}>
                Built
              </span>
              <span aria-hidden="true" className="block text-primary" {...enter("rise", 220)}>
                To last
              </span>
            </h1>

            <div className="relative mt-10 w-full max-w-[360px] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[340px] lg:-translate-y-[70%] lg:rotate-[4deg]">
              <div {...enter("card", 550)}>
                <Tilt className="card overflow-hidden !bg-[#1a1a1b] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)]">
                  <div className="flex items-center gap-1.5 bg-surface-hi/50 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="ml-3 font-[family-name:var(--font-jetbrains)] text-xs text-subtle">aman.ts</span>
                  </div>
                  <pre className="overflow-hidden px-5 py-5 font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.9] text-muted">
                    {codeLines.map((line, i) => (
                      <span key={i} className="flex">
                        <span className="mr-5 w-4 select-none text-right text-fg/20" aria-hidden="true">{i + 1}</span>
                        <span {...enter("wipe", 1000 + i * 140)} className="whitespace-pre">
                          {line}
                        </span>
                      </span>
                    ))}
                  </pre>
                </Tilt>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p {...enter("rise", 700)} className="max-w-[36ch] text-lg leading-relaxed text-muted">
              Full-stack &amp; React Native developer. I build scalable web applications and mobile apps that hold up in production.
            </p>
            <div {...enter("pop", 850)} className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link href="/contact" className="btn-primary">
                  Book a call with me
                </Link>
              </Magnetic>
              <a href="#work" className="btn-secondary">
                See my work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social proof — who trusts the work, before the first scroll ─── */}
      <section className="container-site" aria-label="Teams and tools">
        <div {...enter("fade", 1100)} className="flex flex-col gap-5 rounded-[24px] bg-surface p-5 md:flex-row md:items-center md:gap-8 md:p-6">
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
            <Marquee items={coreTools} label="Technologies I work with" />
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
          <Carousel label="Selected projects">
          {allProjects.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              transitionTypes={forward}
              className="group flex w-[85%] shrink-0 snap-start flex-col gap-4 sm:w-[60%] lg:w-auto lg:gap-5"
            >
              <ViewTransition name={`project-${p.slug}`} share={{ "nav-forward": "morph", default: "none" }} default="none">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface">
                  <ProjectPreview name={p.name} type={p.type} className="absolute inset-0" />
                </div>
              </ViewTransition>
              <div className="flex items-start justify-between gap-4 px-1">
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-space)] text-xl font-bold tracking-tight md:text-2xl">{p.name}</h3>
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

      {/* ─── Services — sticky intro + tools; cards stack, the top one goes crimson ─── */}
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
                  <li key={t} className="pill">{t}</li>
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

      {/* ─── About — the person, the numbers, the history ─── */}
      <section className="container-site section">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Portrait slot: monogram until a photo is added (swap for next/image) */}
          <Reveal variant="clip-up" className="@container relative flex aspect-[16/10] items-end sm:aspect-[16/9] lg:aspect-[4/5] overflow-hidden rounded-[24px] bg-surface p-7 lg:col-span-5">
            <span
              aria-hidden="true"
              className="h-mega pointer-events-none absolute inset-0 flex items-center justify-center pb-16 text-[44cqw]"
            >
              MA<span className="text-primary">.</span>
            </span>
            <p className="relative">
              <span className="block font-[family-name:var(--font-space)] text-2xl font-bold">{site.name}</span>
              <span className="text-sm text-muted">
                {site.role} · {site.location.city}, {site.location.countryCode}
              </span>
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="rounded-[24px] bg-surface p-7 md:p-9">
              <SectionHeader eyebrow="About me" title="Products built to scale." highlight={["scale."]} motion="blur" />
              <p className="mt-5 max-w-[60ch] leading-relaxed text-muted">
                I turn complex requirements into products that feel simple — full-stack web apps with Next.js and
                cross-platform mobile apps with React Native. Today I build mobile apps at SIGMAKODE in Faisalabad.
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
              {stats.slice(0, 4).map((s) => (
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

            <div className="rounded-[24px] bg-surface p-7">
              <p className="eyebrow">Work history</p>
              <ul className="mt-4 flex flex-col gap-5">
                {experienceByCompany.map((c) => (
                  <li key={c.company}>
                    <p className="flex items-center gap-2 font-[family-name:var(--font-space)] font-bold">
                      {c.current && <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />}
                      {c.company}
                    </p>
                    <ul className="mt-1.5 flex flex-col gap-1">
                      {c.roles.map((r) => (
                        <li key={r.role} className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
                          <span className="text-muted">{r.role}</span>
                          <span className="text-subtle">{r.years}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials — a slow-moving strip ─── */}
      <section className="section">
        <div className="container-site">
          <SectionHeader eyebrow="Testimonials" title="Hear it from my clients." highlight={["my", "clients."]} />
        </div>
        <div className="marquee mt-10 overflow-hidden" role="region" aria-label="Client testimonials">
          <div className="marquee-track">
            {[false, true].map((hidden) => (
              <ul key={String(hidden)} aria-hidden={hidden || undefined} className="flex shrink-0 items-stretch gap-3 pr-3 md:gap-4 md:pr-4">
                {[...otherQuotes, featured].map((t) => (
                  // Width follows the quote (capped), so short quotes make compact cards
                  <li
                    key={t.name}
                    className="flex w-max max-w-[270px] flex-col gap-5 rounded-[20px] bg-surface p-5 sm:max-w-[340px] md:p-6"
                  >
                    <span aria-hidden="true" className="font-[family-name:var(--font-space)] text-4xl font-bold leading-[0.6] text-primary">
                      &ldquo;
                    </span>
                    <p className="text-[15px] leading-relaxed text-fg">{t.quote}</p>
                    <p className="mt-auto flex items-center gap-3 rounded-full bg-surface-hi p-1.5 pr-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-[family-name:var(--font-space)] text-xs font-bold text-on-primary">
                        {initials(t.name)}
                      </span>
                      <span className="min-w-0 text-xs leading-tight text-subtle">
                        <span className="block truncate text-sm font-medium text-fg">{t.name}</span>
                        <span className="block truncate">{t.role}</span>
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ beside a crimson booking card ─── */}
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
              className="flex flex-col justify-between gap-8 rounded-[24px] bg-primary p-7 sm:p-8 lg:min-h-[420px] lg:gap-10 text-on-primary md:p-10 lg:sticky lg:top-28"
            >
              <span className="self-start rounded-full bg-black/15 px-3 py-1 text-xs font-medium">Free · 30 minutes</span>
              <div>
                <h3 className="h-display text-[38px] font-bold md:text-[46px]">Still not sure?</h3>
                <p className="mt-3 text-lg leading-relaxed">
                  Book a free discovery call. No pitch — just an honest answer on whether I&apos;m the right person for
                  what you&apos;re building.
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
