"use client";

import { COPY } from "@/constants/constant";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { cn } from "@/utils/style";
import Icon from "./Icon";
import type { CopyButtonProps } from "@/types/types";

/** Copies text; the label swaps to a confirmation briefly (announced politely). */
export default function CopyButton({ text, label = COPY.copy.copy, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={cn(
        "inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 font-mono text-xs text-muted transition-colors duration-150 hover:bg-fg/6 hover:text-fg",
        className,
      )}
    >
      <Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
      <span aria-live="polite">{copied ? COPY.copy.copied : label}</span>
    </button>
  );
}
