import { COPY } from "@/constants/constant";
import { pad2 } from "@/utils/format";
import { enter } from "@/utils/style";
import SplitText from "@/components/ui/SplitText";
import TagList from "@/components/ui/TagList";
import type { PaperProps } from "@/types/types";

/** Title block: the paper number wipes in, the title rises, metadata follows. */
export default function PaperHeader({ paper }: PaperProps) {
  const { research } = COPY;

  return (
    <header className="mt-8 max-w-225">
      <p {...enter("wipe")} className="font-mono text-xs text-accent">
        {research.paper} {pad2(paper.number)} · {paper.venue} · {paper.year}
      </p>
      <h1 className="h-display mt-4 text-[34px] md:text-[52px]">
        <SplitText text={paper.title} enter="mask" step={40} delay={120} />
      </h1>
      <div {...enter("rise", 500)} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="text-sm">
          <span className="text-muted">{research.by} </span>
          {paper.authors.join(", ")}
        </p>
        <TagList tags={paper.tags} label={research.topics} />
        {paper.doi && (
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            {research.doi}: {paper.doi}
          </a>
        )}
      </div>
    </header>
  );
}
