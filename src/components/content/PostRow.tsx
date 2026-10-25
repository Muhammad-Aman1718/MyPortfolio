import Link from "next/link";
import { COPY, TRANSITION_FORWARD } from "@/constants/constant";
import { dayMonth } from "@/utils/format";
import Icon from "@/components/ui/Icon";
import type { PostRowProps } from "@/types/types";

/** Magazine row: a date badge, the category and read time, title and excerpt. */
export default function PostRow({ post }: PostRowProps) {
  const { day, month } = dayMonth(post.publishedAt);

  return (
    <Link
      href={`/posts/${post.slug}`}
      transitionTypes={TRANSITION_FORWARD}
      className="group my-1.5 grid grid-cols-[auto_1fr] items-start gap-5 rounded-[20px] px-3 py-5 transition-colors duration-300 hover:bg-surface sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:px-6"
    >
      <span className="flex w-14 flex-col items-center rounded-[14px] bg-surface py-2.5 transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary sm:w-16">
        <span className="font-display text-2xl font-bold leading-none sm:text-[28px]">{day}</span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-wider">{month}</span>
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
          <span className="font-medium text-primary">{post.category}</span>
          <span aria-hidden="true">·</span>
          {post.readingMinutes} {COPY.posts.minutes} {COPY.posts.read}
        </span>
        <span className="mt-2 block font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
          {post.title}
        </span>
        <span className="mt-1.5 block leading-relaxed text-muted">{post.excerpt}</span>
      </span>
      <span className="hidden h-11 w-11 items-center justify-center self-center rounded-full bg-surface text-muted transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-on-primary sm:flex">
        <Icon name="arrowUpRight" />
      </span>
    </Link>
  );
}
