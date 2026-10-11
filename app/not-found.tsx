"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const lines = [
  "$ locate page",
  "error 404: not found",
  "$ suggestions:",
];

export default function NotFound() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setShown(i);
      if (i > lines.length) clearInterval(timer);
    }, reduced ? 0 : 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-16">
      <div className="card w-full max-w-[560px] overflow-hidden rounded-[12px] p-0">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-error/70" />
          <span className="h-3 w-3 rounded-full bg-accent/50" />
          <span className="h-3 w-3 rounded-full bg-primary/70" />
        </div>
        <div className="flex min-h-[220px] flex-col gap-2 p-6 font-[family-name:var(--font-jetbrains)] text-sm">
          {lines.slice(0, shown).map((l, i) => (
            <p key={l} className={i === 1 ? "text-error" : "text-muted"}>{l}</p>
          ))}
          {shown > lines.length && (
            <div className="flex flex-col gap-1 pl-4">
              <Link href="/" className="text-accent hover:underline">→ /home</Link>
              <Link href="/projects" className="text-accent hover:underline">→ /projects</Link>
              <Link href="/posts" className="text-accent hover:underline">→ /posts</Link>
            </div>
          )}
        </div>
      </div>
      <p className="mt-8 text-muted">This page doesn&apos;t exist.</p>
      <Link href="/" className="btn-primary mt-4">Back to home</Link>
    </div>
  );
}
