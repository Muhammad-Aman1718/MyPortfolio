/** Small text formatters shared across components. */
import type { DayMonth } from "@/types/types";

/** 1 → "01" — list numbers, counters, paper numbers. */
export const pad2 = (n: number): string => String(n).padStart(2, "0");

/** "Sarah Mitchell" → "SM". */
export const initials = (name: string): string =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("");

/** "React Native CLI" → "RN" — two-letter mark when a tool has no logo. */
export const monogram = (name: string): string =>
  name
    .split(/[\s./-]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** "https://www.linkedin.com/in/x/" → "linkedin.com/in/x". */
export const displayUrl = (url: string): string =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** URL-safe slug ("FleetPulse Dashboard" → "fleetpulse-dashboard"). */
export const slugify = (text: string): string => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** ISO date → { day: "09", month: "Jun" } for date badges (UTC, so it never shifts a day). */
export const dayMonth = (isoDate: string): DayMonth => {
  const date = new Date(isoDate);
  return {
    day: pad2(date.getUTCDate()),
    month: date.toLocaleString("en", { month: "short", timeZone: "UTC" }),
  };
};


/** Replaces `{key}` placeholders in a copy string. */
export const fillTemplate = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

/** "from $8k" → "$8k". */
export const priceOf = (from: string): string => from.replace("from ", "");

/** Keeps a value's own precision (0.3 stays 0.3) and groups thousands. */
export const formatNumber = (value: number, decimals: number): string =>
  value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** A counter label: prefix + grouped number + suffix ("$", 2100, "+" → "$2,100+"). */
export const formatCount = (value: number, decimals: number, prefix = "", suffix = ""): string =>
  `${prefix}${formatNumber(value, decimals)}${suffix}`;

/** Number of decimals a value is written with (4.8 → 1). */
export const decimalsOf = (value: number): number => (String(value).split(".")[1] ?? "").length;

/** "2026-07-14" → "Jul 2026" (list cards). */
export const formatMonthYear = (isoDate: string): string =>
  new Date(isoDate).toLocaleString("en", { month: "short", year: "numeric", timeZone: "UTC" });

/** "2026-07-14" → "July 14, 2026" (article headers). */
export const formatLongDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleString("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
