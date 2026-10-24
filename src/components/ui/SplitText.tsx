import { cn, delayStyle } from "@/utils/style";
import type { SplitTextProps } from "@/types/types";

/**
 * Splits text into words so each can animate on its own. With `enter`, words
 * animate on load in pure CSS (no hydration wait); without it they're left for
 * a scroll reveal to drive. Words stay joined by real spaces, so screen readers
 * and crawlers read the sentence once.
 */
export default function SplitText({ text, enter, delay = 0, step = 60, accent, className }: SplitTextProps) {
  const words = text.split(" ");
  const masked = !enter || enter === "mask" || enter === "skew";

  return (
    <span className={className}>
      {words.map((word, i) => {
        const inner = (
          <span
            data-enter={enter}
            style={enter ? delayStyle(delay + i * step) : undefined}
            className={cn("inline-block", accent?.includes(word) && "text-accent")}
          >
            {word}
          </span>
        );
        return (
          <span key={i}>
            {masked ? <span className="mask-line">{inner}</span> : inner}
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </span>
  );
}
