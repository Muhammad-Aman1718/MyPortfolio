import { COPY, SITE } from "@/constants/constant";
import { enter } from "@/utils/style";
import Avatar from "@/components/ui/Avatar";
import BackLink from "@/components/ui/BackLink";
import ShareButton from "@/components/ui/ShareButton";
import SplitText from "@/components/ui/SplitText";
import type { PostCardProps } from "@/types/types";

/** Article header: meta line, the title rising word by word, excerpt and the author bar. */
export default function PostHeader({ post }: PostCardProps) {
  return (
    <header className="xl:col-start-1 xl:row-start-1">
      <BackLink href="/posts" label={COPY.post.all} />
      <p {...enter("rise")} className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
        <span className="pill">{post.category}</span>
        <time dateTime={post.isoDate}>{post.date}</time>
        <span className="text-fg/30" aria-hidden="true">
          ·
        </span>
        <span>
          {post.readingTime} {COPY.post.read}
        </span>
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
          <Avatar className="h-11 w-11" />
          <span className="text-sm">
            <span className="block">{SITE.name}</span>
            <span className="text-muted">{SITE.role}</span>
          </span>
        </div>
        <ShareButton />
      </div>
    </header>
  );
}
