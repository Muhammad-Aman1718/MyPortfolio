import posthog from "posthog-js";
import type { AnalyticsEvent } from "@/types/types";

/** Sends a custom event to PostHog; a no-op when analytics are off (no token configured). */
export function track(event: AnalyticsEvent, properties?: Record<string, string>): void {
  if (posthog.__loaded) posthog.capture(event, properties);
}
