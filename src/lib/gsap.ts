/**
 * GSAP with Flip registered, downloaded on first use: every effect that needs
 * it runs after the page has painted (scroll reveals below the fold, hover,
 * filtering), so it stays out of the startup bundle. Import from here, not
 * from "gsap".
 */
export type Gsap = typeof import("gsap").gsap;
export type FlipPlugin = typeof import("gsap/Flip").Flip;

let modules: Promise<{ gsap: Gsap; Flip: FlipPlugin }> | undefined;

export const loadGsap = () =>
  (modules ??= Promise.all([import("gsap"), import("gsap/Flip")]).then(([{ gsap }, { Flip }]) => {
    gsap.registerPlugin(Flip);
    return { gsap, Flip };
  }));
