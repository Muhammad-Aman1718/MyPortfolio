import { loadPostHog } from "./posthog";
import type { AnalyticsEvent } from "@/types/types";

/** Sends a custom event to PostHog (loading it if needed); a no-op when analytics are off (no token configured). */
export function track(event: AnalyticsEvent, properties?: Record<string, string>): void {
  void loadPostHog()?.then((posthog) => posthog.capture(event, properties));
}
