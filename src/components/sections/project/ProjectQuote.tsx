import Reveal from "@/components/ui/Reveal";
import type { ProjectQuoteProps } from "@/types/types";

/** Client quote closing a case study. */
export default function ProjectQuote({ quote }: ProjectQuoteProps) {
  return (
    <Reveal variant="fade-up" className="mt-14">
      <figure className="card overflow-hidden p-7 md:p-9">
        <span className="font-display text-[64px] leading-[0.6] text-primary" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="mt-4 font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
          {quote.text}
        </blockquote>
        <figcaption className="mt-5 text-sm text-muted">
          <span className="text-fg">{quote.name}</span> · {quote.role}
        </figcaption>
      </figure>
    </Reveal>
  );
}
