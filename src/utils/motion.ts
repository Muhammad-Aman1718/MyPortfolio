/** Browser capability checks for motion and pointer effects (safe during SSR). */

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const canHover = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * "top 88%" → the observer margin that fires when an element's top crosses 88%
 * of the viewport. The area also reaches far above the screen, so an element
 * skipped over by a fast scroll or an anchor jump still counts as entered.
 */
const marginFor = (start: string): string => {
  const percent = Number(/(\d+(?:\.\d+)?)%/.exec(start)?.[1] ?? 100);
  return `100000px 0px -${100 - percent}% 0px`;
};

/**
 * Runs `onEnter` once, the first time `el`'s top passes the `start` line
 * ("top 88%"). Uses IntersectionObserver, so unlike ScrollTrigger it never
 * forces a layout read while the page is loading. `onFirst` runs before that,
 * on the very first observation, with whether any part of `el` was already on
 * screen or above it (seen at load) — measured by the observer, not by a
 * layout read. Returns a cleanup function.
 */
export const onceInView = (
  el: Element,
  start: string,
  onEnter: () => void,
  onFirst?: (seenAtLoad: boolean) => void,
): (() => void) => {
  let first = true;
  const io = new IntersectionObserver(
    ([entry]) => {
      const inView = entry.isIntersecting;
      if (first) onFirst?.(entry.boundingClientRect.top < window.innerHeight);
      first = false;
      if (inView) {
        io.disconnect();
        onEnter();
      }
    },
    { rootMargin: marginFor(start) },
  );
  io.observe(el);
  return () => io.disconnect();
};
