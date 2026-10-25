import Link from "next/link";
import { COPY } from "@/constants/constant";
import { isExternalUrl } from "@/utils/image";
import type { MdxLinkProps } from "@/types/types";

/**
 * Article links: site paths use the client router, in-page anchors (footnotes,
 * sections) stay plain, and external links open in a new tab, announced to
 * screen readers.
 */
export default function MdxLink({ href = "", children, ...rest }: MdxLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  if (!isExternalUrl(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> {COPY.post.opensInNewTab}</span>
    </a>
  );
}
