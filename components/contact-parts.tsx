"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowIcon } from "./icons";
import { site } from "@/lib/site";

type Field = "name" | "email" | "message";

/** Says what's wrong and how to fix it (ui-ux-pro-max: error-clarity). */
function validate(field: Field, value: string): string {
  const v = value.trim();
  if (field === "name") return v ? "" : "Please enter your name.";
  if (field === "email") {
    if (!v) return "Please enter your email so I can reply.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "That email looks incomplete — use a format like you@company.com.";
  }
  return v.length >= 10 ? "" : "Tell me a little about the project (at least 10 characters).";
}

/** Error text under its field: icon + words, never colour alone. */
function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <span id={id} aria-live="polite" className="min-h-0 text-xs">
      {message && (
        <span className="flex items-start gap-1.5 text-error">
          <svg viewBox="0 0 24 24" className="mt-px h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5M12 16h.01" />
          </svg>
          {message}
        </span>
      )}
    </span>
  );
}

/**
 * Project brief. There is no mail backend, so a valid brief opens the
 * visitor's email app with the message addressed and filled in.
 */
export function ContactForm() {
  const params = useSearchParams();
  const [opened, setOpened] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  // Validate when the user leaves a field; once a field shows an error, re-check as they type so it clears.
  const check = (field: Field, value: string) => setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => check(e.target.name as Field, e.target.value);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const f = e.target.name as Field;
    if (errors[f]) check(f, e.target.value);
  };
  const a11y = (f: Field) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": `${f}-error`,
    onBlur,
    onChange,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = (name: string) => ((form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "").trim();
    // Honeypot check
    if (value("website")) return;
    const next = Object.fromEntries((["name", "email", "message"] as Field[]).map((f) => [f, validate(f, value(f))])) as Record<Field, string>;
    setErrors(next);
    const firstInvalid = (["name", "email", "message"] as Field[]).find((f) => next[f]);
    if (firstInvalid) {
      // Move focus to the first problem (ui-ux-pro-max: focus-management)
      (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      return;
    }
    const subject = `Project enquiry from ${value("name")}${value("type") ? ` — ${value("type")}` : ""}`;
    const details = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      ...(value("type") ? [`Project type: ${value("type")}`] : []),
      ...(value("budget") ? [`Budget: ${value("budget")}`] : []),
    ];
    const body = [value("message"), "", "—", ...details].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  if (opened) {
    return (
      <div className="card panel-in flex min-h-[420px] flex-col items-center justify-center gap-4 p-12 text-center" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path className="draw-check" d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold">Almost there</h2>
        <p className="max-w-[40ch] text-muted">
          Your email app should have opened with the message ready — just press send. If nothing opened, email me at{" "}
          <a href={`mailto:${site.email}`} className="link-underline text-fg">
            {site.email}
          </a>
          .
        </p>
        <button onClick={() => setOpened(false)} className="btn-secondary mt-2">
          Back to the form
        </button>
      </div>
    );
  }

  const labelCls = "flex flex-col gap-2 text-[13px] text-muted";
  const inputCls = "field h-11 px-4";

  return (
    <form noValidate onSubmit={onSubmit} className="card flex flex-col gap-5 p-6 md:p-8">
      <div className="flex items-center justify-between pb-1">
        <p className="font-[family-name:var(--font-space)] text-xl font-bold">Project brief</p>
        <p className="text-xs text-subtle">
          <span className="text-primary">*</span> required · ~2 min
        </p>
      </div>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>
            <span>Name<span className="text-primary" aria-hidden="true"> *</span></span>
            <input required name="name" autoComplete="name" className={inputCls} placeholder="Your name" {...a11y("name")} />
          </label>
          <FieldError id="name-error" message={errors.name ?? ""} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>
            <span>Email<span className="text-primary" aria-hidden="true"> *</span></span>
            <input required type="email" name="email" autoComplete="email" className={inputCls} placeholder="you@company.com" {...a11y("email")} />
          </label>
          <FieldError id="email-error" message={errors.email ?? ""} />
        </div>
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
            Budget range <span className="text-xs text-subtle">(optional)</span>
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

      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>
          <span>Message<span className="text-primary" aria-hidden="true"> *</span></span>
          <textarea required name="message" rows={5} className="field resize-y p-4" placeholder="What are you building?" {...a11y("message")} />
        </label>
        <FieldError id="message-error" message={errors.message ?? ""} />
      </div>

      <button type="submit" className="btn-primary !h-12">
        Send message {ArrowIcon}
      </button>
      <p className="text-center text-xs text-subtle">Opens your email app with the message filled in.</p>
    </form>
  );
}
