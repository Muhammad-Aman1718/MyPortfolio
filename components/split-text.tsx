type Enter = "mask" | "skew" | "blur" | "rise";

/**
 * Splits text into words (or lines with `by="line"`) so each piece can animate
 * on its own. With `enter`, pieces animate on load in pure CSS (no hydration
 * wait); without it they're left for a scroll <Reveal variant="mask"> to drive.
 * Pieces stay in the accessibility tree joined by real spaces, so screen readers
 * and crawlers read the sentence once (no hidden duplicate copy).
 */
export default function SplitText({
  text,
  by = "word",
  enter,
  delay = 0,
  step = 60,
  accent,
  className,
}: {
  text: string;
  by?: "word" | "line";
  enter?: Enter;
  /** ms before the first piece */
  delay?: number;
  /** ms between pieces */
  step?: number;
  /** pieces (exact match) rendered in the accent colour */
  accent?: string[];
  className?: string;
}) {
  const pieces = by === "line" ? text.split("\n") : text.split(" ");
  const masked = !enter || enter === "mask" || enter === "skew";

  return (
    <span className={className}>
      <span>
        {pieces.map((p, i) => {
          const inner = (
            <span
              data-enter={enter}
              style={enter ? ({ "--d": delay + i * step } as React.CSSProperties) : undefined}
              className={`inline-block ${accent?.includes(p) ? "text-accent" : ""}`}
            >
              {p}
            </span>
          );
          // Lines get a space before the break so the text still reads as separate words when flattened
          const sep = by === "line" ? (i < pieces.length - 1 ? <>{" "}<br /></> : null) : i < pieces.length - 1 ? " " : null;
          return (
            <span key={i}>
              {masked ? <span className="mask-line">{inner}</span> : inner}
              {sep}
            </span>
          );
        })}
      </span>
    </span>
  );
}
