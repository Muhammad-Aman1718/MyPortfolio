import { Suspense } from "react";
import { COPY, PAGE_META } from "@/constants/constant";
import { getPosts } from "@/lib/content/posts";
import { getPapers } from "@/lib/content/research";
import { pageMeta } from "@/lib/seo";
import { enter } from "@/utils/style";
import PostsBrowser from "@/components/content/PostsBrowser";

export const metadata = pageMeta(PAGE_META.posts);

export default function Posts() {
  const { posts } = COPY;

  return (
    <div className="container-site page-top pb-16">
      <header className="max-w-190">
        <p {...enter("rise")} className="eyebrow">
          {posts.eyebrow}
        </p>
        <h1 {...enter("blur", 100)} className="h-display mt-4 text-[44px] md:text-[68px]">
          {posts.title}
        </h1>
        <p {...enter("rise", 350)} className="mt-4 max-w-[60ch] text-muted">
          {posts.intro}
        </p>
      </header>

      <div {...enter("rise", 500)}>
        {/* The browser reads ?tab= and ?tag= to restore its state */}
        <Suspense>
          <PostsBrowser posts={getPosts()} papers={getPapers()} />
        </Suspense>
      </div>
    </div>
  );
}
