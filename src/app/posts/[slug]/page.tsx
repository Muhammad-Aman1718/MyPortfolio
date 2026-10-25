import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UI } from "@/constants/constant";
import { getPost, getPosts, getRelatedPosts, getSeries } from "@/lib/content/posts";
import { articleMeta } from "@/lib/seo";
import { blogPosting } from "@/lib/structuredData";
import JsonLd from "@/components/ui/JsonLd";
import ReadingProgress from "@/components/ui/ReadingProgress";
import Toc from "@/components/ui/Toc";
import MdxContent from "@/components/mdx/MdxContent";
import KeepReading from "@/components/sections/post/KeepReading";
import PostHeader from "@/components/sections/post/PostHeader";
import SeriesNav from "@/components/sections/post/SeriesNav";

/** Only the listed (published) slugs exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return articleMeta({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/posts/${post.slug}`,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author],
    tags: post.tags,
    image: post.ogImage ?? post.coverImage,
    canonical: post.canonicalUrl,
    noIndex: post.status === "draft",
  });
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const series = getSeries(post);
  const related = getRelatedPosts(post, UI.keepReading);

  return (
    <>
      <JsonLd data={blogPosting(post)} />
      <ReadingProgress target="#article" />

      <article id="article" className="container-site page-top pb-16">
        {/* One reading column (header + body share its left edge); contents sit beside it on wide screens */}
        <div className="mx-auto grid max-w-180 gap-x-16 xl:max-w-250 xl:grid-cols-[minmax(0,720px)_200px] xl:justify-between">
          <PostHeader post={post} />
          <div className="mt-12 min-w-0 xl:col-start-1 xl:row-start-2">
            <MdxContent source={post.body} />
            {series && <SeriesNav series={series} />}
          </div>
          {post.toc.length > 0 && (
            <aside className="mt-12 hidden xl:col-start-2 xl:row-start-2 xl:block">
              <div className="sticky top-28">
                <Toc items={post.toc} />
              </div>
            </aside>
          )}
        </div>

        {related.length > 0 && <KeepReading posts={related} />}
      </article>
    </>
  );
}
