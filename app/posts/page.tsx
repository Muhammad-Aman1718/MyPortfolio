import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Suspense } from "react";
import PostsBrowser from "@/components/posts-browser";

export const metadata: Metadata = pageMeta({
  title: "Posts & Research",
  description:
    "Articles and research notes by Muhammad Aman on React Native, Next.js, performance and building software that scales.",
  path: "/posts",
});

export default function Posts() {
  return (
    <div className="container-site page-top pb-16">
      <header className="max-w-190">
        <p data-enter="rise" className="eyebrow">
          {"writing"}
        </p>
        <h1
          data-enter="blur"
          style={{ "--d": 100 } as React.CSSProperties}
          className="h-display mt-4 text-[44px] md:text-[68px]"
        >
          Posts &amp; research
        </h1>
        <p
          data-enter="rise"
          style={{ "--d": 350 } as React.CSSProperties}
          className="mt-4 max-w-[60ch] text-muted"
        >
          Notes from production: mobile performance, architecture decisions, and
          the business of building software well.
        </p>
      </header>

      <div data-enter="rise" style={{ "--d": 500 } as React.CSSProperties}>
        <Suspense>
          <PostsBrowser />
        </Suspense>
      </div>
    </div>
  );
}
