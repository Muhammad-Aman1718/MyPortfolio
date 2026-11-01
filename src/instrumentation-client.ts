import { UI } from "@/constants/constant";
import { afterFirstInteraction, loadPostHog } from "@/lib/posthog";

/**
 * Runs once in the browser before the app becomes interactive (Next.js file
 * convention). PostHog starts on the visitor's first interaction (or a little
 * after load), so its large SDK never competes with the first render; it then
 * records pageviews, clicks and web vitals on its own.
 */
afterFirstInteraction(() => void loadPostHog(), UI.analyticsFallbackMs);
