"use client";

import {
  BUDGET_OPTIONS,
  CONTACT_FORM,
  HONEYPOT_FIELD,
  PROJECT_TYPE_OPTIONS,
  SITE,
} from "@/constants/constant";
import useContactForm from "@/hooks/useContactForm";
import Icon from "@/components/ui/Icon";
import ContactSent from "./ContactSent";
import FormField from "./FormField";
import SelectField from "./SelectField";

/** Project brief, delivered to my inbox through Formspree. */
export default function ContactForm() {
  const {
    sending,
    sent,
    failed,
    reset,
    errors,
    fieldProps,
    onSubmit,
    defaultType,
  } = useContactForm();

  if (sent) return <ContactSent onBack={reset} />;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-busy={sending}
      className="card flex flex-col gap-5 p-6 md:p-8"
    >
      <div className="flex items-center justify-between pb-1">
        <p className="font-display text-xl font-bold">{CONTACT_FORM.title}</p>
        <p className="text-xs text-subtle">
          <span className="text-primary">*</span> {CONTACT_FORM.required}
        </p>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label={CONTACT_FORM.name.label}
          field="name"
          error={errors.name}
          required
        >
          <input
            required
            name="name"
            autoComplete="name"
            className="field field-input"
            placeholder={CONTACT_FORM.name.placeholder}
            {...fieldProps("name")}
          />
        </FormField>
        <FormField
          label={CONTACT_FORM.email.label}
          field="email"
          error={errors.email}
          required
        >
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="field field-input"
            placeholder={CONTACT_FORM.email.placeholder}
            {...fieldProps("email")}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={CONTACT_FORM.type.label} labelId="type-label">
          <SelectField
            name="type"
            labelledBy="type-label"
            options={PROJECT_TYPE_OPTIONS}
            placeholder={CONTACT_FORM.type.placeholder}
            defaultValue={defaultType}
          />
        </FormField>
        <FormField
          label={CONTACT_FORM.budget.label}
          labelId="budget-label"
          optional={CONTACT_FORM.budget.optional}
        >
          <SelectField
            name="budget"
            labelledBy="budget-label"
            options={BUDGET_OPTIONS}
            placeholder={CONTACT_FORM.budget.placeholder}
          />
        </FormField>
      </div>

      <FormField
        label={CONTACT_FORM.message.label}
        field="message"
        error={errors.message}
        required
      >
        <textarea
          required
          name="message"
          rows={5}
          className="field resize-y p-4"
          placeholder={CONTACT_FORM.message.placeholder}
          {...fieldProps("message")}
        />
      </FormField>

      {failed && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-error/10 px-4 py-3 text-sm text-error"
        >
          <Icon
            name="alert"
            className="mt-0.5 h-4 w-4 shrink-0"
            strokeWidth={2}
          />
          <span>
            {CONTACT_FORM.failed}{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="underline underline-offset-2"
            >
              {SITE.email}
            </a>
            .
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="btn-primary h-12! disabled:pointer-events-none disabled:opacity-70"
      >
        {sending ? CONTACT_FORM.sending : CONTACT_FORM.submit}
        {!sending && <Icon name="arrowRight" />}
      </button>
      <p className="text-center text-xs text-subtle">{CONTACT_FORM.hint}</p>
    </form>
  );
}
