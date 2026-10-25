import Link from "next/link";
import { COPY, SITE } from "@/constants/constant";
import { formatLongDate } from "@/utils/format";
import { enter } from "@/utils/style";
import Avatar from "@/components/ui/Avatar";
import BackLink from "@/components/ui/BackLink";
import Initials from "@/components/ui/Initials";
import ShareButton from "@/components/ui/ShareButton";
import SplitText from "@/components/ui/SplitText";
import ArticleImage from "@/components/mdx/ArticleImage";
import type { PostHeaderProps } from "@/types/types";

/** Article header: meta line, the title rising word by word, excerpt, author bar, cover and tags. */
export default function PostHeader({ post }: PostHeaderProps) {
  const { post: copy } = COPY;

  return (
    <header className="xl:col-start-1 xl:row-start-1">
      <BackLink href="/posts" label={copy.all} />
      {post.status === "draft" && (
        <p className="mt-6 inline-flex rounded-full bg-error/15 px-3 py-1 text-xs font-medium text-error">{copy.draft}</p>
      )}
      <p {...enter("rise")} className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
        <span className="pill">{post.subcategory ? `${post.category} · ${post.subcategory}` : post.category}</span>
        <time dateTime={post.publishedAt}>{formatLongDate(post.publishedAt)}</time>
        <span className="text-fg/30" aria-hidden="true">
          ·
        </span>
        <span>
          {post.readingMinutes} {COPY.posts.minutes} {copy.read}
        </span>
        {post.updatedAt && post.updatedAt !== post.publishedAt && (
          <span>
            ({copy.updated} <time dateTime={post.updatedAt}>{formatLongDate(post.updatedAt)}</time>)
          </span>
        )}
      </p>
      <h1 className="h-display mt-5 text-[36px] md:text-[54px]">
        <SplitText text={post.title} enter="mask" step={45} delay={80} />
      </h1>
      <p {...enter("rise", 420)} className="mt-5 text-xl leading-relaxed text-muted">
        {post.excerpt}
      </p>
      <div
        {...enter("rise", 520)}
        className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4"
      >
        <div className="flex items-center gap-3">
          {post.author === SITE.name ? (
            <Avatar className="h-11 w-11" />
          ) : (
            <Initials name={post.author} className="h-11 w-11 text-sm" />
          )}
          <span className="text-sm">
            <span className="block">{post.author}</span>
            {post.author === SITE.name && <span className="text-muted">{SITE.role}</span>}
          </span>
        </div>
        <ShareButton />
      </div>

      {post.coverImage && (
        <div {...enter("rise", 600)} className="mt-8">
          <ArticleImage src={post.coverImage} alt={post.coverImageAlt ?? ""} priority />
        </div>
      )}

      {post.tags.length > 0 && (
        <ul aria-label={copy.tagsLabel} className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/posts?tag=${encodeURIComponent(tag)}`}
                className="pill transition-colors duration-150 hover:text-fg"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
