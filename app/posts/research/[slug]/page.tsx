import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SplitText from "@/components/split-text";
import Prose from "@/components/prose";
import Toc from "@/components/toc";
import Reveal from "@/components/reveal";
import CountUp from "@/components/count-up";
import CopyButton from "@/components/copy-button";
import JsonLd from "@/components/json-ld";
import { back } from "@/components/route-transition";
import { ArrowIcon } from "@/components/icons";
import { getPaper, research } from "@/lib/content/research";

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/posts/research/[slug]">): Promise<Metadata> {
  const paper = getPaper((await params).slug);
  if (!paper) return {};
  return {
    title: paper.title,
    alternates: { canonical: `/posts/research/${paper.slug}` },
    description: paper.abstract,
    openGraph: { title: paper.title, description: paper.abstract, type: "article", publishedTime: paper.isoDate },
  };
}

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export default async function PaperPage({ params }: PageProps<"/posts/research/[slug]">) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();
  const n = research.findIndex((r) => r.slug === slug) + 1;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
          headline: paper.title,
          abstract: paper.abstract,
          datePublished: paper.isoDate,
          author: { "@type": "Person", name: paper.authors },
          keywords: paper.tags.join(", "),
        }}
      />

      <article className="container-site page-top pb-16">
        <Link
          href="/posts?tab=research"
          transitionTypes={back}
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
        >
          <span className="inline-block rotate-180 transition-transform duration-200 group-hover:-translate-x-1">{ArrowIcon}</span>
          All research
        </Link>

        {/* Title block — paper number wipes in, title rises, metadata follows */}
        <header className="mt-8 max-w-[900px]">
          <p data-enter="wipe" className="font-[family-name:var(--font-jetbrains)] text-xs text-accent">
            paper {String(n).padStart(2, "0")} · {paper.venue} · {paper.year}
          </p>
          <h1 className="h-display mt-4 text-[34px] md:text-[52px]">
            <SplitText text={paper.title} enter="mask" step={40} delay={120} />
          </h1>
          <div data-enter="rise" style={d(500)} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-sm">
              <span className="text-muted">by </span>
              {paper.authors}
            </p>
            <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
              {paper.tags.map((t) => (
                <li key={t} className="pill">{t}</li>
              ))}
            </ul>
          </div>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Sidebar — numbered contents and paper actions */}
          <aside className="lg:col-span-3">
            <div className="flex flex-col gap-8 lg:sticky lg:top-28">
              <div className="hidden lg:block">
                <Toc numbered items={[...paper.sections.map((s) => ({ id: s.id, title: s.title })), { id: "cite", title: "Cite this paper" }]} />
              </div>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                <a href="#cite" className="btn-secondary !h-10 !px-4 text-sm">
                  Cite
                </a>
                <Link href="/contact" className="btn-secondary !h-10 !px-4 text-sm">
                  Request PDF {ArrowIcon}
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-9 xl:col-span-8">
            {/* Abstract */}
            <section aria-labelledby="abstract" data-enter="rise" style={d(600)} className="card ring-gradient bg-gradient-to-br from-secondary/50 to-surface p-6 md:p-8">
              <h2 id="abstract" className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.12em] text-accent">
                ABSTRACT
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-fg/90">{paper.abstract}</p>
            </section>

            {/* Key findings */}
            <Reveal variant="fade-up" stagger className="mt-4 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-3">
              {paper.findings.map((f) => (
                <div key={f.label} className="bg-surface p-5">
                  <CountUp
                    value={f.value}
                    prefix={f.prefix}
                    suffix={f.suffix}
                    className="block font-[family-name:var(--font-space)] text-3xl font-semibold tracking-tight text-primary"
                  />
                  <p className="mt-1.5 text-sm text-muted">{f.label}</p>
                </div>
              ))}
            </Reveal>

            <div className="mt-14 max-w-[70ch]">
              <Prose sections={paper.sections} numbered />

              {/* Citation */}
              <section id="cite" className="mt-14 scroll-mt-28">
                <h2 className="flex items-baseline gap-3 font-[family-name:var(--font-space)] text-2xl font-semibold tracking-tight md:text-[28px]">
                  <span className="font-[family-name:var(--font-jetbrains)] text-sm text-accent">{paper.sections.length + 1}</span>
                  Cite this paper
                </h2>
                <figure className="mt-5 overflow-hidden rounded-[14px] border border-line bg-[#0c0c0d]">
                  <div className="flex items-center justify-between border-b border-line px-4 py-2">
                    <span className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">BibTeX</span>
                    <CopyButton text={paper.bibtex} label="Copy citation" />
                  </div>
                  <pre className="overflow-x-auto p-4 font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.7] text-fg/85">
                    <code>{paper.bibtex}</code>
                  </pre>
                </figure>
              </section>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
