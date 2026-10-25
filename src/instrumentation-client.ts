import posthog from "posthog-js";
import { POSTHOG_DEFAULTS } from "@/constants/constant";

/**
 * Runs once in the browser before the app becomes interactive (Next.js file
 * convention). Starts PostHog, which then records pageviews, clicks and web
 * vitals on its own. Without a project token (e.g. a fresh clone) analytics
 * stay off and nothing is sent.
 */
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: POSTHOG_DEFAULTS,
  });
}
