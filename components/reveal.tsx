"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, revealPresets, type RevealVariant } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Motion preset — pick per section, see lib/motion.ts */
  variant?: RevealVariant;
  /** Animate direct children with a stagger instead of the wrapper itself */
  stagger?: boolean;
  /** Animate elements matching this selector (inside the wrapper) instead */
  targets?: string;
  /** Override the preset's per-item stagger (seconds) */
  each?: number;
  /** Where the stagger starts from */
  from?: "start" | "center" | "end" | "edges";
  delay?: number;
  duration?: number;
  /** ScrollTrigger start position */
  start?: string;
  as?: "div" | "section" | "ul" | "ol" | "span";
  id?: string;
};

/** Scroll reveal that runs once. Configured per use so sections don't all move alike. */
export default function Reveal({
  children,
  className,
  variant = "fade-up",
  stagger = false,
  targets,
  each,
  from = "start",
  delay = 0,
  duration,
  start = "top 88%",
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => gsap.set(el, { visibility: "visible" });
    if (prefersReducedMotion()) {
      show();
      return;
    }

    const preset = revealPresets[variant];
    const nodes = targets
      ? Array.from(el.querySelectorAll(targets))
      : stagger
        ? Array.from(el.children)
        : [el];
    if (!nodes.length) {
      show();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(nodes, preset.from, {
        ...preset.to,
        duration: duration ?? preset.duration,
        ease: preset.ease,
        delay,
        stagger: { each: each ?? preset.stagger, from },
        clearProps: "transform,filter,clipPath",
        scrollTrigger: { trigger: el, start, once: true },
      });
      // Targets now carry their own hidden state; un-hide the wrapper.
      if (nodes[0] !== el || !("autoAlpha" in preset.from)) show();
    }, el);

    return () => ctx.revert();
  }, [variant, stagger, targets, each, from, delay, duration, start]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} id={id} data-reveal="">
      {children}
    </Tag>
  );
}
