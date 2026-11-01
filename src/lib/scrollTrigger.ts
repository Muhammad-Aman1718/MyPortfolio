/**
 * GSAP with ScrollTrigger, kept apart from `@/lib/gsap` so only the scrubbed
 * effects that need it load it (scroll reveals use IntersectionObserver).
 */
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
