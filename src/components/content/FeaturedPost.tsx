import Link from "next/link";
import { COPY, TRANSITION_FORWARD } from "@/constants/constant";
import { formatMonthYear } from "@/utils/format";
import { staggerStyle } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { FeaturedPostProps } from "@/types/types";

/** Featured spread: a solid primary cover with the read time as the big number. */
export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      transitionTypes={TRANSITION_FORWARD}
      style={staggerStyle(0)}
      className="group grid overflow-hidden rounded-3xl bg-surface transition-colors duration-300 hover:bg-surface-hi md:grid-cols-12"
    >
      <div className="flex flex-col justify-between gap-6 bg-primary p-6 text-on-primary md:col-span-3 md:p-7">
        <span className="flex items-center justify-between gap-3 text-sm font-medium">
          <span className="rounded-full bg-black/20 px-3 py-1">{COPY.posts.featured}</span>
          {post.category}
        </span>
        <span>
          <span className="block font-display text-[48px] font-bold leading-none tracking-tight md:text-[56px]">
            {post.readingMinutes}
            <span className="ml-1 text-xl md:text-2xl">{COPY.posts.minutes}</span>
          </span>
          <span className="mt-2 block text-sm">
            {COPY.posts.read} · {formatMonthYear(post.publishedAt)}
          </span>
        </span>
      </div>
      <div className="flex flex-col justify-center p-6 md:col-span-9 md:p-8">
        <h2 className="font-display text-[24px] font-bold leading-tight tracking-tight transition-colors duration-200 group-hover:text-primary md:text-[30px]">
          {post.title}
        </h2>
        <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-background/60 px-5 py-2.5 text-sm font-medium transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
          {COPY.posts.readArticle} <Icon name="arrowRight" />
        </span>
      </div>
    </Link>
  );
}
