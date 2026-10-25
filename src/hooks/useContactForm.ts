"use client";

import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ANALYTICS_EVENTS, CONTACT_FIELDS, HONEYPOT_FIELD } from "@/constants/constant";
import { track } from "@/lib/analytics";
import { submitBrief } from "@/lib/formspree";
import { formValues, validateContactField } from "@/utils/contact";
import type {
  ContactField,
  ContactFieldA11y,
  ContactFieldElement,
  FieldErrors,
  FormStatus,
} from "@/types/types";

/**
 * Project brief state. Fields validate on blur, then re-check as you type
 * once they show an error. A valid brief is sent through Formspree to my
 * inbox; while it's in flight the button is disabled, and if it fails the
 * form keeps what was typed and shows an error.
 */
export default function useContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const check = (field: ContactField, value: string) =>
    setErrors((e) => ({ ...e, [field]: validateContactField(field, value) }));

  const fieldProps = (field: ContactField): ContactFieldA11y => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": `${field}-error`,
    onBlur: (e: FocusEvent<ContactFieldElement>) =>
      check(field, e.target.value),
    onChange: (e: ChangeEvent<ContactFieldElement>) => {
      if (errors[field]) check(field, e.target.value);
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const values = formValues(form);
    // Bots fill the hidden field: act as if it worked, send nothing
    if (values[HONEYPOT_FIELD]) {
      setStatus("sent");
      return;
    }
    const next = Object.fromEntries(
      CONTACT_FIELDS.map((f) => [f, validateContactField(f, values[f] ?? "")]),
    ) as FieldErrors;
    setErrors(next);
    const firstInvalid = CONTACT_FIELDS.find((f) => next[f]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      return;
    }
    setStatus("sending");
    try {
      await submitBrief(values);
      setStatus("sent");
      // Only the choices, never the visitor's name, email or message
      track(ANALYTICS_EVENTS.contactSubmitted, { type: values.type, budget: values.budget });
    } catch {
      setStatus("failed");
      track(ANALYTICS_EVENTS.contactFailed);
    }
  };

  return {
    sending: status === "sending",
    sent: status === "sent",
    failed: status === "failed",
    reset: () => setStatus("idle"),
    errors,
    fieldProps,
    onSubmit,
    defaultType: params.get("service") ?? "",
  };
}
