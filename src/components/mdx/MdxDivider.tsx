import SectionDivider from "@/components/ui/SectionDivider";

/**
 * A `---` line in an article: the same dotted divider that opens each section,
 * for a break between paragraphs without starting a new heading.
 */
export default function MdxDivider() {
  return (
    <div role="separator" className="mdx-hr">
      <SectionDivider className="" />
    </div>
  );
}
