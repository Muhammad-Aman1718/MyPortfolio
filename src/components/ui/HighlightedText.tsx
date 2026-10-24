import type { HighlightedTextProps } from "@/types/types";

/** Plain text with the highlighted words wrapped in <em> (styled in the primary colour). */
export default function HighlightedText({ text, highlight }: HighlightedTextProps) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          {highlight?.includes(word) ? <em>{word}</em> : word}
        </span>
      ))}
    </>
  );
}
