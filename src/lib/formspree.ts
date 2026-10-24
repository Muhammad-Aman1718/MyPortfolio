import { FORMSPREE_ENDPOINT, HONEYPOT_FIELD } from "@/constants/constant";
import { briefSubject } from "@/utils/contact";

/**
 * Posts a project brief to Formspree, which emails it to me. The visitor's
 * address becomes the reply-to, so answering the email replies to them.
 * Throws when the request fails or Formspree rejects it.
 */
export async function submitBrief(fields: Record<string, string>): Promise<void> {
  const { name, email, type, budget, message } = fields;
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      type,
      budget,
      message,
      _subject: briefSubject(fields),
      _replyto: email,
      [HONEYPOT_FIELD]: fields[HONEYPOT_FIELD] ?? "",
    }),
  });
  if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
}
