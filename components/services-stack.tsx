"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "./icons";

type Service = {
  name: string;
  description: string;
  items: string[];
  engagement: string;
  from: string;
};

/**
 * Sticky stacking cards: each card pins a little lower than the last, so they
 * pile up as you scroll. The card on top of the pile turns solid crimson;
 * the ones underneath stay grey.
 */
export default function ServicesStack({ services }: { services: Service[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const cards = Array.from(listRef.current?.children ?? []) as HTMLElement[];
    if (!cards.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      // Top of the pile = the last card that has slid past mid-screen,
      // so the colour hands over while it covers the previous one
      const line = window.innerHeight * 0.55;
      let top = 0;
      cards.forEach((card, i) => {
        if (card.getBoundingClientRect().top <= line) top = i;
      });
      setActive(top);
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

  return (
    <ol ref={listRef} className="flex flex-col gap-4 md:gap-6">
      {services.map((s, i) => {
        const on = i === active;
        return (
          <li
            key={s.name}
            style={{ top: `calc(7rem + ${i * 1.25}rem)` }}
            className={`sticky flex min-h-[300px] flex-col justify-between rounded-[24px] p-7 transition-colors duration-500 md:p-9 ${
              on ? "bg-primary text-on-primary" : "bg-surface text-fg"
            }`}
          >
            <div className="flex items-start justify-between gap-6">
              <span className={`text-sm font-medium transition-colors duration-500 ${on ? "text-white" : "text-subtle"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`text-sm transition-colors duration-500 ${on ? "text-white" : "text-subtle"}`}>
                {s.from}
              </span>
            </div>
            <div className="mt-10">
              <h3 className="font-[family-name:var(--font-space)] text-[28px] font-bold leading-tight tracking-tight md:text-[34px]">
                {s.name}
              </h3>
              <p className={`mt-3 max-w-[46ch] leading-relaxed transition-colors duration-500 ${on ? "text-white" : "text-muted"}`}>
                {s.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${s.name} includes`}>
                {s.items.map((it) => (
                  <li
                    key={it}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-500 ${
                      on ? "bg-black/15 text-white" : "bg-surface-hi text-muted"
                    }`}
                  >
                    {it}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className={`mt-7 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                  on ? "text-white underline-offset-4 hover:underline" : "text-fg hover:text-muted"
                }`}
              >
                See what&apos;s included <ArrowUpRight />
              </Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
