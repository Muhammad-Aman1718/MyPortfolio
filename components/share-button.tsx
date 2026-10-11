"use client";

import { useState } from "react";

/** Copies the current page URL. */
export default function ShareButton() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard blocked */
        }
      }}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {done ? <path d="M20 6 9 17l-5-5" /> : <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />}
      </svg>
      <span aria-live="polite">{done ? "Link copied" : "Copy link"}</span>
    </button>
  );
}
