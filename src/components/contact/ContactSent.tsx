import { CONTACT_FORM, SITE } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import type { ContactSentProps } from "@/types/types";

/** Confirmation shown once the brief has reached my inbox. */
export default function ContactSent({ onBack }: ContactSentProps) {
  return (
    <div className="card panel-in flex min-h-105 flex-col items-center justify-center gap-4 p-12 text-center" role="status">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary">
        <Icon name="check" className="h-8 w-8" strokeWidth={2} pathClassName="draw-check" />
      </span>
      <h2 className="font-display text-2xl font-bold">{CONTACT_FORM.sentTitle}</h2>
      <p className="max-w-[40ch] text-muted">
        {CONTACT_FORM.sentText}{" "}
        <a href={`mailto:${SITE.email}`} className="link-underline text-fg">
          {SITE.email}
        </a>
        .
      </p>
      <button type="button" onClick={onBack} className="btn-secondary mt-2">
        {CONTACT_FORM.back}
      </button>
    </div>
  );
}
