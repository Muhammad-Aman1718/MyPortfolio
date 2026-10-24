"use client";

import { useEffect, useRef, useState } from "react";
import { UI } from "@/constants/constant";

/**
 * Which sticky card is on top of the pile: the last one that has slid past
 * the hand-over line, so the colour moves as it covers the previous card.
 */
export default function useServicesStack() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const cards = Array.from(listRef.current?.children ?? []) as HTMLElement[];
    if (!cards.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * UI.stackHandoverAt;
      setActive(cards.reduce((top, card, i) => (card.getBoundingClientRect().top <= line ? i : top), 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { listRef, active };
}
