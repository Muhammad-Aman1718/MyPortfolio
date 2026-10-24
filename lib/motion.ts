/**
 * Motion presets for scroll reveals. Each section picks the preset that fits
 * its content instead of every block sharing the same rise-and-blur.
 * Staggers follow ui-ux-pro-max `stagger-sequence` (30–80ms per item).
 */

export type RevealVariant =
  | "fade-up" // default: short, quiet rise
  | "fade" // opacity only — dense text
  | "slide-left" // enters from the left
  | "slide-right" // enters from the right
  | "scale" // pop-in for tiles and stats
  | "clip-up" // wipes open bottom → top (images, previews)
  | "clip-left" // wipes open left → right
  | "clip-right" // wipes open right → left
  | "tilt" // 3D flip-up for feature cards
  | "mask" // words/lines rise from behind a mask (use with .mask-line)
  | "blur"; // rack-focus, reserved for a single hero-like moment per page

type Preset = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration: number;
  ease: string;
  stagger: number;
};

const SHOWN = { autoAlpha: 1, x: 0, y: 0 };

export const revealPresets: Record<RevealVariant, Preset> = {
  "fade-up": {
    from: { autoAlpha: 0, y: 24 },
    to: SHOWN,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.05,
  },
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
    duration: 0.8,
    ease: "power1.out",
    stagger: 0.05,
  },
  "slide-left": {
    from: { autoAlpha: 0, x: -36 },
    to: SHOWN,
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.05,
  },
  "slide-right": {
    from: { autoAlpha: 0, x: 36 },
    to: SHOWN,
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.05,
  },
  scale: {
    // ui-ux-pro-max "Stagger List" preset (bento / tiles)
    from: { autoAlpha: 0, scale: 0.92, y: 16 },
    to: { ...SHOWN, scale: 1 },
    duration: 0.45,
    ease: "back.out(1.4)",
    stagger: 0.06,
  },
  "clip-up": {
    from: { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0% round 16px)", y: 30 },
    to: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 16px)", y: 0 },
    duration: 1,
    ease: "expo.out",
    stagger: 0.08,
  },
  "clip-left": {
    from: { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0% round 16px)" },
    to: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" },
    duration: 1,
    ease: "expo.inOut",
    stagger: 0.08,
  },
  "clip-right": {
    from: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 100% round 16px)" },
    to: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" },
    duration: 1,
    ease: "expo.inOut",
    stagger: 0.08,
  },
  tilt: {
    from: {
      autoAlpha: 0,
      y: 40,
      rotateX: -16,
      transformPerspective: 1000,
      transformOrigin: "50% 0%",
    },
    to: { ...SHOWN, rotateX: 0 },
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.06,
  },
  mask: {
    from: { yPercent: 110 },
    to: { yPercent: 0 },
    duration: 0.9,
    ease: "power4.out",
    stagger: 0.04,
  },
  blur: {
    from: { autoAlpha: 0, y: 24, filter: "blur(10px)" },
    to: { ...SHOWN, filter: "blur(0px)" },
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.06,
  },
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
