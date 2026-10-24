import InlineText from "@/components/ui/InlineText";
import type { ProseBlockProps } from "@/types/types";

/** Policy text: plain paragraphs and bullet lists, styled by `.legal-body`. */
export default function LegalBlock({ block }: ProseBlockProps) {
  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item, i) => (
          <li key={i}>
            <InlineText text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "p") {
    return (
      <p>
        <InlineText text={block.text} />
      </p>
    );
  }
  return null;
}
