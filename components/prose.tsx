import { Fragment } from "react";
import Reveal from "./reveal";
import CopyButton from "./copy-button";
import type { Block, Section } from "@/lib/content/types";

/** `code` and **bold** inside a text run. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("`") ? (
          <code key={i} className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-[family-name:var(--font-jetbrains)] text-[0.88em] text-fg">
            {p.slice(1, -1)}
          </code>
        ) : p.startsWith("**") ? (
          <strong key={i} className="font-semibold text-fg">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "p":
      return (
        <p className="leading-[1.75] text-fg/80">
          <Inline text={b.text} />
        </p>
      );
    case "h3":
      return <h3 className="pt-2 font-[family-name:var(--font-space)] text-xl font-semibold tracking-tight">{b.text}</h3>;
    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag className="flex flex-col gap-2.5 pl-1 text-fg/80">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3 leading-[1.7]">
              {b.ordered ? (
                <span className="mt-[3px] w-5 shrink-0 font-[family-name:var(--font-jetbrains)] text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : (
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              )}
              <span>
                <Inline text={it} />
              </span>
            </li>
          ))}
        </Tag>
      );
    }
    case "code":
      return (
        <figure className="overflow-hidden rounded-[14px] border border-line bg-[#0c0c0d]">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <span className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">{b.caption ?? b.lang}</span>
            <CopyButton text={b.code} label="Copy code" />
          </div>
          <pre className="overflow-x-auto p-4 font-[family-name:var(--font-jetbrains)] text-[13px] leading-[1.7] text-fg/85">
            <code>{b.code}</code>
          </pre>
        </figure>
      );
    case "quote":
      return (
        <figure className="border-l-2 border-accent py-1 pl-6">
          <blockquote className="font-[family-name:var(--font-space)] text-xl font-medium leading-snug tracking-tight md:text-2xl">
            &ldquo;{b.text}&rdquo;
          </blockquote>
          {b.cite && <figcaption className="mt-3 text-sm text-muted">— {b.cite}</figcaption>}
        </figure>
      );
    case "callout":
      return (
        <aside className="card ring-gradient bg-gradient-to-br from-secondary/60 to-surface p-5 md:p-6">
          <p className="font-[family-name:var(--font-jetbrains)] text-xs text-accent">{b.title}</p>
          <p className="mt-2 leading-[1.7] text-fg/85">
            <Inline text={b.text} />
          </p>
        </aside>
      );
  }
}

/** Renders content sections; each section rises in as it scrolls into view. */
export default function Prose({ sections, numbered = false }: { sections: Section[]; numbered?: boolean }) {
  return (
    <div className="flex flex-col gap-14">
      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className="scroll-mt-28">
          <Reveal variant="fade-up" start="top 90%">
            <h2 className="flex items-baseline gap-3 font-[family-name:var(--font-space)] text-2xl font-semibold tracking-tight md:text-[28px]">
              {numbered && <span className="font-[family-name:var(--font-jetbrains)] text-sm text-accent">{i + 1}</span>}
              {s.title}
            </h2>
          </Reveal>
          <div className="mt-5 flex flex-col gap-5 text-[17px]">
            {s.blocks.map((b, j) => (
              <BlockView key={j} b={b} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
