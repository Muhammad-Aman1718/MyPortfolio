import FaqList from "./FaqList";
import SectionHeader from "./SectionHeader";
import type { FaqSplitProps } from "@/types/types";

/** Sticky section header on the left, the FAQ accordion on the right (services, contact). */
export default function FaqSplit({ header, items }: FaqSplitProps) {
  return (
    <section className="container-site section">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader eyebrow={header.eyebrow} title={header.title} highlight={header.highlight} motion="fade" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
