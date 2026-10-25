import Link from "next/link";
import { COPY, TRANSITION_FORWARD } from "@/constants/constant";
import { fillTemplate, pad2 } from "@/utils/format";
import { cn } from "@/utils/style";
import type { SeriesNavProps } from "@/types/types";

/** "Part 2 of 4 in <series>" with every part listed; the current one is marked. */
export default function SeriesNav({ series }: SeriesNavProps) {
  return (
    <nav aria-label={`${COPY.post.seriesLabel}: ${series.name}`} className="card mt-12 p-6">
      <p className="text-sm text-subtle">
        {fillTemplate(COPY.post.series, { index: String(series.index + 1), total: String(series.posts.length) })}{" "}
        <span className="font-medium text-fg">{series.name}</span>
      </p>
      <ol className="mt-4 flex flex-col gap-1">
        {series.posts.map((part, i) => {
          const current = i === series.index;
          return (
            <li key={part.slug}>
              <Link
                href={`/posts/${part.slug}`}
                transitionTypes={TRANSITION_FORWARD}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex gap-3 rounded-xl px-3 py-2 text-sm transition-colors duration-150",
                  current ? "bg-surface-hi text-fg" : "text-muted hover:bg-surface-hi hover:text-fg",
                )}
              >
                <span className="font-mono text-xs leading-5 text-accent">{pad2(i + 1)}</span>
                {part.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
