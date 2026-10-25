import CopyButton from "./CopyButton";
import type { CodeBlockProps } from "@/types/types";

/**
 * Code panel: filename/caption and language label in the header, a copy
 * button, and the code underneath (pre-highlighted children, or plain text).
 * Long lines scroll sideways inside the panel instead of widening the page.
 */
export default function CodeBlock({ code, caption, language, copyLabel, children }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden rounded-[14px] border border-line bg-code">
      <div className="flex items-center justify-between gap-3 border-b border-line py-2 pl-4 pr-2">
        <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted">
          {caption && <span className="truncate">{caption}</span>}
          {language && (
            <span className="shrink-0 rounded-md bg-fg/6 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-subtle">
              {language}
            </span>
          )}
        </span>
        <CopyButton text={code} label={copyLabel} />
      </div>
      {children ?? (
        <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.7] text-fg/85">
          <code>{code}</code>
        </pre>
      )}
    </figure>
  );
}
