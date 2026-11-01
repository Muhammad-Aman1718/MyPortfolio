import { UI } from "@/constants/constant";
import { loadGoogleAnalytics } from "@/lib/googleAnalytics";
import { afterFirstInteraction, loadPostHog } from "@/lib/posthog";

/**
 * Runs once in the browser before the app becomes interactive (Next.js file
 * convention). PostHog and Google Analytics start on the visitor's first
 * interaction (or a little after load), so their large scripts never compete
 * with the first render; they then record pageviews on their own.
 */
afterFirstInteraction(() => {
  void loadPostHog();
  loadGoogleAnalytics();
}, UI.analyticsFallbackMs);
