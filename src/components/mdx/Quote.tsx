import type { QuoteProps } from "@/types/types";

/** Pull quote. Markdown `> text` uses it too; `<Quote cite="Name">` adds attribution. */
export default function Quote({ cite, children }: QuoteProps) {
  return (
    <figure className="border-l-2 border-accent py-1 pl-6">
      <blockquote className="mdx-quote font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
        {children}
      </blockquote>
      {cite && <figcaption className="mt-3 text-sm text-muted">— {cite}</figcaption>}
    </figure>
  );
}
