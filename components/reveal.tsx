"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children with a stagger instead of the wrapper itself */
  stagger?: boolean;
  delay?: number;
  as?: "div" | "section" | "ul" | "span";
};

/** Heavy scroll reveal — deep rise + blur-to-sharp + slight scale, staggered siblings, runs once. */
export default function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = stagger && el.children.length ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: reduced ? 0 : 48,
          scale: reduced ? 1 : 0.96,
          filter: reduced ? "blur(0px)" : "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: reduced ? 0.3 : 0.9,
          ease: "power3.out",
          delay,
          stagger: 0.1,
          clearProps: "filter,transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
