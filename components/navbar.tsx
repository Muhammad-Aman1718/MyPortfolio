"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/posts", label: "Posts" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide the bar in from the top on first load
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const tween = gsap.fromTo(
      el,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
    return () => {
      tween.kill();
    };
  }, []);

  // Staggered reveal of overlay links (spec §3.5)
  useEffect(() => {
    if (!open || !overlayRef.current) return;
    const items = overlayRef.current.querySelectorAll("a");
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.05 }
    );
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div
        className={`glass pointer-events-auto flex h-14 w-fit max-w-full items-center gap-1 rounded-full border border-line pl-5 pr-2 transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            : "shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
        }`}
      >
        <Link
          href="/"
          className="mr-3 font-[family-name:var(--font-space)] text-xl font-semibold tracking-tight"
        >
          H<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-6 px-3 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm transition-colors duration-150 ${
                active(l.href)
                  ? "text-accent after:absolute after:-bottom-1.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-accent"
                  : "text-muted hover:text-fg"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="btn-primary ml-3 hidden !h-10 rounded-full text-sm lg:inline-flex"
        >
          Hire me
        </Link>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Full-screen mobile overlay */}
      {open && (
        <div
          ref={overlayRef}
          className="pointer-events-auto fixed inset-0 top-24 z-40 flex flex-col gap-2 bg-background px-6 pt-10 lg:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-2 font-[family-name:var(--font-space)] text-[32px] font-medium ${
                active(l.href) ? "text-accent" : "text-fg"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
