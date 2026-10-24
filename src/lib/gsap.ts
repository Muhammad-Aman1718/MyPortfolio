/** GSAP with its plugins registered once — import gsap from here, not from "gsap". */
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip);

export { gsap, Flip, ScrollTrigger };
