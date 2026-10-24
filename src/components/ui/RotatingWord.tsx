"use client";

import { UI } from "@/constants/constant";
import useRotatingWord from "@/hooks/useRotatingWord";
import { cn } from "@/utils/style";
import type { RotatingWordProps } from "@/types/types";

/**
 * Slot-machine word: words are stacked in a clipped window and roll up one
 * line at a time, while the window's width eases to the next word so the rest
 * of the sentence slides along. Screen readers get the full list once.
 */
export default function RotatingWord({ words, interval = UI.rotateEveryMs }: RotatingWordProps) {
  const { index, width, setWordRef } = useRotatingWord(words.length, interval);

  return (
    <span className="rotating-word" style={{ width }}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="rotating-word-track" style={{ transform: `translateY(-${index * 1.18}em)` }}>
        {words.map((word, n) => (
          <span
            key={word}
            ref={setWordRef(n)}
            className={cn("rotating-word-item", n === index ? "opacity-100" : "opacity-0")}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
