import { COPY } from "@/constants/constant";
import PaperCard from "./PaperCard";
import type { PaperListProps } from "@/types/types";

/** Two-up grid of paper cards (research tab, related research). */
export default function PaperList({ papers }: PaperListProps) {
  if (!papers.length) return <p className="py-12 text-center text-muted">{COPY.posts.noPapers}</p>;
  return (
    <div className="stagger-in mt-8 grid gap-4 lg:grid-cols-2">
      {papers.map((paper, i) => (
        <PaperCard key={paper.slug} paper={paper} index={i} />
      ))}
    </div>
  );
}
