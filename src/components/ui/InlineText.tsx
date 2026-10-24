import { Fragment } from "react";
import Link from "next/link";
import { INLINE_LINK_PATTERN, INLINE_TOKEN_PATTERN } from "@/constants/constant";
import type { InlineTextProps } from "@/types/types";

/** Renders inline markup inside long-form text. */
export default function InlineText({ text }: InlineTextProps) {
  return (
    <>
      {text.split(INLINE_TOKEN_PATTERN).map((part, i) => {
        if (part.startsWith("`")) {
          return (
            <code key={i} className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.88em] text-fg">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-fg">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(INLINE_LINK_PATTERN);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={i} href={href}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href}>
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
