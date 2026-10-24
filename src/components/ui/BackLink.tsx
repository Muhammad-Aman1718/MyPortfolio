import Link from "next/link";
import { TRANSITION_BACK } from "@/constants/constant";
import Icon from "./Icon";
import type { BackLinkProps } from "@/types/types";

/** "← All posts" style link back to a list; tagged so the page slides the right way. */
export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      transitionTypes={TRANSITION_BACK}
      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
    >
      <span className="inline-block rotate-180 transition-transform duration-200 group-hover:-translate-x-1">
        <Icon name="arrowRight" />
      </span>
      {label}
    </Link>
  );
}
