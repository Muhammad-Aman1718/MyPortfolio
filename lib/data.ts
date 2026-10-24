/**
 * All site content lives here — swap the placeholder copy for your real
 * details in one place. Identity and contact details live in lib/site.ts.
 */

export const stats = [
  { value: 2, suffix: "+", label: "years building" },
  { value: 4, suffix: "", label: "roles held" },
  { value: 3, suffix: "", label: "teams worked with" },
  { value: 45, suffix: "+", label: "tools & technologies" },
];

/** Teams Aman has shipped with — the "worked with" strip under the hero. */
export const companies = ["SIGMAKODE", "TECHLOSET", "CodeeTechs"];

/** A tool, with its Simple Icons slug when one exists (SVG served from /logos/<slug>.svg). */
export type Tool = { name: string; logo?: string };

/** The mobile stack, grouped. Mobile app development is the whole focus of this portfolio. */
export const skillGroups: {
  name: string;
  context: string;
  icon: string;
  items: Tool[];
}[] = [
  {
    name: "Cross-platform",
    context:
      "React Native is my main stack — one codebase that feels native on iOS and Android.",
    icon: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 19h2",
    items: [
      { name: "React Native", logo: "react" },
      { name: "Expo", logo: "expo" },
      { name: "Expo Router", logo: "expo" },
      { name: "React Native CLI", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "JavaScript", logo: "javascript" },
      { name: "Flutter", logo: "flutter" },
      { name: "Dart", logo: "dart" },
    ],
  },
  {
    name: "iOS",
    context: "Native modules, signing and getting through App Store review.",
    icon: "M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.8zM14.1 5.9c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3z",
    items: [
      { name: "Swift", logo: "swift" },
      { name: "SwiftUI", logo: "swift" },
      { name: "Xcode", logo: "xcode" },
      { name: "iOS SDK", logo: "ios" },
      { name: "CocoaPods", logo: "cocoapods" },
      { name: "TestFlight", logo: "apple" },
      { name: "App Store Connect", logo: "appstore" },
    ],
  },
  {
    name: "Android",
    context: "Kotlin modules, Gradle builds and Play Store releases.",
    icon: "M7 10h10v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1zM7 9a5 5 0 0 1 10 0zM9.5 6.5h.01M14.5 6.5h.01M5 11v5M19 11v5M8 4 9 5.5M16 4l-1 1.5",
    items: [
      { name: "Kotlin", logo: "kotlin" },
      { name: "Jetpack Compose", logo: "jetpackcompose" },
      { name: "Java", logo: "openjdk" },
      { name: "Android SDK", logo: "android" },
      { name: "Android Studio", logo: "androidstudio" },
      { name: "Gradle", logo: "gradle" },
      { name: "Google Play Console", logo: "googleplay" },
    ],
  },
  {
    name: "State & data",
    context:
      "Predictable state, cached server data and fast local storage — online or off.",
    icon: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6",
    items: [
      { name: "Redux Toolkit", logo: "redux" },
      { name: "RTK Query", logo: "redux" },
      { name: "TanStack Query", logo: "reactquery" },
      { name: "Zustand" },
      { name: "SQLite", logo: "sqlite" },
      { name: "MMKV" },
      { name: "AsyncStorage" },
    ],
  },
  {
    name: "Backend & services",
    context: "The APIs, auth, push and payments a mobile app talks to.",
    icon: "M5 8h14M5 12h14M5 16h14M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    items: [
      { name: "Firebase", logo: "firebase" },
      { name: "Supabase", logo: "supabase" },
      { name: "Node.js", logo: "nodedotjs" },
      { name: "REST APIs" },
      { name: "GraphQL", logo: "graphql" },
      { name: "Push notifications (FCM / APNs)", logo: "firebase" },
      { name: "In-app purchases", logo: "appstore" },
    ],
  },
  {
    name: "UI & motion",
    context: "Smooth 60fps screens, gestures and navigation that feel native.",
    icon: "M4 5h16v11H4zM8 21h8M12 16v5",
    items: [
      { name: "Reanimated" },
      { name: "Gesture Handler" },
      { name: "React Navigation", logo: "react" },
      { name: "NativeWind", logo: "tailwindcss" },
      { name: "Lottie", logo: "lottiefiles" },
      { name: "Figma", logo: "figma" },
    ],
  },
  {
    name: "Testing & release",
    context:
      "Automated builds, tests and crash reporting from first commit to store.",
    icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.4-2.4 2.4-2.4z",
    items: [
      { name: "Jest", logo: "jest" },
      { name: "Detox" },
      { name: "EAS Build", logo: "expo" },
      { name: "Fastlane", logo: "fastlane" },
      { name: "Sentry", logo: "sentry" },
      { name: "GitHub Actions", logo: "githubactions" },
      { name: "Git", logo: "git" },
    ],
  },
];

/** Simple Icons slug for a tool name — from the skill groups, plus the store names used in short lists. */
export const toolLogo = (name: string): string | undefined =>
  skillGroups.flatMap((g) => g.items).find((t) => t.name === name)?.logo ??
  (
    { "App Store": "appstore", "Google Play": "googleplay" } as Record<
      string,
      string
    >
  )[name];

/** Most-used tools, for tickers and short lists. */
export const coreTools = [
  "React Native",
  "Expo",
  "TypeScript",
  "Swift",
  "Kotlin",
  "Redux Toolkit",
  "RTK Query",
  "Reanimated",
  "React Navigation",
  "Firebase",
  "Jest",
  "Fastlane",
  "Sentry",
  "App Store",
  "Google Play",
];

/** Work history from muhammad-aman.com/experience, newest first. */
export const experience = [
  {
    years: "Jul 2026 — now",
    role: "Mobile App Developer (Junior)",
    company: "SIGMAKODE",
    location: "Faisalabad, Pakistan",
    current: true,
    bullets: [
      "Developing high-performance cross-platform mobile apps with React Native and TypeScript.",
      "Building scalable features, integrating REST APIs, and managing state with Redux Toolkit and RTK Query.",
      "Working with the team to ship production-ready apps with a strong focus on performance and user experience.",
    ],
    tags: [
      "TypeScript",
      "React Native",
      "Expo",
      "React Native CLI",
      "Redux Toolkit",
      "RTK Query",
      "REST APIs",
    ],
  },
  {
    years: "May — Jul 2026",
    role: "Mobile App Developer (Internship)",
    company: "SIGMAKODE",
    location: "Faisalabad, Pakistan",
    current: false,
    bullets: [
      "Built and maintained cross-platform applications with React Native and TypeScript.",
      "Integrated REST APIs and implemented state management with Redux Toolkit and RTK Query.",
      "Optimised app performance alongside the development team.",
    ],
    tags: ["TypeScript", "React Native", "Expo", "RTK Query", "Redux"],
  },
  {
    years: "2024 — 2025",
    role: "Full-Stack Developer (Bootcamp)",
    company: "TECHLOSET",
    location: "Faisalabad, Pakistan",
    current: false,
    bullets: [
      "Recognised for delivering high-performance web applications focused on scalability and user-centric design.",
      "Built full-stack systems and cross-platform mobile apps with React Native.",
      "Improved site speed and SEO through custom WordPress plugin engineering and optimised API structures.",
    ],
    tags: [
      "TypeScript",
      "React",
      "Next.js",
      "MongoDB",
      "REST APIs",
      "React Native",
      "Redux",
    ],
  },
  {
    years: "2024",
    role: "Frontend Developer (Internship)",
    company: "CodeeTechs",
    location: "Faisalabad, Pakistan",
    current: false,
    bullets: [
      "Worked with an experienced IT team on Next.js tasks.",
      "Gained hands-on experience in team workflows and grew my proficiency in Next.js.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux"],
  },
];

/** Overall time at each company, shown once above its roles. */
const companyPeriods: Record<string, string> = {
  SIGMAKODE: "May 2026 — now",
  TECHLOSET: "2024 — 2025",
  CodeeTechs: "2024",
};

/**
 * Work history grouped by company (newest first) so a company with several
 * roles — internship then junior — appears once with its roles beneath.
 */
export const experienceByCompany = experience.reduce<
  {
    company: string;
    location: string;
    period: string;
    current: boolean;
    roles: typeof experience;
  }[]
>((groups, role) => {
  const group = groups.find((g) => g.company === role.company);
  if (group) {
    group.roles.push(role);
    group.current ||= role.current;
  } else {
    groups.push({
      company: role.company,
      location: role.location,
      period: companyPeriods[role.company] ?? role.years,
      current: role.current,
      roles: [role],
    });
  }
  return groups;
}, []);

/** Placeholder testimonials — replace with real client quotes before publishing. */
export const testimonials = [
  {
    quote:
      "Aman rebuilt our app in half the estimated time and it hasn't crashed once in eight months. Worth every dollar.",
    name: "Sarah Mitchell",
    role: "CTO, FleetPulse",
    featured: true,
  },
  {
    quote:
      "The rare engineer who pushes back on bad ideas and delivers better ones.",
    name: "Omar Farooq",
    role: "Founder, Ledgerly",
  },
  {
    quote:
      "Clear communication, honest estimates, and production-quality code from day one.",
    name: "Anna Keller",
    role: "PM, TechVentures",
  },
  {
    quote:
      "Our store rating went from 3.8 to 4.7 after his performance overhaul.",
    name: "David Chen",
    role: "Product Lead, Digital Studio Co",
  },
];

export const services = [
  {
    name: "React Native App Development",
    description:
      "One codebase, two stores — iOS and Android apps built for reliability, performance and approval on the first try.",
    items: [
      "Architecture & setup",
      "UI implementation",
      "API integration",
      "Store submission",
      "3 months support",
    ],
    engagement: "fixed scope",
    from: "from $8k",
    featured: true,
  },
  {
    name: "Native iOS & Android Features",
    description:
      "Swift and Kotlin modules for what JavaScript can't reach — camera, payments, background work, widgets.",
    items: [
      "Native modules",
      "Push notifications",
      "In-app purchases",
      "Deep links",
      "Device APIs",
    ],
    engagement: "fixed scope / weekly",
    from: "from $5k",
  },
  {
    name: "App Rescue & Performance",
    description:
      "Audits and fixes for existing apps — crashes, slow start-up, janky screens and failed store reviews.",
    items: [
      "Codebase audit",
      "Performance profiling",
      "Crash fixing",
      "Upgrade to latest RN",
      "Written report",
    ],
    engagement: "weekly",
    from: "from $2k",
  },
];

export const faqs = [
  {
    q: "How do we get started?",
    a: "A short call where you walk me through the product and the deadline. Within two days you get a written scope, a timeline and a fixed price — or an honest no if I'm not the right fit.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. Most of my work is taking an idea or a shaky prototype to a first release real users can rely on, then staying on to harden it.",
  },
  {
    q: "What does a typical project timeline look like?",
    a: "A focused mobile or web MVP usually ships in 6–10 weeks. You get a working build every week, not a big reveal at the end.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Often the best place to start. I begin with a paid audit, fix what's on fire, then plan the rest so the product keeps shipping while it improves.",
  },
  {
    q: "What happens after launch?",
    a: "Every fixed-scope project includes three months of support. After that you can move to a weekly retainer or take the code in-house — it's documented for that.",
  },
];

/** Full project list for /projects (flagship spans two columns when unfiltered). */
export const allProjects: {
  slug: string;
  name: string;
  type: string;
  year: string;
  role: string;
  tagline: string;
  tags: string[];
  tone: string;
  flagship?: boolean;
}[] = [
  {
    slug: "quran-companion",
    name: "Quran Companion",
    type: "Mobile",
    year: "2025",
    role: "Solo build",
    tagline: "Offline-first Quran app with 100k+ daily readers.",
    tags: ["React Native", "SQLite", "Reanimated"],
    tone: "from-primary/30",
    flagship: true,
  },
  {
    slug: "fleetpulse-dashboard",
    name: "FleetPulse Dashboard",
    type: "Web",
    year: "2025",
    role: "Lead engineer",
    tagline: "Real-time logistics tracking that cut dispatch errors by 60%.",
    tags: ["Next.js", "WebSockets", "Redis"],
    tone: "from-accent/20",
  },
  {
    slug: "ledgerly",
    name: "Ledgerly",
    type: "Web",
    year: "2024",
    role: "Full-stack",
    tagline: "Accounting automation for freelancers.",
    tags: ["Next.js", "tRPC", "Stripe"],
    tone: "from-secondary",
  },
  {
    slug: "banklite",
    name: "BankLite",
    type: "Mobile",
    year: "2023",
    role: "Team lead",
    tagline: "Fintech app serving 250k customers at 0.3% crash rate.",
    tags: ["React Native", "Kotlin", "GraphQL"],
    tone: "from-primary/20",
  },
  {
    slug: "orderflow-api",
    name: "OrderFlow API",
    type: "Backend",
    year: "2023",
    role: "Architect",
    tagline: "Order-processing backbone handling 2M requests a day.",
    tags: ["NestJS", "PostgreSQL", "Docker"],
    tone: "from-accent/15",
  },
  {
    slug: "studiosite-cms",
    name: "StudioSite CMS",
    type: "Client work",
    year: "2022",
    role: "Full-stack",
    tagline: "Custom CMS powering 12 agency client sites.",
    tags: ["React", "Node.js", "PostgreSQL"],
    tone: "from-secondary",
  },
];
