import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, UI } from "@/constants/constant";
import { articleMeta } from "@/lib/seo";
import { blogPosting } from "@/lib/structuredData";
import { getPost, nextItems, tocItems } from "@/utils/content";
import JsonLd from "@/components/ui/JsonLd";
import ReadingProgress from "@/components/ui/ReadingProgress";
import Toc from "@/components/ui/Toc";
import Prose from "@/components/content/Prose";
import KeepReading from "@/components/sections/post/KeepReading";
import PostHeader from "@/components/sections/post/PostHeader";

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return articleMeta({
    title: post.title,
    description: post.excerpt,
    path: `/posts/${post.slug}`,
    publishedTime: post.isoDate,
  });
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = nextItems(BLOG_POSTS, BLOG_POSTS.indexOf(post), UI.keepReading);

  return (
    <>
      <JsonLd data={blogPosting(post)} />
      <ReadingProgress target="#article" />

      <article id="article" className="container-site page-top pb-16">
        {/* One reading column (header + body share its left edge); contents sit beside it on wide screens */}
        <div className="mx-auto grid max-w-180 gap-x-16 xl:max-w-250 xl:grid-cols-[minmax(0,720px)_200px] xl:justify-between">
          <PostHeader post={post} />
          <div className="mt-12 min-w-0 xl:col-start-1 xl:row-start-2">
            <Prose sections={post.sections} />
          </div>
          <aside className="mt-12 hidden xl:col-start-2 xl:row-start-2 xl:block">
            <div className="sticky top-28">
              <Toc items={tocItems(post.sections)} />
            </div>
          </aside>
        </div>

        <KeepReading posts={more} />
      </article>
    </>
  );
}
