import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SplitText from "@/components/split-text";
import Prose from "@/components/prose";
import Toc from "@/components/toc";
import Reveal from "@/components/reveal";
import ReadingProgress from "@/components/reading-progress";
import ShareButton from "@/components/share-button";
import JsonLd from "@/components/json-ld";
import { site } from "@/lib/site";
import { back, forward } from "@/components/route-transition";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { blogPosts, getPost } from "@/lib/content/posts";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    alternates: { canonical: `/posts/${post.slug}` },
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.isoDate, url: `/posts/${post.slug}`, authors: [site.name] },
  };
}

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const i = blogPosts.findIndex((p) => p.slug === slug);
  const more = [blogPosts[(i + 1) % blogPosts.length], blogPosts[(i + 2) % blogPosts.length]];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.isoDate,
          author: { "@type": "Person", name: site.name, url: site.url },
        }}
      />
      <ReadingProgress target="#article" />

      <article id="article" className="container-site page-top pb-16">
        {/* One reading column (header + body share its left edge); contents sit beside it on wide screens */}
        <div className="mx-auto grid max-w-[720px] gap-x-16 xl:max-w-[1000px] xl:grid-cols-[minmax(0,720px)_200px] xl:justify-between">
          {/* Header — title rises word by word */}
          <header className="xl:col-start-1 xl:row-start-1">
            <Link
              href="/posts"
              transitionTypes={back}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
            >
              <span className="inline-block rotate-180 transition-transform duration-200 group-hover:-translate-x-1">{ArrowIcon}</span>
              All posts
            </Link>
            <p data-enter="rise" className="mt-8 flex flex-wrap items-center gap-3 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
              <span className="pill">{post.category}</span>
              <time dateTime={post.isoDate}>{post.date}</time>
              <span className="text-fg/30" aria-hidden="true">·</span>
              <span>{post.readingTime} read</span>
            </p>
            <h1 className="h-display mt-5 text-[36px] md:text-[54px]">
              <SplitText text={post.title} enter="mask" step={45} delay={80} />
            </h1>
            <p data-enter="rise" style={d(420)} className="mt-5 text-xl leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <div data-enter="rise" style={d(520)} className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-[family-name:var(--font-space)] font-semibold text-accent">
                  MA
                </span>
                <span className="text-sm">
                  <span className="block">{site.name}</span>
                  <span className="text-muted">{site.role}</span>
                </span>
              </div>
              <ShareButton />
            </div>
          </header>

          {/* Body */}
          <div className="mt-12 min-w-0 xl:col-start-1 xl:row-start-2">
            <Prose sections={post.sections} />
          </div>
          <aside className="mt-12 hidden xl:col-start-2 xl:row-start-2 xl:block">
            <div className="sticky top-28">
              <Toc items={post.sections.map((s) => ({ id: s.id, title: s.title }))} />
            </div>
          </aside>
        </div>

        {/* Keep reading */}
        <section aria-labelledby="more" className="mx-auto mt-20 max-w-[1000px] border-t border-line pt-10">
          <h2 id="more" className="font-[family-name:var(--font-space)] text-2xl font-semibold tracking-tight">
            Keep reading
          </h2>
          <Reveal variant="fade-up" stagger className="mt-6 grid gap-4 md:grid-cols-2">
            {more.map((m) => (
              <Link
                key={m.slug}
                href={`/posts/${m.slug}`}
                transitionTypes={forward}
                className="card card-hover spotlight group flex flex-col p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="pill">{m.category}</span>
                  <span className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    <ArrowUpRight />
                  </span>
                </div>
                <span className="mt-4 font-[family-name:var(--font-space)] text-xl font-medium leading-snug">{m.title}</span>
                <span className="mt-2 text-sm text-muted">{m.excerpt}</span>
                <span className="mt-auto pt-5 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                  {m.date} · {m.readingTime} read
                </span>
              </Link>
            ))}
          </Reveal>
        </section>
      </article>
    </>
  );
}
