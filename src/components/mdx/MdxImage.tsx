import ArticleImage from "./ArticleImage";
import type { MdxImageProps } from "@/types/types";

/**
 * Markdown image: `![Alt text](/images/posts/chart.png "Optional caption")`.
 * Markdown puts images inside a paragraph, so this renders spans, not a <figure>.
 */
export default function MdxImage({ src, alt = "", title }: MdxImageProps) {
  if (typeof src !== "string" || !src) return null;
  return (
    <span className="mdx-figure block">
      <ArticleImage src={src} alt={alt} />
      {title && <span className="mdx-caption block">{title}</span>}
    </span>
  );
}
