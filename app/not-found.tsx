import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = { title: "Page not found" };

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const routes = [
  { href: "/projects", label: "Projects", note: "Selected web & mobile work" },
  { href: "/experience", label: "Experience", note: "Where I've built" },
  { href: "/posts", label: "Posts", note: "Articles & research" },
  { href: "/contact", label: "Contact", note: "Start a conversation" },
];

/** 404 — poster-sized numerals (the 0 in crimson), one clear way home, and the likely destinations. */
export default function NotFound() {
  return (
    <div className="container-site page-top flex min-h-[100svh] flex-col pb-10">
      <p data-enter="rise" className="eyebrow">Error 404</p>

      <div className="flex flex-1 flex-col justify-center py-8">
        <p aria-hidden="true" className="h-mega -ml-[0.05em] select-none text-[42vw] leading-[0.78] md:text-[min(30vw,22rem)]">
          <span data-enter="blur" style={d(100)} className="inline-block">4</span>
          <span data-enter="blur" style={d(220)} className="inline-block text-primary">0</span>
          <span data-enter="blur" style={d(340)} className="inline-block">4</span>
        </p>
        <h1 data-enter="rise" style={d(450)} className="h-display mt-8 max-w-[18ch] text-[36px] font-bold md:text-[52px]">
          This page took a <em>wrong turn.</em>
        </h1>
        <p data-enter="rise" style={d(550)} className="mt-4 max-w-[48ch] text-lg text-muted">
          The link may be old or mistyped. Everything that exists is one click away below.
        </p>
        <div data-enter="pop" style={d(650)} className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Back to home {ArrowIcon}
          </Link>
          <Link href="/contact" className="btn-secondary">
            Report a broken link
          </Link>
        </div>
      </div>

      <nav aria-label="Popular pages" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {routes.map((r, i) => (
          <Link
            key={r.href}
            href={r.href}
            data-enter="rise"
            style={d(750 + i * 70)}
            className="group flex items-center justify-between gap-4 rounded-[20px] bg-surface p-5 transition-colors duration-200 hover:bg-surface-hi"
          >
            <span>
              <span className="block font-[family-name:var(--font-space)] text-lg font-bold">{r.label}</span>
              <span className="text-sm text-subtle">{r.note}</span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-hi transition-[background-color,transform] duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-on-primary">
              <ArrowUpRight />
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
