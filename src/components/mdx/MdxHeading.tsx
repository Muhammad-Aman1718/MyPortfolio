import { cn } from "@/utils/style";
import Reveal from "@/components/ui/Reveal";
import SectionDivider from "@/components/ui/SectionDivider";
import HeadingAnchor from "./HeadingAnchor";
import { headingText } from "@/utils/react";
import type { MdxHeadingProps } from "@/types/types";

/**
 * Article headings. `##` opens a section: a divider (hidden before the first
 * one by CSS), then the title rising in. Ids come from rehype-slug and match
 * the table of contents. Visually hidden headings (GFM footnotes) stay plain.
 */
export default function MdxHeading({ level, id, className, children }: MdxHeadingProps) {
  const Tag = level === 2 ? "h2" : "h3";
  if (!id || className?.includes("sr-only")) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  const heading = (
    <Tag id={id} className={cn("group scroll-mt-28", level === 2 ? "mdx-h2" : "mdx-h3")}>
      {children}
      <HeadingAnchor id={id} title={headingText(children)} />
    </Tag>
  );

  if (level === 3) return heading;
  return (
    <>
      <div className="mdx-divider" aria-hidden="true">
        <SectionDivider />
      </div>
      <Reveal variant="fade-up" start="top 90%">
        {heading}
      </Reveal>
    </>
  );
}
