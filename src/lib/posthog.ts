import type { PostHog } from "posthog-js";
import { POSTHOG_DEFAULTS } from "@/constants/constant";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

let client: Promise<PostHog> | undefined;

/**
 * PostHog, downloaded and started on first use. Its SDK is a large script, so
 * it stays out of the page's startup bundle. Resolves to null without a
 * project token (e.g. a fresh clone): analytics stay off and nothing is sent.
 */
export function loadPostHog(): Promise<PostHog> | null {
  if (!token) return null;
  client ??= import("posthog-js").then(({ default: posthog }) => {
    posthog.init(token, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: POSTHOG_DEFAULTS,
      // Not used on this site; skips downloading their extra scripts
      disable_surveys: true,
      capture_dead_clicks: false,
    });
    return posthog;
  });
  return client;
}

const INTERACTIONS = ["pointerdown", "pointermove", "keydown", "touchstart", "scroll", "wheel"] as const;

/**
 * Calls `task` once, on the visitor's first interaction or `fallbackMs` after
 * the page has loaded, whichever comes first — so it never runs while the
 * page is still starting up.
 */
export function afterFirstInteraction(task: () => void, fallbackMs: number): void {
  let timer: number | undefined;
  const run = () => {
    INTERACTIONS.forEach((type) => window.removeEventListener(type, run));
    window.clearTimeout(timer);
    task();
  };
  INTERACTIONS.forEach((type) => window.addEventListener(type, run, { once: true, passive: true }));
  const startFallback = () => {
    timer = window.setTimeout(run, fallbackMs);
  };
  if (document.readyState === "complete") startFallback();
  else window.addEventListener("load", startFallback, { once: true });
}
