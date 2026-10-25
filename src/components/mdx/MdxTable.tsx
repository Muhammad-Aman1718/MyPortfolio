import type { MdxTableProps } from "@/types/types";

/** Markdown table in a panel that scrolls sideways on narrow screens. */
export default function MdxTable({ children }: MdxTableProps) {
  return (
    <div className="mdx-table" tabIndex={0}>
      <table>{children}</table>
    </div>
  );
}
