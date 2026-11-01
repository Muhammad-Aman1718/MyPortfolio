import { gaEvent } from "./googleAnalytics";
import { loadPostHog } from "./posthog";
import type { AnalyticsEvent } from "@/types/types";

/** Sends a custom event to PostHog and Google Analytics (loading them if needed); each is a no-op when not configured. */
export function track(event: AnalyticsEvent, properties?: Record<string, string>): void {
  void loadPostHog()?.then((posthog) => posthog.capture(event, properties));
  gaEvent(event, properties);
}
