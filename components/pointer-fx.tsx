"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { canHover, prefersReducedMotion } from "@/lib/motion";

/**
 * One delegated listener drives every `.spotlight` element's cursor glow —
 * cheaper than a handler per card and no React state involved.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!canHover()) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

/** Pulls its child slightly toward the cursor. Used on primary CTAs only. */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children}
    </span>
  );
}

/** Subtle 3D tilt toward the cursor (hero visual). */
export function Tilt({ children, className = "", max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover() || prefersReducedMotion()) return;
    gsap.set(el, { transformPerspective: 1100 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * max * 2);
      rx(-py * max * 2);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, [max]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
