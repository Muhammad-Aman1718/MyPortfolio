import Link from "next/link";
import { COPY, TRANSITION_FORWARD } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import type { PostCardProps } from "@/types/types";

/** Compact post card for "Keep reading". */
export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      transitionTypes={TRANSITION_FORWARD}
      className="card card-hover spotlight group flex flex-col p-6"
    >
      <div className="flex items-center justify-between">
        <span className="pill">{post.category}</span>
        <span className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
          <Icon name="arrowUpRight" />
        </span>
      </div>
      <span className="mt-4 font-display text-xl font-medium leading-snug">{post.title}</span>
      <span className="mt-2 text-sm text-muted">{post.excerpt}</span>
      <span className="mt-auto pt-5 font-mono text-xs text-muted">
        {post.date} · {post.readingTime} {COPY.post.read}
      </span>
    </Link>
  );
}
