import ArticleImage from "./ArticleImage";
import type { FigureProps } from "@/types/types";

/** `<Figure src alt caption width height />` — an image with a caption (diagrams, charts, screenshots). */
export default function Figure({ src, alt, caption, width, height }: FigureProps) {
  return (
    <figure className="mdx-figure">
      <ArticleImage src={src} alt={alt} width={width} height={height} />
      {caption && <figcaption className="mdx-caption">{caption}</figcaption>}
    </figure>
  );
}
