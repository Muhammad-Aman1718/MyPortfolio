import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Reveal from "@/components/reveal";
import CountUp from "@/components/count-up";
import SplitText from "@/components/split-text";
import Prose from "@/components/prose";
import Toc from "@/components/toc";
import CtaPanel from "@/components/cta-panel";
import ProjectPreview from "@/components/project-preview";
import { back, forward } from "@/components/route-transition";
import { ArrowIcon } from "@/components/icons";
import { getProject, projects } from "@/lib/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} — Case study`,
    alternates: { canonical: `/projects/${p.slug}` },
    description: p.summary,
    openGraph: { title: `${p.name} — case study`, description: p.summary, type: "article" },
  };
}

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const facts = [
    { k: "role", v: p.role },
    { k: "timeline", v: p.timeline },
    { k: "team", v: p.team },
    { k: "platform", v: p.platform },
  ];

  return (
    <>
      <article className="container-site page-top">
        <Link
          href="/projects"
          transitionTypes={back}
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
        >
          <span className="inline-block rotate-180 transition-transform duration-200 group-hover:-translate-x-1">{ArrowIcon}</span>
          All projects
        </Link>

        {/* Header — title rises line by line; facts arrive after it */}
        <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p data-enter="rise" className="flex flex-wrap items-center gap-3 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
              <span className="pill-ghost">{p.type}</span>
              <span>{p.year}</span>
              <span className="text-fg/30" aria-hidden="true">·</span>
              <span>case study</span>
            </p>
            <h1 className="h-display mt-5 text-[42px] md:text-[64px]">
              <SplitText text={p.name} enter="mask" step={70} delay={80} />
            </h1>
            <p data-enter="rise" style={d(380)} className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">
              {p.summary}
            </p>
          </div>
          <dl data-enter="rise" style={d(500)} className="card grid grid-cols-2 gap-px overflow-hidden bg-line lg:col-span-5">
            {facts.map((f) => (
              <div key={f.k} className="bg-surface p-4">
                <dt className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">{f.k}</dt>
                <dd className="mt-1 text-sm">{f.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Hero — the same preview the card showed, morphed into place on forward navigation */}
        <ViewTransition name={`project-${p.slug}`} share={{ "nav-forward": "morph", default: "none" }} default="none">
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[20px] border border-line sm:aspect-[16/9] lg:aspect-[21/9]">
            <ProjectPreview name={p.name} type={p.type} tone={p.tone} className="absolute inset-0" />
          </div>
        </ViewTransition>

        {/* Outcomes — numbers count up (tabular figures) as they enter */}
        <Reveal variant="fade-up" stagger className="mt-4 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="bg-surface p-6">
              <CountUp
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                className="block font-[family-name:var(--font-space)] text-4xl font-semibold tracking-tight text-primary md:text-5xl"
              />
              <p className="mt-2 text-sm text-muted">{m.label}</p>
            </div>
          ))}
        </Reveal>

        {/* Story — sticky contents + stack beside the sections */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 flex flex-col gap-10">
              <Toc items={p.sections.map((s) => ({ id: s.id, title: s.title }))} />
              <div>
                <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">stack</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <li key={t} className="pill">{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <Prose sections={p.sections} />

            {p.quote && (
              <Reveal variant="fade-up" className="mt-14">
                <figure className="card ring-gradient overflow-hidden p-7 md:p-9">
                  <span className="font-[family-name:var(--font-space)] text-[64px] leading-[0.6] text-primary" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 font-[family-name:var(--font-space)] text-xl font-medium leading-snug tracking-tight md:text-2xl">
                    {p.quote.text}
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-muted">
                    <span className="text-fg">{p.quote.name}</span> · {p.quote.role}
                  </figcaption>
                </figure>
              </Reveal>
            )}

            {/* Stack for small screens (the sidebar is desktop-only) */}
            <div className="mt-12 lg:hidden">
              <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">stack</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <li key={t} className="pill">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Previous / next — direction-tagged so the slide matches the arrow */}
        <nav aria-label="More projects" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            transitionTypes={back}
            className="card card-hover group flex flex-col gap-1 p-5"
          >
            <span className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
              <span className="inline-block rotate-180 transition-transform duration-200 group-hover:-translate-x-1">{ArrowIcon}</span>
              previous
            </span>
            <span className="font-[family-name:var(--font-space)] text-lg font-semibold tracking-tight">{prev.name}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            transitionTypes={forward}
            className="card card-hover group flex flex-col items-end gap-1 p-5 text-right"
          >
            <span className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
              next
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">{ArrowIcon}</span>
            </span>
            <span className="font-[family-name:var(--font-space)] text-lg font-semibold tracking-tight">{next.name}</span>
          </Link>
        </nav>
      </article>

      <CtaPanel description={`Need something built with the care that went into ${p.name}? Tell me about it.`} />
    </>
  );
}
