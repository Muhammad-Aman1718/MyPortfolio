import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";
import SplitText from "@/components/split-text";
import { ContactForm, Faq } from "@/components/contact-parts";

export const metadata: Metadata = { title: "Contact — Hafiz" };

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export default function Contact() {
  return (
    <>
      <div className="container-site page-top grid gap-10 pb-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p data-enter="left" className="eyebrow">{"// contact"}</p>
          <h1 className="h-display mt-4 text-[40px] md:text-[60px]">
            <SplitText text="Let's build something" enter="mask" step={80} delay={100} />
          </h1>
          <p data-enter="left" style={d(400)} className="mt-5 max-w-[46ch] text-muted">
            Tell me about your project — the honest version, including the messy parts.
            That&apos;s usually where the interesting work is.
          </p>

          <div data-enter="left" style={d(550)} className="card mt-8 divide-y divide-line">
            <a href="mailto:admin@behafiz.com" className="group flex items-center justify-between gap-4 p-5 transition-colors duration-150 hover:bg-surface-hi">
              <span>
                <span className="block font-[family-name:var(--font-jetbrains)] text-xs text-muted">email</span>
                <span className="mt-1 block font-[family-name:var(--font-jetbrains)] text-sm text-accent">admin@behafiz.com</span>
              </span>
              <span className="text-xs text-muted">Replies within 24–48h</span>
            </a>
            <div className="flex items-center gap-3 p-5">
              <span className="pulse-dot h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              <span className="text-sm">Available for new projects from September</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div className="flex gap-5">
                {["GitHub", "LinkedIn", "X"].map((s) => (
                  <a key={s} href="#" className="link-underline text-sm text-muted hover:text-fg">
                    {s}
                  </a>
                ))}
              </div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[12px] text-muted">
                Karachi, Pakistan — working worldwide (UTC+5)
              </p>
            </div>
          </div>
        </div>

        <div data-enter="card" style={d(300)} className="lg:col-span-7">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
      </div>

      {/* FAQ — sticky question header beside the accordion */}
      <section className="container-site section">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionHeader eyebrow="faq" title="Common questions" motion="words" />
            </div>
          </div>
          <Reveal variant="fade-up" className="md:col-span-8">
            <Faq />
          </Reveal>
        </div>
      </section>
    </>
  );
}
