import { COPY, PAPER_CITE_ID } from "@/constants/constant";
import CodeBlock from "@/components/ui/CodeBlock";
import type { PaperProps } from "@/types/types";

/** Numbered last section with the BibTeX entry and a copy button. */
export default function CitationSection({ paper }: PaperProps) {
  const { research } = COPY;

  return (
    <section id={PAPER_CITE_ID} className="mt-14 scroll-mt-28">
      <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-tight md:text-[28px]">
        <span className="font-mono text-sm text-accent">{paper.sections.length + 1}</span>
        {research.citeTitle}
      </h2>
      <div className="mt-5">
        <CodeBlock code={paper.bibtex} caption={research.bibtex} copyLabel={research.copyCitation} />
      </div>
    </section>
  );
}
