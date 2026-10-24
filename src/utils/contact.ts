import {
  CONTACT_ERRORS,
  CONTACT_FORM,
  CONTACT_NOTES,
  EMAIL_PATTERN,
  MESSAGE_MIN_LENGTH,
  SITE,
} from "@/constants/constant";
import { displayUrl } from "./format";
import type { ContactChannel, ContactField, SocialLink } from "@/types/types";

/** Returns the error message for a field, or "" when it's valid. */
export const validateContactField = (field: ContactField, value: string): string => {
  const v = value.trim();
  if (field === "name") return v ? "" : CONTACT_ERRORS.name;
  if (field === "email") {
    if (!v) return CONTACT_ERRORS.emailMissing;
    return EMAIL_PATTERN.test(v) ? "" : CONTACT_ERRORS.emailInvalid;
  }
  return v.length >= MESSAGE_MIN_LENGTH ? "" : CONTACT_ERRORS.message;
};

/** Email subject for a brief: "Project enquiry from Sara — App Rescue & Performance". */
export const briefSubject = ({ name, type }: Record<string, string>): string =>
  `${CONTACT_FORM.subject} ${name}${type ? ` — ${type}` : ""}`;

/** Every field's value from a submitted form, trimmed. */
export const formValues = (form: HTMLFormElement): Record<string, string> =>
  Object.fromEntries(Array.from(new FormData(form).entries()).map(([key, value]) => [key, String(value).trim()]));

/** Email, WhatsApp and the social profiles as contact cards. */
export const contactChannels = (): ContactChannel[] => [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, note: CONTACT_NOTES.Email },
  {
    label: "WhatsApp",
    value: SITE.whatsapp.display,
    href: SITE.whatsapp.href,
    note: CONTACT_NOTES.WhatsApp,
    external: true,
  },
  ...SITE.socials.map((s) => ({
    label: s.label,
    value: displayUrl(s.href),
    href: s.href,
    note: CONTACT_NOTES[s.label],
    external: true,
  })),
];

/** Contact page link that pre-selects a service in the brief. */
export const serviceContactHref = (service: string): string => `/contact?service=${encodeURIComponent(service)}`;

/** Social profiles plus WhatsApp, for the footer. */
export const elsewhereLinks = (): SocialLink[] => [...SITE.socials, { label: "WhatsApp", href: SITE.whatsapp.href }];
