/**
 * Long-form content is stored as typed blocks so case studies, posts and
 * papers render through one <Prose> component without an MDX pipeline.
 * Inline `code` (backticks) and **bold** are supported inside text.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export type Section = { id: string; title: string; blocks: Block[] };

export type Metric = { value: number; prefix?: string; suffix?: string; label: string };

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
