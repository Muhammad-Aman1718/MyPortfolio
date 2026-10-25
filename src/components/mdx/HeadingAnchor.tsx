import { COPY } from "@/constants/constant";
import type { HeadingAnchorProps } from "@/types/types";

/** "#" after a heading that links to it; shown on hover or keyboard focus. */
export default function HeadingAnchor({ id, title }: HeadingAnchorProps) {
  return (
    <a
      href={`#${id}`}
      aria-label={`${COPY.post.anchorLabel}: ${title}`}
      className="heading-anchor ml-2 font-normal text-subtle no-underline opacity-0 transition-opacity duration-150 hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
    >
      #
    </a>
  );
}
