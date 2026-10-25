import Link from "next/link";
import { COPY, PAPER_CITE_ID } from "@/constants/constant";
import { paperTocItems } from "@/utils/content";
import Icon from "@/components/ui/Icon";
import Toc from "@/components/ui/Toc";
import type { PaperProps } from "@/types/types";

/** Numbered contents (desktop) and the paper's actions. */
export default function PaperSidebar({ paper }: PaperProps) {
  const { research } = COPY;

  return (
    <aside className="lg:col-span-3">
      <div className="flex flex-col gap-8 lg:sticky lg:top-28">
        <div className="hidden lg:block">
          <Toc numbered items={paperTocItems(paper.toc)} />
        </div>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
          <a href={`#${PAPER_CITE_ID}`} className="btn-secondary h-10! px-4! text-sm">
            {research.cite}
          </a>
          {/* Link out only to a real file or page; otherwise offer to send it */}
          {paper.pdfUrl || paper.paperUrl ? (
            <a
              href={paper.pdfUrl ?? paper.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-10! px-4! text-sm"
            >
              {paper.pdfUrl ? research.downloadPdf : research.openPaper} <Icon name="arrowUpRight" />
            </a>
          ) : (
            <Link href="/contact" className="btn-secondary h-10! px-4! text-sm">
              {research.requestPdf} <Icon name="arrowRight" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
