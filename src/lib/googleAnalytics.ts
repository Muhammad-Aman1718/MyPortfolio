import { GA_SCRIPT_URL } from "@/constants/constant";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 (gtag.js), added on first use. Like PostHog it stays out
 * of page startup; GA4's enhanced measurement then records the client-side
 * route changes on its own. Does nothing without a measurement ID.
 */
export function loadGoogleAnalytics(): boolean {
  if (!measurementId) return false;
  if (window.gtag) return true;
  window.dataLayer = window.dataLayer ?? [];
  // gtag.js reads the `arguments` object itself, so this can't be a rest-args array
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
  const script = document.createElement("script");
  script.async = true;
  script.src = `${GA_SCRIPT_URL}?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
  return true;
}

/** Sends a custom event to Google Analytics, loading it if needed. */
export function gaEvent(event: string, params?: Record<string, string>): void {
  if (loadGoogleAnalytics()) window.gtag?.("event", event, params);
}
