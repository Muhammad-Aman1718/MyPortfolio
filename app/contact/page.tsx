"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Reveal from "@/components/reveal";

const faqs = [
  { q: "Why are you expensive?", a: "Because the total cost of software is the build price plus everything that breaks after. My clients pay more upfront and dramatically less over the product's life. That trade is the whole point." },
  { q: "How do budgets work?", a: "Fixed-scope projects get a fixed price after a discovery call. Ongoing work is billed weekly. Either way, you'll never get a surprise invoice." },
  { q: "What's a typical timeline?", a: "A production mobile app: 8–14 weeks. A web application: 4–10 weeks. An audit: 1–2 weeks. Real numbers come after discovery." },
  { q: "How do we communicate?", a: "A shared Slack or email thread, a weekly demo call, and written progress notes. No status-meeting theater." },
  { q: "What happens after launch?", a: "Every project includes a support window (typically 3 months). After that, a retainer or as-needed hourly work — your choice." },
  { q: "Do you work with agencies?", a: "Yes, both white-label and credited. Same standards either way." },
];

function ContactForm() {
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
      <div className="card flex flex-col items-center justify-center gap-4 p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="font-[family-name:var(--font-space)] text-2xl font-semibold">Got it</h2>
        <p className="text-muted">Expect a reply within 48 hours.</p>
        <button onClick={() => setSent(false)} className="btn-secondary mt-2">Back</button>
      </div>
    );
  }

  const inputCls =
    "h-11 w-full rounded-[10px] border border-line bg-surface px-4 text-sm outline-none transition-shadow duration-150 focus:ring-2 focus:ring-accent/60";

  return (
    <form onSubmit={onSubmit} className="card flex flex-col gap-5 p-8">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-[13px] text-muted">
          Name
          <input required name="name" className={inputCls} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-2 text-[13px] text-muted">
          Email
          <input required type="email" name="email" className={inputCls} placeholder="you@company.com" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-[13px] text-muted">
          Project type
          <select
            name="type"
            defaultValue={params.get("service") ?? ""}
            className={inputCls}
          >
            <option value="">Select…</option>
            <option>Mobile App Development</option>
            <option>Web Application Development</option>
            <option>Technical Consulting</option>
            <option>Other</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-[13px] text-muted">
          Budget range <span className="text-xs">(optional)</span>
          <select name="budget" className={inputCls} defaultValue="">
            <option value="">Select…</option>
            <option>under $2k</option>
            <option>$2–5k</option>
            <option>$5–15k</option>
            <option>$15k+</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-[13px] text-muted">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="w-full rounded-[10px] border border-line bg-surface p-4 text-sm outline-none transition-shadow duration-150 focus:ring-2 focus:ring-accent/60"
          placeholder="What are you building?"
        />
      </label>

      <button type="submit" disabled={sending} className="btn-primary disabled:opacity-70">
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="mx-auto mt-32 max-w-[720px]">
      <Reveal className="text-center">
        <p className="eyebrow">{"// faq"}</p>
        <h2 className="mt-3 font-[family-name:var(--font-space)] text-[28px] font-semibold md:text-[32px]">
          Common questions
        </h2>
      </Reveal>
      <div className="mt-10">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b border-line">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium"
            >
              {f.q}
              <span
                className={`text-accent transition-transform duration-200 ${
                  openIdx === i ? "rotate-45" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {openIdx === i && (
              <p className="pb-5 pr-8 text-sm leading-relaxed text-muted">{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal stagger>
            <p className="eyebrow">{"// contact"}</p>
            <h1 className="mt-3 font-[family-name:var(--font-space)] text-[32px] font-semibold md:text-[48px]">
              Let&apos;s build something
            </h1>
            <p className="mt-5 max-w-[46ch] text-muted">
              Tell me about your project — the honest version, including the messy parts.
              That&apos;s usually where the interesting work is.
            </p>
            <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-sm">
              <a href="mailto:admin@behafiz.com" className="text-accent hover:underline">
                admin@behafiz.com
              </a>
            </p>
            <p className="mt-2 text-sm text-muted">Replies within 24–48h</p>

            <div className="card mt-8 flex items-center gap-3 p-5">
              <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="text-sm">Available for new projects from September</span>
            </div>

            <div className="mt-8 flex gap-5">
              {["GitHub", "LinkedIn", "X"].map((s) => (
                <a key={s} href="#" className="text-sm text-muted transition-colors duration-150 hover:text-accent">
                  {s}
                </a>
              ))}
            </div>

            <p className="mt-10 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">
              Karachi, Pakistan — working worldwide (UTC+5)
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <Suspense>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </div>

      <Faq />
    </div>
  );
}
