"use client";

import { COPY } from "@/constants/constant";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import Icon from "./Icon";

/** Copies the current page URL. */
export default function ShareButton() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(window.location.href)}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg"
    >
      <Icon name={copied ? "check" : "link"} />
      <span aria-live="polite">{copied ? COPY.copy.linkCopied : COPY.copy.copyLink}</span>
    </button>
  );
}
