import Link from "next/link";
import { COPY, TRANSITION_FORWARD, UI } from "@/constants/constant";
import { pad2 } from "@/utils/format";
import { staggerStyle } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import type { PaperCardProps } from "@/types/types";

/** Research card: meta line, title, a clamped abstract, then the key findings as big numbers. */
export default function PaperCard({ paper, index }: PaperCardProps) {
  return (
    <Link
      href={`/posts/research/${paper.slug}`}
      transitionTypes={TRANSITION_FORWARD}
      style={staggerStyle(index)}
      className="group flex flex-col rounded-3xl bg-surface p-7 transition-colors duration-300 hover:bg-surface-hi md:p-9"
    >
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
        <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-on-primary">
          {COPY.posts.paper} {pad2(paper.number)}
        </span>
        {paper.venue} · {paper.year}
      </p>
      <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-200 group-hover:text-primary md:text-[28px]">
        {paper.title}
      </h2>
      <p className="mt-4 line-clamp-3 leading-relaxed text-muted">{paper.abstract}</p>

      <dl className="mt-7 grid grid-cols-3 gap-2">
        {paper.findings.slice(0, UI.paperFindings).map((finding) => (
          <div key={finding.label} className="rounded-2xl bg-background/60 p-3.5">
            <dt className="sr-only">{finding.label}</dt>
            <dd>
              <span className="block font-display text-2xl font-bold leading-none">
                {finding.prefix}
                {finding.value}
                {finding.suffix}
              </span>
              <span className="mt-1.5 line-clamp-2 block text-xs leading-snug text-subtle">{finding.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
        <span className="flex flex-wrap gap-1.5">
          {paper.tags.map((tag) => (
            <span key={tag} className="pill">
              {tag}
            </span>
          ))}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-background/60 px-4 py-2 text-sm font-medium transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
          {COPY.posts.readPaper} <Icon name="arrowRight" />
        </span>
      </div>
    </Link>
  );
}
