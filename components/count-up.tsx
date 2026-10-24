"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Keeps the value's own precision (0.3 stays 0.3) and groups thousands. */
const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Numbers count up once when they scroll into view (tabular figures, ease-out).
 * The server renders the real value, so crawlers and no-JS visitors see it;
 * numbers already on screen at load stay put instead of flashing to 0.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const decimals = (String(value).split(".")[1] ?? "").length;
  const final = `${prefix}${format(value, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Matches the trigger line below: anything already past it would flash to 0
    const onScreen = el.getBoundingClientRect().top < window.innerHeight * 0.9;
    if (reduced || onScreen) {
      el.textContent = final;
      return;
    }
    el.textContent = `${prefix}${format(0, decimals)}${suffix}`;
    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${format(counter.n, decimals)}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, prefix, suffix, decimals, final]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {final}
    </span>
  );
}
