import CopyButton from "./CopyButton";
import type { CodeBlockProps } from "@/types/types";

/** Captioned code panel with a copy button (article code samples, BibTeX citations). */
export default function CodeBlock({ code, caption, copyLabel }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden rounded-[14px] border border-line bg-code">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-xs text-muted">{caption}</span>
        <CopyButton text={code} label={copyLabel} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.7] text-fg/85">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
