import Link from "next/link";
import { ViewTransition } from "react";
import Reveal from "@/components/reveal";
import CountUp from "@/components/count-up";
import SectionHeader from "@/components/section-header";
import CertificatesSection from "@/components/certificates-section";
import CtaPanel from "@/components/cta-panel";
import Marquee from "@/components/marquee";
import ScrollLine from "@/components/scroll-line";
import ProjectPreview from "@/components/project-preview";
import { Magnetic, Tilt } from "@/components/pointer-fx";
import { ArrowIcon, ArrowUpRight, DownloadIcon } from "@/components/icons";
import { forward } from "@/components/route-transition";
import { blogPosts } from "@/lib/content/posts";
import {
  stats,
  featuredProjects,
  skillsBento,
  experience,
  testimonials,
  allProjects,
} from "@/lib/data";

const enter = (name: string, d: number) => ({ "data-enter": name, style: { "--d": d } as React.CSSProperties });

/** Syntax-tinted profile card for the hero — each line types in after the last. */
const codeLines: React.ReactNode[] = [
  <><span className="text-accent">const</span> hafiz = {"{"}</>,
  <>  role: <span className="text-fg">&quot;Software Engineer&quot;</span>,</>,
  <>  focus: [<span className="text-fg">&quot;mobile&quot;</span>, <span className="text-fg">&quot;web&quot;</span>],</>,
  <>  experience: <span className="text-fg">&quot;8+ years&quot;</span>,</>,
  <>  based: <span className="text-fg">&quot;Karachi, PK&quot;</span>,</>,
  <>  available: <span className="text-accent">true</span>,</>,
  <>{"};"}</>,
];

const tools = Array.from(new Set(skillsBento.flatMap((s) => s.items)));

export default function Home() {
  const [featured, ...otherQuotes] = [
    ...testimonials.filter((t) => t.featured),
    ...testimonials.filter((t) => !t.featured),
  ];

  return (
    <>
      {/* ─── Hero — CSS-orchestrated: badge → eyebrow wipe → masked lines → copy → CTAs, code card types in ─── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="hero-glow left-[-8%] top-[8%] h-[420px] w-[420px]" />
        <div className="hero-glow bottom-[0%] right-[2%] h-[360px] w-[360px] [animation-delay:-7s]" />

        <div className="container-site relative grid items-center gap-12 pb-14 pt-32 md:pt-36 lg:grid-cols-12 lg:pb-20 lg:pt-40">
          <div className="lg:col-span-7">
            <p
              {...enter("rise", 0)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-[family-name:var(--font-jetbrains)] text-xs text-muted"
            >
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-primary" />
              Karachi, Pakistan — available for projects
            </p>
            <p {...enter("rise", 100)} className="eyebrow mt-6">
              {"// software engineer — mobile & web"}
            </p>
            <h1 className="h-display mt-4 text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px]">
              <span className="mask-line">
                <span {...enter("mask", 250)}>I build products</span>
              </span>
              <br />
              <span className="mask-line">
                <span {...enter("mask", 380)}>
                  people rely on<span className="text-primary">.</span>
                </span>
              </span>
            </h1>
            <p {...enter("rise", 650)} className="mt-6 max-w-[50ch] text-lg leading-relaxed text-muted">
              Eight years shipping mobile and web software that survives real
              users. Not the cheapest — the one you call when it has to work.
            </p>
            <div {...enter("pop", 800)} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link href="/projects" className="btn-primary">
                  View projects {ArrowIcon}
                </Link>
              </Magnetic>
              <a href="/hafiz-resume.pdf" download className="btn-secondary">
                Download resume {DownloadIcon}
              </a>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div {...enter("card", 400)}>
              <Tilt className="card ring-gradient overflow-hidden rounded-[20px] shadow-[0_40px_80px_-30px_rgba(234,0,68,0.35)]">
                <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                  <span className="ml-3 font-[family-name:var(--font-jetbrains)] text-xs text-muted">hafiz.ts</span>
                </div>
                <pre className="overflow-hidden px-5 py-5 font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.9] text-muted">
                  {codeLines.map((line, i) => (
                    <span key={i} className="flex">
                      <span className="mr-5 w-4 select-none text-right text-fg/20" aria-hidden="true">{i + 1}</span>
                      <span {...enter("wipe", 900 + i * 140)} className="whitespace-pre">
                        {line}
                      </span>
                    </span>
                  ))}
                </pre>
                <div className="flex items-center justify-between border-t border-line bg-background/40 px-5 py-4">
                  <span className="font-[family-name:var(--font-space)] text-3xl font-semibold leading-none text-primary">H.</span>
                  <span className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    compiled · 0 errors
                  </span>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tool ticker ─── */}
      <div {...enter("fade", 1100)} className="border-y border-line/70 bg-surface/30 py-4">
        <Marquee items={tools} label="Technologies I work with" />
      </div>

      {/* ─── Trust stats — quiet rise; the count-up is the motion here ─── */}
      <section className="container-site section">
        <Reveal variant="fade-up" stagger className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`card overflow-hidden p-5 md:p-6 ${
                s.large ? "col-span-2 row-span-2 flex flex-col justify-end md:p-8" : ""
              }`}
            >
              {s.large && (
                <>
                  <div className="bg-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-[70px]" aria-hidden="true" />
                </>
              )}
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className={`relative block font-[family-name:var(--font-space)] font-semibold tracking-tight text-primary ${
                  s.large ? "text-[72px] leading-none md:text-[104px]" : "text-[34px] md:text-[40px]"
                }`}
              />
              <p className="relative mt-2 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ─── Featured projects — bento: 2×2 flagship, 2×1 wide, 1×1 + "all work" tile; tiles pop in as a wave from the centre ─── */}
      <section className="container-site section">
        <SectionHeader
          eyebrow="projects"
          title="Selected work"
          description="Three projects that show how I think, build, and ship."
        />
        <Reveal
          variant="scale"
          stagger
          grid
          from="center"
          className="mt-10 grid gap-3 sm:grid-cols-2 md:gap-4 lg:auto-rows-[212px] lg:grid-cols-4"
        >
          {featuredProjects.map((p, i) => {
            const meta = (
              <p className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px w-5 bg-line" aria-hidden="true" />
                {p.type} · {p.year}
              </p>
            );
            const tags = (n: number) => (
              <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                {p.tags.slice(0, n).map((t) => (
                  <li key={t} className="pill">{t}</li>
                ))}
              </ul>
            );

            // 2×2 flagship — story bottom-left, phone standing in the right half
            if (i === 0)
              return (
                <Link
                  key={p.name}
                  href={p.href}
                  transitionTypes={forward}
                  className="card card-hover group relative flex flex-col overflow-hidden sm:col-span-2 sm:min-h-[380px] lg:row-span-2 lg:min-h-0"
                >
                  <ViewTransition name={`project-${p.slug}`} share={{ "nav-forward": "morph", default: "none" }} default="none">
                    <div className="relative h-52 sm:absolute sm:inset-y-0 sm:right-0 sm:h-auto sm:w-[48%] sm:[mask-image:linear-gradient(90deg,transparent,#000_22%)]">
                      <ProjectPreview name={p.name} type={p.type} tone={p.tone} className="relative h-full w-full" />
                    </div>
                  </ViewTransition>
                  <span className="pill absolute left-5 top-5">flagship</span>
                  <div className="relative mt-auto flex flex-col gap-3 p-6 sm:w-[58%] md:p-7">
                    {meta}
                    <h3 className="font-[family-name:var(--font-space)] text-2xl font-semibold tracking-tight md:text-[30px]">{p.name}</h3>
                    <p className="text-muted">{p.tagline}</p>
                    {tags(4)}
                    <span className="arrow-link mt-1 text-sm">Read case study {ArrowIcon}</span>
                  </div>
                </Link>
              );

            // 2×1 wide — mirrors the flagship: product bleeds off the left edge, copy right
            if (i === 1)
              return (
                <Link
                  key={p.name}
                  href={p.href}
                  transitionTypes={forward}
                  className="card card-hover group relative flex flex-col overflow-hidden sm:col-span-2 sm:min-h-[230px] lg:min-h-0"
                >
                  <ViewTransition name={`project-${p.slug}`} share={{ "nav-forward": "morph", default: "none" }} default="none">
                    <div className="relative h-36 sm:absolute sm:inset-y-0 sm:left-0 sm:h-auto sm:w-[54%] sm:[mask-image:linear-gradient(270deg,transparent,#000_28%)]">
                      <ProjectPreview name={p.name} type={p.type} tone={p.tone} className="relative h-full w-full" />
                    </div>
                  </ViewTransition>
                  <div className="relative flex flex-1 flex-col justify-center gap-2.5 p-6 sm:ml-auto sm:w-[50%]">
                    {meta}
                    <h3 className="font-[family-name:var(--font-space)] text-xl font-semibold tracking-tight">{p.name}</h3>
                    <p className="text-sm text-muted">{p.tagline}</p>
                    {tags(2)}
                  </div>
                </Link>
              );

            // 1×1 — compact tile: tone wash + oversized ghost index
            return (
              <Link
                key={p.name}
                href={p.href}
                transitionTypes={forward}
                className={`card card-hover group relative flex min-h-[180px] flex-col justify-between overflow-hidden bg-gradient-to-br ${p.tone} to-surface p-6 lg:min-h-0`}
              >
                <span
                  className="pointer-events-none absolute -bottom-6 -right-2 select-none font-[family-name:var(--font-space)] text-[120px] font-semibold leading-none tracking-tighter text-fg/[0.04] transition-transform duration-500 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative flex items-start justify-between gap-3">
                  {meta}
                  <span className="text-muted transition-colors duration-200 group-hover:text-accent">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-[family-name:var(--font-space)] text-lg font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                </div>
              </Link>
            );
          })}

          {/* 1×1 — entry point to the full archive */}
          <Link
            href="/projects"
            className="card card-hover ring-gradient group relative flex min-h-[150px] flex-col justify-between overflow-hidden bg-gradient-to-br from-secondary to-surface p-6 lg:min-h-0"
          >
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/25 blur-[60px]" aria-hidden="true" />
            <p className="relative font-[family-name:var(--font-jetbrains)] text-xs text-muted">archive</p>
            <div className="relative flex items-end justify-between gap-4">
              <p>
                <span className="block font-[family-name:var(--font-space)] text-5xl font-semibold leading-none tracking-tight text-primary">
                  {String(allProjects.length).padStart(2, "0")}
                </span>
                <span className="mt-2 block font-medium">All projects</span>
              </p>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-transform duration-300 group-hover:-rotate-45">
                {ArrowIcon}
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ─── Skills snapshot — bento with cursor spotlight ─── */}
      <section className="container-site section">
        <SectionHeader
          eyebrow="skills"
          title="What I work with"
          description="Tools are chosen per problem, not per fashion."
          motion="wipe"
          action={
            <Link href="/skills" className="arrow-link text-sm">
              Full toolbox {ArrowIcon}
            </Link>
          }
        />
        <Reveal variant="tilt" stagger each={0.06} className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
          {skillsBento.map((s) => (
            <Link key={s.name} href="/skills" className={`card card-hover spotlight group flex flex-col p-6 ${s.span}`}>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-background transition-colors duration-300 group-hover:border-accent/50">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={s.icon} />
                  </svg>
                </span>
                <span className="text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100">
                  <ArrowUpRight />
                </span>
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-space)] text-lg font-medium">{s.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <li key={it} className="pill-ghost !text-xs">{it}</li>
                ))}
              </ul>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ─── Experience — horizontal timeline that draws itself ─── */}
      <section className="container-site section">
        <SectionHeader
          eyebrow="experience"
          title="Recent roles"
          motion="fade"
          action={
            <Link href="/experience" className="arrow-link text-sm">
              Full experience {ArrowIcon}
            </Link>
          }
        />
        <div className="relative mt-10">
          <ScrollLine axis="x" scrub={false} className="left-0 right-0 top-[6px] hidden h-px md:block" />
          <ScrollLine axis="y" className="bottom-2 left-[6px] top-2 w-px md:hidden" />
          <Reveal variant="fade-up" stagger each={0.08} delay={0.3} className="grid gap-8 md:grid-cols-3 md:gap-6">
            {experience.map((e) => (
              <div key={e.company} className="relative pl-8 md:pl-0 md:pt-9">
                <span
                  className={`absolute left-0 top-0.5 h-[13px] w-[13px] rounded-full border-2 border-accent bg-background md:top-0 ${
                    e.current ? "pulse-dot !bg-primary" : ""
                  }`}
                />
                <p className="font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">{e.years}</p>
                <h3 className="mt-2 font-[family-name:var(--font-space)] text-lg font-medium">{e.role}</h3>
                <p className="mt-1 text-sm text-muted">{e.company}</p>
                <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-fg/80">{e.bullets[0]}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── Certifications ─── */}
      <CertificatesSection />

      {/* ─── Latest articles — sticky intro + editorial index that unrolls ─── */}
      <section className="container-site section">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionHeader
                eyebrow="writing"
                title="Latest articles"
                description="Notes from production — performance, architecture, and the business of software."
                motion="blur"
              />
              <Reveal variant="fade" delay={0.4} className="mt-6">
                <Link href="/posts" className="arrow-link text-sm">
                  All posts {ArrowIcon}
                </Link>
              </Reveal>
            </div>
          </div>
          <Reveal as="ol" variant="clip-up" stagger each={0.08} className="flex flex-col md:col-span-8">
            {blogPosts.slice(0, 3).map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/posts/${p.slug}`}
                  transitionTypes={forward}
                  className={`group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-line px-2 py-6 transition-colors duration-200 hover:bg-surface md:gap-6 md:px-4 ${
                    i === 0 ? "border-y" : "border-b"
                  }`}
                >
                  <span className="pt-1 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="pill">{p.category}</span>
                      <span className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                        {p.date} · {p.readingTime} read
                      </span>
                    </span>
                    <span className="mt-3 block font-[family-name:var(--font-space)] text-lg font-medium leading-snug transition-colors duration-200 group-hover:text-accent md:text-xl">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{p.excerpt}</span>
                  </span>
                  <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                    <ArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── Testimonials — one hero quote, the rest slide in beside it ─── */}
      <section className="container-site section">
        <SectionHeader eyebrow="testimonials" title="What clients say" />
        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <Reveal variant="blur" className="md:col-span-7">
            <figure className="card ring-gradient flex h-full flex-col justify-between overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/15 blur-[60px]" aria-hidden="true" />
              <span className="relative font-[family-name:var(--font-space)] text-[88px] leading-[0.6] text-primary" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="relative mt-6 font-[family-name:var(--font-space)] text-[22px] font-medium leading-snug tracking-tight md:text-[28px]">
                {featured.quote}
              </blockquote>
              <figcaption className="relative mt-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-[family-name:var(--font-space)] text-accent">
                  {featured.name[0]}
                </span>
                <span className="text-sm text-muted">
                  <span className="block text-fg">{featured.name}</span>
                  {featured.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal variant="slide-right" stagger each={0.08} delay={0.15} className="flex flex-col gap-4 md:col-span-5">
            {otherQuotes.map((t) => (
              <figure key={t.name} className="card p-6">
                <blockquote className="leading-relaxed text-fg/90">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-[family-name:var(--font-space)] text-xs text-accent">
                    {t.name[0]}
                  </span>
                  <span className="text-[13px] text-muted">
                    <span className="text-fg">{t.name}</span> · {t.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CtaPanel description="Tell me what you're building and I'll tell you honestly whether I'm the right person for it." />
    </>
  );
}
