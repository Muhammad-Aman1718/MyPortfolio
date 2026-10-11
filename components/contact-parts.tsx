"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowIcon } from "./icons";

export function ContactForm() {
  const params = useSearchParams();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot check
    if ((form.elements.namedItem("website") as HTMLInputElement)?.value) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  if (sent) {
    return (
      <div className="card panel-in flex min-h-[420px] flex-col items-center justify-center gap-4 p-12 text-center" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary ring-8 ring-secondary/40">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path className="draw-check" d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="font-[family-name:var(--font-space)] text-2xl font-semibold">Got it</h2>
        <p className="text-muted">Expect a reply within 48 hours.</p>
        <button onClick={() => setSent(false)} className="btn-secondary mt-2">Back</button>
      </div>
    );
  }

  const labelCls = "flex flex-col gap-2 text-[13px] text-muted";
  const inputCls = "field h-11 px-4";

  return (
    <form onSubmit={onSubmit} className="card flex flex-col gap-5 p-6 md:p-8">
      <div className="flex items-center justify-between border-b border-line pb-5">
        <p className="font-[family-name:var(--font-space)] text-lg font-medium">Project brief</p>
        <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">~2 min</p>
      </div>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelCls}>
          Name
          <input required name="name" autoComplete="name" className={inputCls} placeholder="Your name" />
        </label>
        <label className={labelCls}>
          Email
          <input required type="email" name="email" autoComplete="email" className={inputCls} placeholder="you@company.com" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelCls}>
          Project type
          <select name="type" defaultValue={params.get("service") ?? ""} className={inputCls}>
            <option value="">Select…</option>
            <option>Mobile App Development</option>
            <option>Web Application Development</option>
            <option>Technical Consulting</option>
            <option>Other</option>
          </select>
        </label>
        <label className={labelCls}>
          <span>
            Budget range <span className="text-xs text-muted/70">(optional)</span>
          </span>
          <select name="budget" className={inputCls} defaultValue="">
            <option value="">Select…</option>
            <option>under $2k</option>
            <option>$2–5k</option>
            <option>$5–15k</option>
            <option>$15k+</option>
          </select>
        </label>
      </div>

      <label className={labelCls}>
        Message
        <textarea required name="message" rows={5} className="field resize-y p-4" placeholder="What are you building?" />
      </label>

      <button type="submit" disabled={sending} className="btn-primary !h-12 disabled:opacity-70">
        {sending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/30 border-t-on-primary" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>Send message {ArrowIcon}</>
        )}
      </button>
    </form>
  );
}

const faqs = [
  { q: "Why are you expensive?", a: "Because the total cost of software is the build price plus everything that breaks after. My clients pay more upfront and dramatically less over the product's life. That trade is the whole point." },
  { q: "How do budgets work?", a: "Fixed-scope projects get a fixed price after a discovery call. Ongoing work is billed weekly. Either way, you'll never get a surprise invoice." },
  { q: "What's a typical timeline?", a: "A production mobile app: 8–14 weeks. A web application: 4–10 weeks. An audit: 1–2 weeks. Real numbers come after discovery." },
  { q: "How do we communicate?", a: "A shared Slack or email thread, a weekly demo call, and written progress notes. No status-meeting theater." },
  { q: "What happens after launch?", a: "Every project includes a support window (typically 3 months). After that, a retainer or as-needed hourly work — your choice." },
  { q: "Do you work with agencies?", a: "Yes, both white-label and credited. Same standards either way." },
];

/** FAQ accordion — panels animate open via grid-rows (no height measuring). */
export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {faqs.map((f, i) => {
        const open = openIdx === i;
        return (
          <div key={f.q} className="border-b border-line">
            <h3>
              <button
                id={`faq-q-${i}`}
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-a-${i}`}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left font-medium transition-colors duration-150 hover:text-accent"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {f.q}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-accent transition-all duration-300 ${
                    open ? "rotate-45 border-accent/60 bg-secondary" : "border-line group-hover:border-accent/60"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              data-open={open}
              inert={!open}
              className="accordion-panel"
            >
              <div>
                <p className="pb-5 pl-9 pr-12 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
