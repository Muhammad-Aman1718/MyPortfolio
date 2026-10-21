"use client";

import { useEffect, useRef, useState } from "react";

/** Copies text; the label swaps to a confirmation briefly (announced politely). */
export default function CopyButton({ text, label = "Copy", className = "" }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setDone(false), 1800);
    } catch {
      /* clipboard blocked — leave the label unchanged */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 font-[family-name:var(--font-jetbrains)] text-xs text-muted transition-colors duration-150 hover:bg-fg/[0.06] hover:text-fg ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {done ? <path d="M20 6 9 17l-5-5" /> : <path d="M9 9h10v10H9zM5 15V5h10" />}
      </svg>
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}
