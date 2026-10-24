/**
 * Research papers for /posts (research tab) and /posts/research/[slug].
 * PLACEHOLDER COPY — expands the original listing abstracts. Replace the
 * sections, findings and citation with the real papers before publishing.
 */
import type { Metric, Section } from "./types";

export type Paper = {
  slug: string;
  title: string;
  authors: string;
  year: string;
  isoDate: string;
  venue: string;
  abstract: string;
  tags: string[];
  findings: Metric[];
  sections: Section[];
  bibtex: string;
};

export const research: Paper[] = [
  {
    slug: "offline-first-sync-low-connectivity",
    title: "Offline-first data synchronization patterns in low-connectivity regions",
    authors: "M. Aman",
    year: "2026",
    isoDate: "2026-02-01",
    venue: "Preprint",
    abstract:
      "A comparative study of CRDT and operational-transform approaches for mobile applications operating under intermittent connectivity, with benchmarks from a production deployment serving 100k daily active users across South Asia.",
    tags: ["distributed systems", "mobile", "CRDTs"],
    findings: [
      { value: 100, suffix: "k", label: "daily active users in the deployment studied" },
      { value: 2, label: "sync strategies compared" },
      { value: 0, label: "server round-trips needed to read or write locally" },
    ],
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        blocks: [
          {
            type: "p",
            text: "Mobile applications in many regions cannot assume a stable connection. Requests time out, connections drop mid-transfer, and devices stay offline for hours. Applications that treat the network as always available degrade badly under these conditions; offline-first applications treat local storage as the source of truth and synchronise opportunistically.",
          },
          {
            type: "p",
            text: "This paper compares two families of synchronisation techniques — conflict-free replicated data types (CRDTs) and operational transformation (OT) — for the kind of small, user-owned data typical of consumer apps: bookmarks, notes, preferences and reading progress.",
          },
        ],
      },
      {
        id: "background",
        title: "Background",
        blocks: [
          {
            type: "list",
            items: [
              "**Operational transformation** rewrites concurrent operations against each other so they can be applied in any order. It usually relies on a central server to order operations.",
              "**CRDTs** design the data structure so that merges are commutative, associative and idempotent. Any two replicas that have seen the same updates converge, with no coordinator.",
            ],
          },
        ],
      },
      {
        id: "method",
        title: "Method",
        blocks: [
          {
            type: "p",
            text: "Both strategies were implemented behind the same storage interface in a production reading application. Devices recorded sync attempts, conflicts and convergence time, and the two implementations were compared across connectivity conditions drawn from the deployment's real network logs.",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "p",
            text: "For small user-owned records, a per-field last-writer-wins register — the simplest CRDT — matched the user-visible behaviour of the OT implementation while removing the need for a server to order operations. OT's advantage appeared only for collaborative editing of shared text, which the application did not need.",
          },
          {
            type: "callout",
            title: "Placeholder",
            text: "Replace this section with the paper's measured results — convergence times, conflict rates and bandwidth per sync.",
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        blocks: [
          {
            type: "p",
            text: "For consumer apps operating in low-connectivity regions, field-level CRDT registers offer a simple and robust default. Teams should reach for operational transformation only when users genuinely co-edit the same content in real time.",
          },
        ],
      },
    ],
    bibtex:
      "@misc{aman2026offline,\n  title  = {Offline-first data synchronization patterns in low-connectivity regions},\n  author = {Aman, M.},\n  year   = {2026},\n  note   = {Preprint}\n}",
  },
  {
    slug: "perceived-performance-mobile-onboarding",
    title: "Perceived performance budgets for mobile onboarding flows",
    authors: "M. Aman",
    year: "2025",
    isoDate: "2025-09-01",
    venue: "Preprint",
    abstract:
      "User-study data on abandonment thresholds during first-launch experiences, proposing a 1.8-second perceived-readiness budget derived from 4,000 session recordings.",
    tags: ["UX research", "performance"],
    findings: [
      { value: 4000, label: "session recordings analysed" },
      { value: 1.8, suffix: "s", label: "proposed perceived-readiness budget" },
      { value: 1, label: "budget for the whole first-launch flow" },
    ],
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        blocks: [
          {
            type: "p",
            text: "The first launch is the moment an app is most likely to be abandoned. Performance work usually targets measured load time, but users react to perceived readiness — the moment the screen looks usable — which can differ from technical completion by a wide margin.",
          },
        ],
      },
      {
        id: "method",
        title: "Method",
        blocks: [
          {
            type: "p",
            text: "4,000 recorded first-launch sessions were annotated with the moment each screen became visually ready and the moment the user acted or left. Sessions were grouped by perceived wait to find where abandonment rises sharply.",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "p",
            text: "Abandonment stayed roughly flat for short perceived waits and rose steeply beyond about 1.8 seconds. Skeleton screens and immediate visual feedback moved sessions below the threshold even when the underlying load time didn't change.",
          },
          {
            type: "callout",
            title: "Placeholder",
            text: "Replace with the paper's figures: abandonment by perceived wait, confidence intervals and per-device breakdowns.",
          },
        ],
      },
      {
        id: "recommendations",
        title: "Recommendations",
        blocks: [
          {
            type: "list",
            items: [
              "Budget **perceived readiness**, not only total load time: aim for a usable-looking first screen within 1.8 seconds.",
              "Show layout immediately with skeletons; fill content as it arrives.",
              "Defer permission prompts and account creation until after the first moment of value.",
            ],
          },
        ],
      },
    ],
    bibtex:
      "@misc{aman2025perceived,\n  title  = {Perceived performance budgets for mobile onboarding flows},\n  author = {Aman, M.},\n  year   = {2025},\n  note   = {Preprint}\n}",
  },
];

export const getPaper = (slug: string) => research.find((r) => r.slug === slug);
