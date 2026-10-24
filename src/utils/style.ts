import type { CSSProperties } from "react";
import type { EnterAnimation, EnterProps } from "@/types/types";

/** Joins class names, skipping falsy values. */
export const cn = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(" ");

/** Delay (ms) for CSS on-load entrances, read by `[data-enter]` in globals.css. */
export const delayStyle = (ms: number): CSSProperties => ({ "--d": ms }) as CSSProperties;

/** Spread onto an element to play a CSS entrance after `ms`. */
export const enter = (name: EnterAnimation, ms = 0): EnterProps => ({
  "data-enter": name,
  style: delayStyle(ms),
});

/** Index for the `.stagger-in` CSS stagger. */
export const staggerStyle = (index: number): CSSProperties => ({ "--i": index }) as CSSProperties;

/** Tone helper for content sitting on a solid primary card vs. a grey one. */
export const onPrimary = (active: boolean | undefined, primaryClass: string, defaultClass: string): string =>
  active ? primaryClass : defaultClass;
