import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COPY, RESEARCH } from "@/constants/constant";
import { articleMeta } from "@/lib/seo";
import { scholarlyArticle } from "@/lib/structuredData";
import { getPaper } from "@/utils/content";
import BackLink from "@/components/ui/BackLink";
import JsonLd from "@/components/ui/JsonLd";
import MetricGrid from "@/components/ui/MetricGrid";
import Prose from "@/components/content/Prose";
import CitationSection from "@/components/sections/research/CitationSection";
import PaperAbstract from "@/components/sections/research/PaperAbstract";
import PaperHeader from "@/components/sections/research/PaperHeader";
import PaperSidebar from "@/components/sections/research/PaperSidebar";

export function generateStaticParams() {
  return RESEARCH.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/posts/research/[slug]">): Promise<Metadata> {
  const paper = getPaper((await params).slug);
  if (!paper) return {};
  return articleMeta({
    title: paper.title,
    description: paper.abstract,
    path: `/posts/research/${paper.slug}`,
    publishedTime: paper.isoDate,
  });
}

export default async function PaperPage({ params }: PageProps<"/posts/research/[slug]">) {
  const paper = getPaper((await params).slug);
  if (!paper) notFound();

  return (
    <>
      <JsonLd data={scholarlyArticle(paper)} />

      <article className="container-site page-top pb-16">
        <BackLink href="/posts?tab=research" label={COPY.research.all} />
        <PaperHeader paper={paper} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <PaperSidebar paper={paper} />

          <div className="min-w-0 lg:col-span-9 xl:col-span-8">
            <PaperAbstract paper={paper} />
            <MetricGrid metrics={paper.findings} />
            <div className="mt-14 max-w-[70ch]">
              <Prose sections={paper.sections} numbered />
              <CitationSection paper={paper} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
