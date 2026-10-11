/**
 * Case studies for /projects/[slug].
 * PLACEHOLDER COPY — written to match the listing data in lib/data.ts
 * (names, metrics, testimonials). Replace with your real project details.
 */
import { allProjects } from "@/lib/data";
import type { Metric, Section } from "./types";

type CaseStudy = {
  summary: string;
  timeline: string;
  team: string;
  platform: string;
  metrics: Metric[];
  stack: string[];
  quote?: { text: string; name: string; role: string };
  sections: Section[];
};

const caseStudies: Record<string, CaseStudy> = {
  "quran-companion": {
    summary:
      "An offline-first Quran reader with recitation audio, bookmarks and search — built to open instantly on low-end Android phones and keep working with no signal at all.",
    timeline: "7 months",
    team: "Solo — design, build, release",
    platform: "iOS & Android",
    metrics: [
      { value: 100, suffix: "k+", label: "daily readers" },
      { value: 0, label: "network calls needed to read" },
      { value: 4.8, suffix: "★", label: "average store rating" },
    ],
    stack: ["React Native", "TypeScript", "SQLite", "Reanimated", "Expo", "FTS5"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "Most Quran apps in the region are thin wrappers around a website: they stall on a weak connection and lose your place when the app is killed. The goal was the opposite — an app that behaves like a printed mushaf: it is simply there when you open it.",
          },
          {
            type: "p",
            text: "I owned the product end to end: interaction design, the data pipeline that prepares the text and translations, the React Native app, and both store releases.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The challenge",
        blocks: [
          {
            type: "list",
            items: [
              "**Offline by default.** Text, translations and search had to work with the network switched off — not as a degraded mode, as the normal one.",
              "**Low-end devices.** A large share of readers use 2–3 GB RAM Android phones, where a heavy first render shows up as a white screen.",
              "**Precise typography.** Arabic script with diacritics must render correctly at every size, with verse markers that never break mid-line.",
            ],
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        blocks: [
          {
            type: "p",
            text: "The whole corpus ships as a pre-built SQLite database. On first launch it is copied out of the bundle once; after that every screen reads locally. Search uses an **FTS5** virtual table, so a query across all translations returns in a few milliseconds.",
          },
          {
            type: "code",
            lang: "sql",
            caption: "Search index (built at release time)",
            code: "CREATE VIRTUAL TABLE verse_search USING fts5(\n  text, translation,\n  content='verses', content_rowid='id',\n  tokenize='unicode61 remove_diacritics 2'\n);",
          },
          {
            type: "p",
            text: "Reading position, bookmarks and notes are written to a small local table and synced in the background when a connection appears. Each field carries its own timestamp, so two devices editing different bookmarks never overwrite each other.",
          },
          {
            type: "callout",
            title: "Design decision",
            text: "Page turns are driven by Reanimated on the UI thread. Even when JavaScript is busy loading audio, the page keeps following the finger.",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "list",
            items: [
              "Grew to **100k+ daily readers** without paid acquisition.",
              "Reading, search and bookmarks work identically in airplane mode.",
              "Cold start stays under a second on the slowest supported device.",
            ],
          },
        ],
      },
    ],
  },

  "fleetpulse-dashboard": {
    summary:
      "A real-time dispatch dashboard for a logistics company: live vehicle positions, job assignment and exception alerts in one screen, replacing three tools and a shared spreadsheet.",
    timeline: "5 months",
    team: "Lead engineer + 2 developers",
    platform: "Web",
    metrics: [
      { value: 60, suffix: "%", label: "fewer dispatch errors" },
      { value: 3, label: "tools replaced by one screen" },
      { value: 8, suffix: " mo", label: "in production without a crash" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "Redis", "Mapbox"],
    quote: {
      text: "Hafiz rebuilt our app in half the estimated time and it hasn't crashed once in eight months. Worth every dollar.",
      name: "Sarah Mitchell",
      role: "CTO, FleetPulse",
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "Dispatchers were assigning jobs from a spreadsheet while watching vehicles in a separate tracking tool. Every handoff between the two was a chance to send the wrong truck. FleetPulse brings positions, jobs and alerts into one live view.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The challenge",
        blocks: [
          {
            type: "list",
            items: [
              "Hundreds of vehicles reporting position every few seconds, without the UI stuttering.",
              "Assignments made by one dispatcher had to appear for everyone else immediately — no refresh button.",
              "The previous rewrite attempt had been abandoned, so trust in the project was low.",
            ],
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        blocks: [
          {
            type: "p",
            text: "Vehicle updates flow from the ingest service into **Redis pub/sub** and out over a single WebSocket per browser. The client batches position updates into one render per animation frame, so a burst of 300 updates costs one paint, not 300.",
          },
          {
            type: "p",
            text: "Assignments go through PostgreSQL first and are broadcast only after commit — the UI never shows a job as assigned unless the database agrees.",
          },
          {
            type: "callout",
            title: "Rebuilding trust",
            text: "We shipped a read-only version in week three. Dispatchers used it next to the old tools, and every complaint became a ticket before the cut-over.",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "list",
            items: [
              "Dispatch errors down **60%** in the first quarter after launch.",
              "Delivered in roughly half the originally estimated time.",
              "Eight months in production without a crash.",
            ],
          },
        ],
      },
    ],
  },

  ledgerly: {
    summary:
      "Accounting automation for freelancers — invoices, expenses and quarterly tax estimates in one flow, so a solo business can close its books without an accountant on speed dial.",
    timeline: "4 months",
    team: "Full-stack, with the founder as PM",
    platform: "Web",
    metrics: [
      { value: 3, label: "steps from invoice to tax estimate" },
      { value: 100, suffix: "%", label: "type-safe API surface" },
      { value: 2, suffix: " wk", label: "from scope to first paying user" },
    ],
    stack: ["Next.js", "tRPC", "Stripe", "Prisma", "PostgreSQL"],
    quote: {
      text: "The rare engineer who pushes back on bad ideas and delivers better ones.",
      name: "Omar Farooq",
      role: "Founder, Ledgerly",
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "Freelancers juggle an invoicing tool, a bank export and a tax spreadsheet. Ledgerly connects them: paid invoices become income automatically, expenses are categorised as they arrive, and the quarterly estimate updates itself.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The challenge",
        blocks: [
          {
            type: "p",
            text: "Money software has no room for “almost right”. Rounding, currencies and partial payments all had to be exact, and the first version needed to reach paying users fast enough to validate the idea.",
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        blocks: [
          {
            type: "list",
            items: [
              "Amounts stored as integer minor units with an explicit currency — never floats.",
              "**tRPC** end to end, so a change to a server procedure breaks the client build instead of a customer's invoice.",
              "Stripe webhooks are idempotent: each event ID is recorded before it is processed, so retries can't double-count income.",
            ],
          },
          {
            type: "callout",
            title: "Pushing back",
            text: "The original scope included a full double-entry ledger. We shipped a simpler income/expense model first; it covered every early customer's needs and saved two months.",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "list",
            items: [
              "First paying user two weeks after scope sign-off.",
              "Invoice → paid → tax estimate in three steps.",
            ],
          },
        ],
      },
    ],
  },

  banklite: {
    summary:
      "A consumer banking app for a fintech serving 250k customers. I led the mobile team through a stability programme that took the crash rate from 2.1% to 0.3%.",
    timeline: "Ongoing, 2020 — 2023",
    team: "Team lead, 5 engineers",
    platform: "iOS & Android",
    metrics: [
      { value: 250, suffix: "k", label: "customers" },
      { value: 0.3, suffix: "%", label: "crash rate (from 2.1%)" },
      { value: 5, label: "engineers led" },
    ],
    stack: ["React Native", "Kotlin", "GraphQL", "Sentry", "Detox"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "BankLite had grown fast, and its crash rate grew with it. In a banking app, a crash during a transfer is not a bug report — it's a support call and a customer who stops trusting you with their money.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The challenge",
        blocks: [
          {
            type: "list",
            items: [
              "A **2.1%** crash rate spread across hundreds of distinct signatures.",
              "Releases every two weeks, so fixes had to land without freezing feature work.",
              "Native Android modules (Kotlin) that few people on the team felt safe touching.",
            ],
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Grouped crashes by root cause, not by stack trace, and found that a handful of causes produced most of the volume.",
              "Added error boundaries per screen, so a failing widget degrades instead of taking the app down.",
              "Wrote Detox flows for the money paths — login, transfer, card freeze — and made them a release gate.",
              "Paired on every Kotlin change until two more engineers owned the native layer.",
            ],
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "list",
            items: [
              "Crash rate down from **2.1% to 0.3%** while shipping on the same cadence.",
              "Money-path regressions caught before release instead of by customers.",
            ],
          },
        ],
      },
    ],
  },

  "orderflow-api": {
    summary:
      "The order-processing backbone for a multi-brand retailer: one API that takes orders from web, mobile and marketplaces, and handles payment, stock and fulfilment hand-offs.",
    timeline: "6 months",
    team: "Architect, 4-person backend team",
    platform: "Backend",
    metrics: [
      { value: 2, suffix: "M", label: "requests a day" },
      { value: 99.9, suffix: "%", label: "monthly availability target met" },
      { value: 4, label: "sales channels on one API" },
    ],
    stack: ["NestJS", "PostgreSQL", "Docker", "Redis", "BullMQ", "OpenTelemetry"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "Each sales channel had its own order code path, and stock was reconciled overnight — so overselling on busy days was routine. OrderFlow replaced those paths with one service and made stock checks part of placing the order.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The challenge",
        blocks: [
          {
            type: "p",
            text: "Peak traffic is several times the daily average, payment providers time out, and marketplaces retry aggressively. The API had to stay correct when everything around it misbehaved.",
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        blocks: [
          {
            type: "list",
            items: [
              "Every write endpoint takes an **idempotency key**; a retried request returns the original result instead of creating a second order.",
              "Stock is reserved inside the order transaction with row-level locks, then released by a timed job if payment never completes.",
              "Slow side-effects (emails, fulfilment, analytics) run on queues, so the request path stays short.",
            ],
          },
          {
            type: "code",
            lang: "ts",
            caption: "Idempotent order creation (simplified)",
            code: "const existing = await repo.findByIdempotencyKey(key);\nif (existing) return existing; // retry → same order\n\nreturn db.transaction(async (tx) => {\n  await stock.reserve(tx, items);\n  return orders.create(tx, { key, items, channel });\n});",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "list",
            items: [
              "Handles around **2M requests a day** across four channels.",
              "Overselling on peak days dropped to near zero.",
            ],
          },
        ],
      },
    ],
  },

  "studiosite-cms": {
    summary:
      "A custom CMS for a design agency, powering twelve client marketing sites from one codebase — so the agency's designers could ship pages without waiting on developers.",
    timeline: "2018 — 2020",
    team: "Full-stack developer in a studio team",
    platform: "Web",
    metrics: [
      { value: 12, label: "client sites on one codebase" },
      { value: 1, label: "shared component library" },
      { value: 0, label: "developer tickets for routine page edits" },
    ],
    stack: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "Every client site had started as a copy of the last one, and fixes had to be applied twelve times. StudioSite turned the shared parts into a CMS with per-client themes, so one fix reached every site.",
          },
        ],
      },
      {
        id: "challenge",
        title: "The challenge",
        blocks: [
          {
            type: "p",
            text: "Designers wanted freedom; the agency wanted sites that couldn't be broken by an edit. The CMS had to offer flexible layouts without becoming a page builder that produces unmaintainable pages.",
          },
        ],
      },
      {
        id: "approach",
        title: "Approach",
        blocks: [
          {
            type: "list",
            items: [
              "Pages are composed from a fixed set of typed sections, each with its own validated fields.",
              "Client themes are design tokens, not forked stylesheets.",
              "Introduced TypeScript and tests to the studio as part of the build.",
            ],
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "list",
            items: [
              "Twelve client sites on one codebase; a fix ships to all of them at once.",
              "Designers publish routine page changes without a developer.",
            ],
          },
        ],
      },
    ],
  },
};

export type Project = (typeof allProjects)[number] & CaseStudy;

export const projects: Project[] = allProjects.map((p) => ({ ...p, ...caseStudies[p.slug] }));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
