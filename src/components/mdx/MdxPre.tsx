import { COPY } from "@/constants/constant";
import { cn } from "@/utils/style";
import CodeBlock from "@/components/ui/CodeBlock";
import type { MdxPreProps } from "@/types/types";

/** A fenced code block, already highlighted on the server, inside the shared code panel. */
export default function MdxPre({
  "data-raw": raw = "",
  "data-language": language,
  "data-title": title,
  "data-line-numbers": lineNumbers,
  className,
  children,
}: MdxPreProps) {
  return (
    <CodeBlock code={raw} caption={title} language={language} copyLabel={COPY.copy.copyCode}>
      {/* Focusable so keyboard users can scroll long lines */}
      <pre className={cn(className, "code-pre")} data-line-numbers={lineNumbers} tabIndex={0}>
        {children}
      </pre>
    </CodeBlock>
  );
}
