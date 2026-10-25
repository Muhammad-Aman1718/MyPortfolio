import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COPY, UI } from "@/constants/constant";
import { getPaper, getPapers, getRelatedPapers } from "@/lib/content/research";
import { articleMeta } from "@/lib/seo";
import { scholarlyArticle } from "@/lib/structuredData";
import BackLink from "@/components/ui/BackLink";
import JsonLd from "@/components/ui/JsonLd";
import MetricGrid from "@/components/ui/MetricGrid";
import PaperList from "@/components/content/PaperList";
import MdxContent from "@/components/mdx/MdxContent";
import CitationSection from "@/components/sections/research/CitationSection";
import PaperAbstract from "@/components/sections/research/PaperAbstract";
import PaperHeader from "@/components/sections/research/PaperHeader";
import PaperSidebar from "@/components/sections/research/PaperSidebar";

/** Only the listed (published) slugs exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPapers().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/posts/research/[slug]">): Promise<Metadata> {
  const paper = getPaper((await params).slug);
  if (!paper) return {};
  return articleMeta({
    title: paper.seoTitle ?? paper.title,
    description: paper.seoDescription ?? paper.abstract,
    path: `/posts/research/${paper.slug}`,
    publishedTime: paper.publishedAt,
    authors: paper.authors,
    tags: paper.tags,
    image: paper.coverImage,
    noIndex: paper.status === "draft",
  });
}

export default async function PaperPage({ params }: PageProps<"/posts/research/[slug]">) {
  const paper = getPaper((await params).slug);
  if (!paper) notFound();

  const related = getRelatedPapers(paper, UI.relatedResearch);

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
            {paper.findings.length > 0 && <MetricGrid metrics={paper.findings} />}
            <div className="mt-14 max-w-[70ch]">
              <MdxContent source={paper.body} numbered />
              <CitationSection paper={paper} />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-research" className="mt-20 border-t border-line pt-10">
            <h2 id="related-research" className="font-display text-2xl font-semibold tracking-tight">
              {COPY.research.related}
            </h2>
            <PaperList papers={related} />
          </section>
        )}
      </article>
    </>
  );
}
