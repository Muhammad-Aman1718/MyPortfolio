/**
 * Blog posts for /posts and /posts/[slug].
 * The technical guidance is real; dates, numbers from client work and the
 * author voice are placeholder — edit freely.
 */
import type { Section } from "./types";

export type Post = {
  slug: string;
  category: "Technical" | "Tutorials" | "Case Study" | "Notes";
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readingTime: string;
  featured?: boolean;
  sections: Section[];
};

export const blogPosts: Post[] = [
  {
    slug: "profiling-react-native-cold-starts",
    category: "Technical",
    title: "Profiling React Native cold starts: a field guide",
    excerpt: "Where those two seconds actually go, and how to claw them back.",
    date: "Jul 2026",
    isoDate: "2026-07-14",
    readingTime: "9 min",
    featured: true,
    sections: [
      {
        id: "measure-first",
        title: "Measure the right moment",
        blocks: [
          {
            type: "p",
            text: "“Startup is slow” usually means one of three different moments: the native process starting, the JavaScript bundle finishing its first run, or the first screen the user can actually use. Optimising the wrong one is the most common way to spend a week and change nothing.",
          },
          {
            type: "p",
            text: "Mark the moment that matters to the user — the first meaningful screen, rendered with data — and measure from process start to that mark on a **release build** on a **low-end device**. Debug builds and flagship phones hide exactly the costs you're looking for.",
          },
          {
            type: "code",
            lang: "ts",
            caption: "Mark the first useful render",
            code: "import performance from 'react-native-performance';\n\nexport function HomeScreen() {\n  const { data } = useHomeData();\n  useEffect(() => {\n    if (data) performance.mark('home:interactive');\n  }, [data]);\n  // …\n}",
          },
        ],
      },
      {
        id: "where-time-goes",
        title: "Where the time actually goes",
        blocks: [
          {
            type: "p",
            text: "Use the platform tools for the native half: Android Studio's profiler or a Perfetto trace, and Xcode Instruments' **App Launch** template on iOS. They show the gap between process start and the first frame that the JS-side marks can't see.",
          },
          {
            type: "list",
            items: [
              "**Native module initialisation** — modules that set themselves up eagerly at launch, even if the first screen never uses them.",
              "**Bundle evaluation** — every top-level `import` runs at startup, including the ones only a settings screen needs.",
              "**Synchronous storage reads** — reading a large persisted store before the first render blocks it.",
              "**The first screen itself** — a heavy list or a large image decoded on mount.",
            ],
          },
        ],
      },
      {
        id: "fixes",
        title: "The fixes that pay off",
        blocks: [
          {
            type: "h3",
            text: "1. Make sure Hermes is on",
          },
          {
            type: "p",
            text: "Hermes compiles your JavaScript to bytecode at build time, so the device skips parsing at launch. It is the default in current React Native versions; check it hasn't been disabled in an old config.",
          },
          {
            type: "h3",
            text: "2. Turn on inline requires",
          },
          {
            type: "p",
            text: "With inline requires, Metro defers a module's evaluation until the first time it's used, instead of evaluating everything at startup.",
          },
          {
            type: "code",
            lang: "js",
            caption: "metro.config.js",
            code: "module.exports = {\n  transformer: {\n    getTransformOptions: async () => ({\n      transform: { experimentalImportSupport: false, inlineRequires: true },\n    }),\n  },\n};",
          },
          {
            type: "h3",
            text: "3. Defer everything the first screen doesn't need",
          },
          {
            type: "p",
            text: "Analytics, remote config, crash-report breadcrumbs and prefetching can start after the first screen is interactive. Schedule them with `InteractionManager.runAfterInteractions` or a short timeout after your interactive mark.",
          },
          {
            type: "h3",
            text: "4. Hide the splash screen on content, not on mount",
          },
          {
            type: "p",
            text: "Hiding the splash when the root component mounts shows the user an empty shell. Hide it when the first screen has its data — the perceived start gets shorter even when the measured one doesn't.",
          },
          {
            type: "callout",
            title: "Field result",
            text: "On one client app these four steps cut cold start by about **40%** on a budget Android phone — most of it from deferring two native SDKs and one large JSON import.",
          },
        ],
      },
      {
        id: "keep-it-fast",
        title: "Keep it fast",
        blocks: [
          {
            type: "p",
            text: "Startup regresses one innocent import at a time. Record the interactive mark in your analytics with the app version, and alert when the median on low-end devices moves. A number on a dashboard does more than a performance guideline in a wiki.",
          },
        ],
      },
    ],
  },
  {
    slug: "shipping-a-quran-app-to-100k-readers",
    category: "Case Study",
    title: "Shipping a Quran app to 100k daily readers",
    excerpt: "Offline-first architecture decisions that made it possible.",
    date: "Jun 2026",
    isoDate: "2026-06-09",
    readingTime: "12 min",
    sections: [
      {
        id: "offline-is-the-product",
        title: "Offline is the product",
        blocks: [
          {
            type: "p",
            text: "People open a Quran app on the metro, at the mosque, on a flight, and in places where the signal is a rumour. A spinner in those moments isn't a minor annoyance — it's the app failing at its one job. So the first decision was that the network is an optional extra, never a dependency for reading.",
          },
        ],
      },
      {
        id: "ship-the-database",
        title: "Ship the database, not an API client",
        blocks: [
          {
            type: "p",
            text: "The full text, translations and verse metadata are compiled into a SQLite file at release time and bundled with the app. On first launch it's copied into the app's data directory once; from then on every screen is a local query.",
          },
          {
            type: "list",
            items: [
              "Search uses an **FTS5** index with diacritic-insensitive tokenising, so readers find verses whether or not they type the marks.",
              "Content updates ship as a new database version; the app swaps files atomically on next launch.",
              "Audio is the exception — it streams and caches per surah, and the reader works fully without it.",
            ],
          },
        ],
      },
      {
        id: "sync-without-conflicts",
        title: "Sync without conflicts",
        blocks: [
          {
            type: "p",
            text: "Bookmarks, last-read position and notes are the only user data. Each record keeps a timestamp per field and a soft-delete flag. When devices sync, the newest value of each field wins — so editing a note on the phone and moving a bookmark on the tablet never collide.",
          },
          {
            type: "quote",
            text: "If the user can't tell whether they're online, the offline design is working.",
          },
        ],
      },
      {
        id: "performance-on-cheap-phones",
        title: "Performance on cheap phones",
        blocks: [
          {
            type: "p",
            text: "The pages are virtualised lists of pre-measured verse blocks, so scrolling never measures text on the fly. Page turns run on the UI thread with Reanimated, which keeps them smooth even while audio is loading in JavaScript.",
          },
        ],
      },
      {
        id: "what-i-would-change",
        title: "What I'd do differently",
        blocks: [
          {
            type: "p",
            text: "I'd build the content pipeline first. Every bug in the text layer came from hand-edited source data; a validated pipeline that produces the database would have caught them before release.",
          },
        ],
      },
    ],
  },
  {
    slug: "why-i-stopped-estimating-in-hours",
    category: "Notes",
    title: "Why I stopped estimating in hours",
    excerpt: "Scope-based pricing changed my client relationships entirely.",
    date: "May 2026",
    isoDate: "2026-05-12",
    readingTime: "5 min",
    sections: [
      {
        id: "the-problem-with-hours",
        title: "The problem with hours",
        blocks: [
          {
            type: "p",
            text: "Hourly billing puts the client and the engineer on opposite sides of every decision. The client wants fewer hours; I get paid for more. Every question costs them money, so they stop asking — and the questions they don't ask are where projects go wrong.",
          },
        ],
      },
      {
        id: "what-i-do-instead",
        title: "What I do instead",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "A paid discovery call that ends with a written scope: what's in, what's out, and what “done” means.",
              "A fixed price for that scope, with the risk priced in — by me, not discovered later by the client.",
              "Changes are welcome and handled as small, separately priced additions, never as silent scope creep.",
            ],
          },
        ],
      },
      {
        id: "what-changed",
        title: "What changed",
        blocks: [
          {
            type: "p",
            text: "Clients ask more questions now, because asking is free. Meetings got shorter, because nobody is watching a meter. And I got faster, because finishing early is finally rewarded instead of penalised.",
          },
          {
            type: "callout",
            title: "When hours still make sense",
            text: "Open-ended work — audits that turn into investigations, or ongoing support — still runs weekly. The rule is simple: fixed price when the outcome can be described, time-based when it can't.",
          },
        ],
      },
    ],
  },
  {
    slug: "gsap-scrolltrigger-nextjs-app-router",
    category: "Tutorials",
    title: "GSAP ScrollTrigger in Next.js App Router, properly",
    excerpt:
      "Cleanup, hydration, and reduced-motion — the parts tutorials skip.",
    date: "Apr 2026",
    isoDate: "2026-04-21",
    readingTime: "11 min",
    sections: [
      {
        id: "client-only",
        title: "It only runs on the client",
        blocks: [
          {
            type: "p",
            text: 'GSAP touches the DOM, so any component that animates needs `"use client"`. Keep those components small — a reveal wrapper, a counter — and let pages stay Server Components that render them.',
          },
          {
            type: "code",
            lang: "tsx",
            caption: "components/reveal.tsx",
            code: '"use client";\nimport { useEffect, useRef } from "react";\nimport gsap from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\n\nexport function Reveal({ children }: { children: React.ReactNode }) {\n  const ref = useRef<HTMLDivElement>(null);\n  useEffect(() => {\n    const ctx = gsap.context(() => {\n      gsap.from(ref.current, {\n        autoAlpha: 0, y: 24, duration: 0.7,\n        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },\n      });\n    }, ref);\n    return () => ctx.revert(); // kills tweens AND their ScrollTriggers\n  }, []);\n  return <div ref={ref}>{children}</div>;\n}',
          },
        ],
      },
      {
        id: "cleanup",
        title: "Clean up, or leak on every navigation",
        blocks: [
          {
            type: "p",
            text: "Client-side navigation unmounts the old page but doesn't reload the document. A ScrollTrigger you never killed keeps listening to scroll and pinning elements that no longer exist. `gsap.context()` collects everything created inside it, and `ctx.revert()` in the effect cleanup removes all of it — tweens, triggers and inline styles.",
          },
          {
            type: "p",
            text: "If you use the `@gsap/react` package, its `useGSAP()` hook does the same scoping and cleanup for you.",
          },
        ],
      },
      {
        id: "hydration-flash",
        title: "Avoid the hydration flash",
        blocks: [
          {
            type: "p",
            text: "Server-rendered HTML arrives visible. If the animation's “from” state is applied in an effect, users see content appear, vanish, then animate in. Hide reveal targets with CSS before first paint — but only when JavaScript will run, or no-JS visitors see nothing.",
          },
          {
            type: "code",
            lang: "tsx",
            caption: "app/layout.tsx + globals.css",
            code: "<script dangerouslySetInnerHTML={{ __html: \"document.documentElement.classList.add('js')\" }} />\n\n/* globals.css */\nhtml.js [data-reveal] { visibility: hidden; }",
          },
          {
            type: "p",
            text: "Then set the wrapper visible in the same effect that applies the “from” state, so there's never a painted frame in between. For content above the fold, prefer plain CSS keyframes: they start before hydration and don't hold back the largest paint.",
          },
        ],
      },
      {
        id: "reduced-motion",
        title: "Respect reduced motion",
        blocks: [
          {
            type: "p",
            text: "Check `prefers-reduced-motion` before creating any tween, and show content in its final state instead. `gsap.matchMedia()` can do this declaratively and reverts automatically when the preference changes.",
          },
          {
            type: "code",
            lang: "ts",
            code: 'const mm = gsap.matchMedia();\nmm.add("(prefers-reduced-motion: no-preference)", () => {\n  gsap.from(".tile", { autoAlpha: 0, y: 16, stagger: 0.06 });\n});\n// later: mm.revert();',
          },
        ],
      },
      {
        id: "refresh",
        title: "Refresh when layout settles",
        blocks: [
          {
            type: "p",
            text: "ScrollTrigger measures positions when it's created. Fonts swapping in, images loading or a filtered list changing height can shift everything below. Call `ScrollTrigger.refresh()` after those layout changes, or use `once: true` triggers that tolerate small shifts.",
          },
        ],
      },
    ],
  },
  {
    slug: "sqlite-in-production-mobile-apps",
    category: "Technical",
    title: "SQLite in production mobile apps",
    excerpt: "Migrations, sync, and the WAL settings nobody documents.",
    date: "Mar 2026",
    isoDate: "2026-03-17",
    readingTime: "8 min",
    sections: [
      {
        id: "pragmas",
        title: "Set the pragmas on every open",
        blocks: [
          {
            type: "p",
            text: "SQLite's defaults favour compatibility, not mobile apps. Set these each time you open the connection; most of them are per-connection, not stored in the file.",
          },
          {
            type: "code",
            lang: "sql",
            code: "PRAGMA journal_mode = WAL;     -- readers don't block the writer\nPRAGMA synchronous = NORMAL;   -- safe with WAL, far fewer fsyncs\nPRAGMA foreign_keys = ON;      -- off by default!\nPRAGMA busy_timeout = 3000;    -- wait instead of failing on a lock",
          },
          {
            type: "callout",
            title: "Why WAL matters on mobile",
            text: "In WAL mode a background sync can write while the UI reads. With the default rollback journal, a long write blocks every read and the screen freezes on a query that normally takes a millisecond.",
          },
        ],
      },
      {
        id: "migrations",
        title: "Migrations with user_version",
        blocks: [
          {
            type: "p",
            text: "SQLite has a built-in integer for schema versions: `PRAGMA user_version`. Keep migrations as an ordered list and run every one newer than the stored version, each inside its own transaction.",
          },
          {
            type: "code",
            lang: "ts",
            code: 'const migrations = [\n  `CREATE TABLE notes (id INTEGER PRIMARY KEY, body TEXT NOT NULL)`,\n  `ALTER TABLE notes ADD COLUMN updated_at INTEGER`,\n];\n\nconst [{ user_version }] = await db.getAllAsync("PRAGMA user_version");\nfor (let v = user_version; v < migrations.length; v++) {\n  await db.withTransactionAsync(async () => {\n    await db.execAsync(migrations[v]);\n    await db.execAsync(`PRAGMA user_version = ${v + 1}`);\n  });\n}',
          },
          {
            type: "p",
            text: "Never edit a migration that has shipped. A user on an old version will run the new text against an old schema, and you'll be debugging a state no test ever produced.",
          },
        ],
      },
      {
        id: "write-in-batches",
        title: "Write in transactions",
        blocks: [
          {
            type: "p",
            text: "Each statement outside a transaction is its own transaction, with its own disk sync. Inserting a thousand synced rows one by one can take seconds; the same inserts inside one transaction take milliseconds.",
          },
        ],
      },
      {
        id: "off-the-ui-thread",
        title: "Keep queries off the UI thread",
        blocks: [
          {
            type: "p",
            text: "Use the async API of your SQLite library so queries never run on the thread that draws frames, add indexes for every column you filter or sort on, and run `PRAGMA optimize` occasionally — for example when the app goes to the background.",
          },
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
