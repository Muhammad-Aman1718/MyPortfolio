import { COPY } from "@/constants/constant";
import { pad2 } from "@/utils/format";
import CodeBlock from "@/components/ui/CodeBlock";
import InlineText from "@/components/ui/InlineText";
import type { ProseBlockProps } from "@/types/types";

/** One long-form content block (paragraph, sub-heading, list, code, quote or callout). */
export default function ProseBlock({ block }: ProseBlockProps) {
  switch (block.type) {
    case "p":
      return (
        <p className="leading-[1.75] text-fg/80">
          <InlineText text={block.text} />
        </p>
      );
    case "h3":
      return <h3 className="pt-2 font-display text-xl font-semibold tracking-tight">{block.text}</h3>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="flex flex-col gap-2.5 pl-1 text-fg/80">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-[1.7]">
              {block.ordered ? (
                <span className="mt-0.75 w-5 shrink-0 font-mono text-xs text-accent">{pad2(i + 1)}</span>
              ) : (
                <span className="mt-2.75 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              )}
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </List>
      );
    }
    case "code":
      return <CodeBlock code={block.code} caption={block.caption ?? block.lang} copyLabel={COPY.copy.copyCode} />;
    case "quote":
      return (
        <figure className="border-l-2 border-accent py-1 pl-6">
          <blockquote className="font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.cite && <figcaption className="mt-3 text-sm text-muted">— {block.cite}</figcaption>}
        </figure>
      );
    case "callout":
      return (
        <aside className="card bg-linear-to-br from-secondary/60 to-surface p-5 md:p-6">
          <p className="font-mono text-xs text-accent">{block.title}</p>
          <p className="mt-2 leading-[1.7] text-fg/85">
            <InlineText text={block.text} />
          </p>
        </aside>
      );
  }
}
