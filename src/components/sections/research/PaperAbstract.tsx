import { COPY } from "@/constants/constant";
import { enter } from "@/utils/style";
import type { PaperProps } from "@/types/types";

/** The abstract, set apart in a tinted card. */
export default function PaperAbstract({ paper }: PaperProps) {
  return (
    <section
      aria-labelledby="abstract"
      {...enter("rise", 600)}
      className="card bg-linear-to-br from-secondary/50 to-surface p-6 md:p-8"
    >
      <h2 id="abstract" className="font-mono text-xs tracking-[0.12em] text-accent">
        {COPY.research.abstract}
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-fg/90">{paper.abstract}</p>
    </section>
  );
}
