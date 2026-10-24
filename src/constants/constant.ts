/**
 * Every piece of constant data in the site — identity, navigation, page copy,
 * portfolio data, long-form content, icons and motion presets. Components,
 * hooks and utils read from here; nothing hard-codes content inline.
 */
import type {
  CaseStudy,
  ChangeFrequency,
  ContactField,
  ExperienceRole,
  Fact,
  Faq,
  IconCard,
  IconDefinition,
  IconName,
  LegalPageContent,
  NavLink,
  PageMetaInput,
  Paper,
  Post,
  PostsTab,
  ProcessStep,
  ProjectSummary,
  RevealPreset,
  RevealVariant,
  RouteCard,
  Service,
  SiteConfig,
  SitemapPage,
  SkillGroup,
  Stat,
  Testimonial,
  ThemeColors,
  Tool,
} from "@/types/types";

/* ═══════════════════════════ Identity ═══════════════════════════ */

export const SITE: SiteConfig = {
  name: "Muhammad Aman",
  shortName: "Aman",
  url: "https://muhammad-aman.com",
  email: "contact@muhammad-aman.com",
  role: "Mobile App Developer",
  employer: "SIGMAKODE",
  location: {
    city: "Faisalabad",
    country: "Pakistan",
    countryCode: "PK",
    timezone: "UTC+5",
  },
  whatsapp: {
    display: "+92 328 1199135",
    href: "https://wa.me/923281199135?text=Hello%20Muhammad%20Aman%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  },
  description:
    "Muhammad Aman is a mobile app developer in Faisalabad, Pakistan, building fast, reliable iOS and Android apps with React Native, Swift and Kotlin.",
  keywords: [
    "Muhammad Aman",
    "mobile app developer",
    "React Native developer",
    "iOS developer",
    "Android developer",
    "Expo",
    "TypeScript",
    "mobile app developer Pakistan",
    "Faisalabad",
  ],
  knowsAbout: [
    "React Native",
    "Expo",
    "TypeScript",
    "Swift",
    "Kotlin",
    "iOS development",
    "Android development",
    "Mobile app development",
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-aman1718/" },
    { label: "GitHub", href: "https://github.com/Muhammad-Aman1718" },
  ],
  portrait: "/imgs/muhammad-aman.avif",
};

/** Raw theme values for places CSS variables can't reach (OG image, viewport). */
/** Default page title: "Name — Role". */
export const SITE_TITLE = `${SITE.name} — ${SITE.role}`;

/** schema.org @id of the site owner, shared by every JSON-LD block. */
export const PERSON_ID = `${SITE.url}/#person`;

export const THEME: ThemeColors = {
  background: "#111112",
  foreground: "#fafafa",
  muted: "#b8b8b8",
  primary: "#ea0044",
};

export const OG_IMAGE = {
  path: "/opengraph-image",
  width: 1200,
  height: 630,
  /** The name as set on the card: first line plain, second in crimson */
  lead: "MUHAMMAD",
  accent: "AMAN.",
};

/* ═══════════════════════════ Navigation ═══════════════════════════ */

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/posts", label: "Posts" },
  { href: "/contact", label: "Contact" },
];

export const LEGAL_LINKS: NavLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export const SITEMAP_PAGES: SitemapPage[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/experience", priority: 0.8, changeFrequency: "monthly" },
  { path: "/skills", priority: 0.7, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/posts", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.2, changeFrequency: "yearly" },
];

/** Detail pages in the sitemap: case studies rank a little above articles. */
export const SITEMAP_DETAIL = {
  changeFrequency: "yearly" as ChangeFrequency,
  project: 0.7,
  article: 0.6,
};

/** Link transition types (React <ViewTransition>). */
export const TRANSITION_FORWARD = ["nav-forward"];
export const TRANSITION_BACK = ["nav-back"];
export const ROUTE_TRANSITION_TYPES = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "page-fade",
};
/** Project previews morph into the case-study hero on forward navigation only. */
export const PREVIEW_MORPH = { "nav-forward": "morph", default: "none" };

/** Inline <head> script: lets CSS hide scroll-reveal content before first paint only when JS will animate it. */
export const JS_FLAG_SCRIPT = "document.documentElement.classList.add('js')";

/* ═══════════════════════════ Behaviour tuning ═══════════════════════════ */

export const UI = {
  /** Navbar gains its shadow past this scroll offset (px) */
  navScrolledAt: 8,
  /** Desktop navbar folds into the compact pill past this offset (px) */
  navCompactAt: 160,
  /** Contact dock appears after this fraction of the viewport height */
  dockShowAtViewport: 0.7,
  /** Services stack: a card is "on top" once its top passes this viewport fraction */
  stackHandoverAt: 0.55,
  /** How long "Copied" feedback stays (ms) */
  copyFeedbackMs: 1800,
  /** Footer verb rotation (ms) */
  rotateEveryMs: 2400,
  /** Testimonial strip loop duration */
  testimonialLoop: "70s",
  /** Experience page: bullets / tags shown per role */
  roleBullets: 2,
  roleTags: 5,
  /** Home: projects shown in "Selected work" */
  homeProjects: 3,
  /** Mobile menu link stagger (ms) */
  menuStaggerMs: 40,
  /** Skills page: every n-th tool in the daily stack is set bright */
  dailyStackAccentEvery: 4,
  /** Skills page: stats shown after the tool count */
  skillStats: 3,
  /** Contact page: channel cards slide in from this delay, one step apart (ms) */
  channelEnterAt: 150,
  channelEnterStep: 90,
  /** Article page: posts suggested under "Keep reading" */
  keepReading: 2,
  /** Research cards: findings shown per paper */
  paperFindings: 3,
} as const;

/* ═══════════════════════════ Page metadata ═══════════════════════════ */

export const PAGE_META: Record<
  "about" | "experience" | "skills" | "services" | "contact" | "projects" | "posts",
  PageMetaInput
> = {
  about: {
    title: "About",
    description:
      "Muhammad Aman is a mobile app developer from Faisalabad, Pakistan, building iOS and Android apps with React Native, Swift and Kotlin.",
    path: "/about",
  },
  experience: {
    title: "Experience",
    description:
      "Work experience of Muhammad Aman — Mobile App Developer at SIGMAKODE, Full-Stack Developer at TECHLOSET and Frontend Developer at CodeeTechs, Faisalabad.",
    path: "/experience",
  },
  skills: {
    title: "Skills",
    description:
      "The mobile stack of Muhammad Aman — React Native, Expo, Swift, Kotlin, Redux Toolkit, Firebase and the tools to test and ship iOS and Android apps.",
    path: "/skills",
  },
  services: {
    title: "Services",
    description:
      "Hire Muhammad Aman for React Native app development, native iOS and Android features, and app performance rescue — fixed scope, weekly builds.",
    path: "/services",
  },
  contact: {
    title: "Contact",
    description:
      "Contact Muhammad Aman about a mobile project — email contact@muhammad-aman.com or message on WhatsApp. Replies within 24 hours.",
    path: "/contact",
  },
  projects: {
    title: "Projects",
    description:
      "Mobile apps by Muhammad Aman — React Native, iOS and Android projects with case studies on the problem, the build and the result.",
    path: "/projects",
  },
  posts: {
    title: "Posts & Research",
    description:
      "Articles and research notes by Muhammad Aman on React Native, mobile performance and building software that scales.",
    path: "/posts",
  },
};

/* ═══════════════════════════ Page copy ═══════════════════════════ */

export const COPY = {
  layout: {
    skipToContent: "Skip to content",
  },
  navbar: {
    hire: "Hire me",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeLabel: `${SITE.name} — home`,
  },
  dock: {
    label: "Speak to me",
    cta: "Book a call",
  },
  footer: {
    lead: "Let's",
    words: ["design", "build", "ship"],
    tail: "an app people rely on.",
    emailLabel: "Email",
    cta: "Book a call",
    pages: "Pages",
    elsewhere: "Elsewhere",
    legal: "Legal",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
  cta: {
    eyebrow: "Next step",
    title: "Have a project in mind?",
    button: "Start a conversation",
  },
  home: {
    badge: `${SITE.role} · iOS & Android`,
    titleLead: "I build mobile apps",
    titleAccent: "people love to use.",
    intro: `Hi, I'm ${SITE.name}. I design and ship fast, reliable apps with React Native — and go native with Swift and Kotlin when a feature needs it.`,
    primaryCta: "Book a call with me",
    secondaryCta: "See my work",
    builtWith: "Built with",
    shippedWith: "Shipped with",
    tickerLabel: "Technologies I work with",
    proofLabel: "Teams and tools",
    work: {
      eyebrow: "Latest projects",
      title: "Selected work",
      highlight: ["work"],
      carouselLabel: "Selected projects",
      all: "All {count} projects",
      view: "View",
    },
    services: {
      eyebrow: "Services",
      title: "What I help you build…",
      highlight: ["build…"],
      description: "Three ways to work together — each scoped up front, with a fixed price and weekly builds.",
      toolsLabel: "Tools I use",
      compare: "Compare services",
    },
    about: {
      eyebrow: "About me",
      title: "Apps people keep using.",
      highlight: ["keep", "using."],
      text: "I turn complex requirements into apps that feel simple in the hand — quick to launch, smooth to use and steady through store review. Today I build React Native apps at SIGMAKODE in Faisalabad.",
      more: "More about me",
      experience: "Experience",
      historyLabel: "Work history",
      rolesLabel: "roles",
      current: "Current",
      fullExperience: "Full experience",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Hear it from my clients.",
      highlight: ["my", "clients."],
      label: "Client testimonials",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered.",
      highlight: ["answered."],
    },
    booking: {
      badge: "Free · 30 minutes",
      title: "Still not sure?",
      text: "Book a free discovery call. No pitch — just an honest answer on whether I'm the right person for the app you're building.",
      cta: "Book a free call",
    },
  },
  about: {
    hero: {
      eyebrow: "About me",
      title: "I build apps people keep.",
      highlight: ["keep."],
      description:
        "Mobile app developer focused on fast, reliable iOS and Android apps — turning complex requirements into apps that feel simple in the hand.",
    },
    lead: `I'm ${SITE.name}, a mobile app developer building iOS and Android apps with React Native.`,
    paragraphs: [
      "I care about the details users feel: a quick launch, smooth 60fps screens, offline that just works, and a release that sails through store review. From the first screen to the App Store and Google Play, my work is shaped by apps real people use every day.",
      "I started on the web with React and Next.js, and moved to mobile for good. Today I build React Native apps at SIGMAKODE in Faisalabad — and drop into Swift or Kotlin when a feature needs to go native.",
    ],
    primaryCta: "Work with me",
    secondaryCta: "See my experience",
    journey: { eyebrow: "Journey", title: "How I got here.", highlight: ["here."] },
    beyond: { eyebrow: "Beyond the code", title: "What keeps me sharp.", highlight: ["sharp."] },
    cta: "Let's collaborate on your next project.",
  },
  experience: {
    hero: {
      eyebrow: "Experience",
      title: "Where I've built.",
      highlight: ["built."],
      description: "From the web to mobile for good — the teams I've shipped with and what I built there.",
    },
    hire: "Hire me",
    current: "Current",
    roles: "roles",
    technologies: "Technologies",
    cta: "Need a developer on your team?",
  },
  skills: {
    hero: {
      eyebrow: "Skills & technologies",
      title: "The stack I build with.",
      highlight: ["build", "with."],
      description:
        "Modern frameworks and tools for fast, scalable, reliable applications — with clean, maintainable code and interfaces that perform in the real world.",
    },
    groupsLabel: "Skill groups",
    tools: "tools",
    daily: { eyebrow: "Daily stack", title: "What I reach for first.", highlight: ["first."] },
    totalLabel: "technologies listed",
    cta: {
      title: "Have a stack in mind?",
      description: "If your project uses these tools, let's talk about what you're building.",
    },
  },
  services: {
    hero: {
      eyebrow: "Services",
      title: "What I can build for you.",
      highlight: ["build", "for", "you."],
      description: "Three ways to work together — each scoped up front, with a clear price and a working build every week.",
    },
    featuredBadge: "Most requested",
    includes: "includes",
    starting: "starting",
    discuss: "Discuss this",
    included: "See what's included",
    process: { eyebrow: "Process", title: "How a project runs.", highlight: ["runs."] },
    faq: { eyebrow: "FAQ", title: "Before you ask.", highlight: ["ask."] },
  },
  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Let's talk about your project.",
      highlight: ["your", "project."],
      description:
        "Tell me what you're building — the honest version, including the messy parts. That's usually where the interesting work is.",
    },
    basedIn: `Based in ${SITE.location.city}, ${SITE.location.country} (${SITE.location.timezone}) — working with clients remotely.`,
    faq: { eyebrow: "FAQ", title: "Common questions.", highlight: ["questions."] },
  },
  projects: {
    hero: {
      eyebrow: "Projects",
      title: "Selected work.",
      highlight: ["work."],
      description:
        "Mobile apps, web products and the backends behind them — each with a case study on the problem, the build and the result.",
    },
    filterLabel: "Filter projects by type",
    showing: "Showing",
    of: "of",
    featured: "Featured",
    cta: "Want something like this built?",
  },
  project: {
    all: "All projects",
    caseStudy: "case study",
    caseStudyTitle: "Case study",
    stack: "stack",
    previous: "previous",
    next: "next",
    moreLabel: "More projects",
    facts: { role: "role", timeline: "timeline", team: "team", platform: "platform" },
    ctaDescription: "Need something built with the care that went into {name}? Tell me about it.",
  },
  posts: {
    eyebrow: "writing",
    title: "Posts & research",
    intro: "Notes from production: mobile performance, architecture decisions, and the business of building software well.",
    tabsLabel: "Content type",
    filterLabel: "Filter posts by category",
    featured: "Featured",
    readArticle: "Read article",
    read: "read",
    minutes: "min",
    empty: "Nothing in this category yet.",
    paper: "Paper",
    readPaper: "Read paper",
  },
  post: {
    all: "All posts",
    keepReading: "Keep reading",
    read: "read",
  },
  research: {
    all: "All research",
    by: "by",
    topics: "Topics",
    paper: "paper",
    cite: "Cite",
    requestPdf: "Request PDF",
    abstract: "ABSTRACT",
    citeTitle: "Cite this paper",
    bibtex: "BibTeX",
    copyCitation: "Copy citation",
  },
  notFound: {
    metaTitle: "Page not found",
    eyebrow: "Error 404",
    titleLead: "This page took a",
    titleAccent: "wrong turn.",
    text: "The link may be old or mistyped. Everything that exists is one click away below.",
    home: "Back to home",
    report: "Report a broken link",
    popular: "Popular pages",
  },
  legal: {
    eyebrow: "Legal",
    onThisPage: "On this page",
    lastUpdated: "Last updated",
    questions: "Questions about this policy?",
    replyNote: "— I reply within a few working days.",
    emailLead: "Email",
    contact: "Contact",
  },
  toc: {
    label: "On this page",
    heading: "on this page",
  },
  carousel: {
    previous: "Previous project",
    next: "Next project",
  },
  marquee: {
    pause: "Pause technology ticker",
  },
  copy: {
    copy: "Copy",
    copied: "Copied",
    copyCode: "Copy code",
    copyLink: "Copy link",
    linkCopied: "Link copied",
  },
} as const;

/* ═══════════════════════════ Contact form ═══════════════════════════ */

export const CONTACT_FIELDS: ContactField[] = ["name", "email", "message"];

export const CONTACT_FORM = {
  title: "Project brief",
  required: "required · ~2 min",
  name: { label: "Name", placeholder: "Your name" },
  email: { label: "Email", placeholder: "you@company.com" },
  type: { label: "Project type", placeholder: "Select…" },
  budget: { label: "Budget range", optional: "(optional)", placeholder: "Select…" },
  message: { label: "Message", placeholder: "What are you building?" },
  submit: "Send message",
  sending: "Sending…",
  hint: "I reply within 24 hours on working days.",
  failed: "Your message couldn't be sent. Check your connection and try again, or email me at",
  sentTitle: "Message sent",
  sentText: "Thanks — your brief is in my inbox and I'll reply within 24 hours on working days. Anything urgent? Email me at",
  back: "Send another message",
  subject: "Project enquiry from",
} as const;

/** Formspree form that delivers the project brief to my inbox. */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwllvejy";

/** Hidden field bots fill in; Formspree drops any submission that has it. */
export const HONEYPOT_FIELD = "_gotcha";

export const PROJECT_TYPE_OPTIONS = [
  "React Native App Development",
  "Native iOS & Android Features",
  "App Rescue & Performance",
  "Other",
];

export const BUDGET_OPTIONS = ["under $2k", "$2–5k", "$5–15k", "$15k+"];

/** Says what's wrong and how to fix it. */
export const CONTACT_ERRORS = {
  name: "Please enter your name.",
  emailMissing: "Please enter your email so I can reply.",
  emailInvalid: "That email looks incomplete — use a format like you@company.com.",
  message: "Tell me a little about the project (at least 10 characters).",
} as const;

/** Inline markup in long-form text: `code`, **bold** and [label](href). */
export const INLINE_TOKEN_PATTERN = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
export const INLINE_LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MESSAGE_MIN_LENGTH = 10;

/* ═══════════════════════════ Page-specific data ═══════════════════════════ */

/** Hero "Built with" row. */
export const HERO_STACK: Tool[] = [
  { name: "React Native", logo: "react" },
  { name: "Expo", logo: "expo" },
  { name: "Swift", logo: "swift" },
  { name: "Kotlin", logo: "kotlin" },
  { name: "TypeScript", logo: "typescript" },
  { name: "Firebase", logo: "firebase" },
];

/** Platform marks in the hero badge. */
export const HERO_PLATFORMS: Tool[] = [
  { name: "iOS", logo: "apple" },
  { name: "Android", logo: "android" },
];

/** Logos for short-list names that aren't skill-group entries. */
export const EXTRA_TOOL_LOGOS: Record<string, string> = {
  "App Store": "appstore",
  "Google Play": "googleplay",
};

export const ABOUT_FACTS: Fact[] = [
  { label: "Based in", value: `${SITE.location.city}, ${SITE.location.country}` },
  { label: "Focus", value: "iOS & Android apps" },
  { label: "Currently", value: `${SITE.role} at ${SITE.employer}` },
  { label: "Building since", value: "2024" },
];

export const ABOUT_BEYOND: IconCard[] = [
  {
    title: "Writing",
    text: "I share research-based notes on what I build on Hashnode and Medium.",
    icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  },
  {
    title: "Open source",
    text: "Contributing back and building free apps and tools in my spare time.",
    icon: "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  },
  {
    title: "Machine learning & AI",
    text: "Currently diving into ML and AI to widen the problems I can solve.",
    icon: "M12 2a4 4 0 0 1 4 4v1a3 3 0 0 1 3 3v1a3 3 0 0 1-1 5.2V18a4 4 0 0 1-6 3.5A4 4 0 0 1 6 18v-1.8A3 3 0 0 1 5 11v-1a3 3 0 0 1 3-3V6a4 4 0 0 1 4-4zM12 2v19.5",
  },
  {
    title: "New frameworks",
    text: "Experimenting with new tools before they reach client work.",
    icon: "M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
];

export const SERVICE_STEPS: ProcessStep[] = [
  { title: "Discover", text: "A call to understand the problem, constraints, and what success means." },
  { title: "Scope", text: "Architecture, timeline and a fixed estimate you can hold me to." },
  { title: "Build", text: "Weekly demos, honest progress reports, production-quality code." },
  { title: "Support", text: "Launch help and a support window included in every engagement." },
];

export const CONTACT_FAQS: Faq[] = [
  {
    q: "How long until I hear back?",
    a: "Usually within 24 hours on working days. For anything time-sensitive, WhatsApp is the fastest way to reach me.",
  },
  {
    q: "I haven't heard back yet — what should I do?",
    a: `Check your spam folder first, then send a short follow-up to ${SITE.email} or a WhatsApp message. Messages occasionally get lost; a nudge is always welcome.`,
  },
  {
    q: "What should I include in my message?",
    a: "What you're building, who it's for, your timeline, and anything already in place (designs, an existing codebase, an API). A rough budget range helps me suggest the right scope.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: `Yes. I'm based in ${SITE.location.city} (${SITE.location.timezone}) and work with clients remotely, overlapping with European and Middle-East hours.`,
  },
];

/** Notes shown under each contact channel. */
export const CONTACT_NOTES: Record<string, string> = {
  Email: "Replies within 24h",
  WhatsApp: "Fastest for quick questions",
  LinkedIn: "Career & updates",
  GitHub: "Code & side projects",
};

export const NOT_FOUND_ROUTES: RouteCard[] = [
  { href: "/projects", label: "Projects", note: "Selected mobile work" },
  { href: "/experience", label: "Experience", note: "Where I've built" },
  { href: "/posts", label: "Posts", note: "Articles & research" },
  { href: "/contact", label: "Contact", note: "Start a conversation" },
];

/** Arrow keys → tab step (WAI-ARIA tabs pattern). */
export const TAB_KEY_STEPS: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/** First filter of each list shows everything. */
export const FILTER_ALL = "All";

export const POSTS_TABS: PostsTab[] = ["blog", "research"];

/** Anchor of the citation section on a research page. */
export const PAPER_CITE_ID = "cite";

export const BLOG_FILTERS =["All", "Technical", "Tutorials", "Case Study", "Notes"];

export const PROJECT_FILTERS = ["All", "Mobile", "Web", "Backend", "Client work"];

/* ═══════════════════════════ Project preview mock-ups ═══════════════════════════ */

export const PREVIEW_BARS = [38, 62, 45, 80, 56, 92, 70, 84];

/** Terminal preview lines; `{slug}` is replaced with the project slug. */
export const TERMINAL_LINES = [
  { text: "$ {slug} --health", tone: "text-fg/80" },
  { text: "✓ api      200  12ms", tone: "text-fg" },
  { text: "✓ db       ok   pool 18/40", tone: "text-fg/60" },
  { text: "✓ queue    ok   0 lag", tone: "text-fg/60" },
  { text: "→ 2,000,000 req/day", tone: "text-fg/80" },
];

/* ═══════════════════════════ Icons ═══════════════════════════ */

/** One 24×24 stroke style site-wide (no emoji as icons). */
export const ICONS: Record<IconName, IconDefinition> = {
  arrowRight: { path: "M5 12h14M13 6l6 6-6 6" },
  arrowUpRight: { path: "M7 17 17 7M9 7h8v8" },
  chevronLeft: { path: "M15 6l-6 6 6 6" },
  chevronRight: { path: "M9 6l6 6-6 6" },
  chevronDown: { path: "M6 9l6 6 6-6" },
  check: { path: "M20 6 9 17l-5-5" },
  copy: { path: "M9 9h10v10H9zM5 15V5h10" },
  link: {
    path: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1",
  },
  mail: { path: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm-1 2 8 6 8-6" },
  calendar: {
    path: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4",
  },
  plus: { path: "M12 5v14M5 12h14" },
  menu: { path: "M4 8h16M4 16h16" },
  close: { path: "M6 6l12 12M18 6 6 18" },
  alert: { path: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18M12 7.5v5M12 16h.01" },
  play: { path: "M8 5v14l11-7z", filled: true },
  pause: { path: "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z", filled: true },
  quote: {
    path: "M10 7H6a3 3 0 0 0-3 3v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3H6v-1a1 1 0 0 1 1-1h3zM21 7h-4a3 3 0 0 0-3 3v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3h-4v-1a1 1 0 0 1 1-1h3z",
    filled: true,
  },
};

/* ═══════════════════════════ Motion ═══════════════════════════ */

const SHOWN = { autoAlpha: 1, x: 0, y: 0 };

/** Scroll-reveal presets — each section picks the one that fits its content. */
export const REVEAL_PRESETS: Record<RevealVariant, RevealPreset> = {
  "fade-up": { from: { autoAlpha: 0, y: 24 }, to: SHOWN, duration: 0.7, ease: "power3.out", stagger: 0.05 },
  fade: { from: { autoAlpha: 0 }, to: { autoAlpha: 1 }, duration: 0.8, ease: "power1.out", stagger: 0.05 },
  "slide-left": { from: { autoAlpha: 0, x: -36 }, to: SHOWN, duration: 0.75, ease: "power3.out", stagger: 0.05 },
  "slide-right": { from: { autoAlpha: 0, x: 36 }, to: SHOWN, duration: 0.75, ease: "power3.out", stagger: 0.05 },
  scale: {
    from: { autoAlpha: 0, scale: 0.92, y: 16 },
    to: { ...SHOWN, scale: 1 },
    duration: 0.45,
    ease: "back.out(1.4)",
    stagger: 0.06,
  },
  "clip-up": {
    from: { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0% round 16px)", y: 30 },
    to: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 16px)", y: 0 },
    duration: 1,
    ease: "expo.out",
    stagger: 0.08,
  },
  "clip-left": {
    from: { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0% round 16px)" },
    to: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" },
    duration: 1,
    ease: "expo.inOut",
    stagger: 0.08,
  },
  "clip-right": {
    from: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 100% round 16px)" },
    to: { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" },
    duration: 1,
    ease: "expo.inOut",
    stagger: 0.08,
  },
  tilt: {
    from: { autoAlpha: 0, y: 40, rotateX: -16, transformPerspective: 1000, transformOrigin: "50% 0%" },
    to: { ...SHOWN, rotateX: 0 },
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.06,
  },
  mask: { from: { yPercent: 110 }, to: { yPercent: 0 }, duration: 0.9, ease: "power4.out", stagger: 0.04 },
  blur: {
    from: { autoAlpha: 0, y: 24, filter: "blur(10px)" },
    to: { ...SHOWN, filter: "blur(0px)" },
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.06,
  },
};

/* ═══════════════════════════ Legal pages ═══════════════════════════ */

const EMAIL_LINK = `[${SITE.email}](mailto:${SITE.email})`;
const SITE_HOST = SITE.url.replace("https://", "");
const LEGAL_UPDATED = "October 22, 2026";

export const LEGAL_PAGES: Record<"privacy" | "terms" | "refund", LegalPageContent> = {
  privacy: {
    title: "Privacy Policy",
    highlight: ["Policy"],
    path: "/privacy-policy",
    updated: LEGAL_UPDATED,
    description:
      "How muhammad-aman.com collects, uses and protects personal information — minimal collection, no selling of data, and your rights.",
    summary: `This policy explains how **${SITE_HOST}**, run by ${SITE.name}, handles personal information. In short: I only collect what's needed to answer you or do the work you ask for, and I never sell it.`,
    sections: [
      {
        id: "information-we-collect",
        title: "Information we collect",
        blocks: [
          {
            type: "p",
            text: "**Information you give me.** When you send a message, request a quote or hire me, you may share your name, email address, phone number, company, project details and, for paid work, billing information.",
          },
          {
            type: "p",
            text: "**Information collected automatically.** Like most websites, the server and any analytics tools may record technical data such as your IP address, browser type, device and the pages you visit. This is used in aggregate to understand how the site is used.",
          },
        ],
      },
      {
        id: "how-we-use-information",
        title: "How I use information",
        blocks: [
          {
            type: "list",
            items: [
              "Reply to your enquiries, proposals and service requests.",
              "Deliver, invoice and support the work you hire me for.",
              "Send transactional messages such as confirmations and project updates.",
              "Understand site usage so I can improve performance, design and content.",
              "Meet legal obligations and protect my rights.",
            ],
          },
        ],
      },
      {
        id: "sharing",
        title: "Sharing & third parties",
        blocks: [
          { type: "p", text: "I don't sell or rent personal information." },
          {
            type: "p",
            text: "Some trusted providers process data on my behalf — for example hosting, email, analytics and payment processors. They may only use it to provide their service to me. I may also disclose information when the law requires it, or to protect the rights, property or safety of others.",
          },
        ],
      },
      {
        id: "cookies",
        title: "Cookies & tracking",
        blocks: [
          {
            type: "p",
            text: "The site may use cookies and similar technologies for core functionality, remembering preferences and analytics. You can block or delete cookies in your browser settings; the site will still work. Third-party analytics providers have their own privacy policies and opt-out options.",
          },
        ],
      },
      {
        id: "security",
        title: "Security",
        blocks: [
          {
            type: "p",
            text: "The site is served over HTTPS, and access to any data I hold is restricted. No method of transmission or storage is completely secure, so while I take reasonable care I can't guarantee absolute security.",
          },
        ],
      },
      {
        id: "retention",
        title: "How long I keep data",
        blocks: [
          {
            type: "p",
            text: "Enquiries are kept only as long as needed to respond and follow up. Project and billing records are kept for as long as the law requires for accounting and tax purposes, then deleted.",
          },
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        blocks: [
          {
            type: "p",
            text: `You can ask to access, correct or delete the personal information I hold about you, or object to how it is used. Email ${EMAIL_LINK} and I'll respond within 30 days.`,
          },
          {
            type: "p",
            text: "Depending on where you live, you may also have the right to complain to your local data-protection authority.",
          },
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        blocks: [
          {
            type: "p",
            text: "I may update this policy from time to time. The date at the top of the page shows the latest revision.",
          },
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    highlight: ["Service"],
    path: "/terms-of-service",
    updated: LEGAL_UPDATED,
    description:
      "The terms that govern use of muhammad-aman.com and services provided by Muhammad Aman — scope, payments, ownership, liability and governing law.",
    summary: `These terms cover your use of **${SITE_HOST}** and any services provided by ${SITE.name}. Project specifics always live in a separate quote or agreement.`,
    sections: [
      {
        id: "acceptance",
        title: "Acceptance of terms",
        blocks: [
          {
            type: "p",
            text: "By using this website or hiring me for a service, you agree to these terms. If you don't agree, please don't use the site.",
          },
        ],
      },
      {
        id: "services",
        title: "Services & quotes",
        blocks: [
          {
            type: "p",
            text: "I provide software development, consulting and related services. The scope, deliverables, timeline and price of each engagement are set out in a separate written quote or agreement, which takes precedence over these terms where they differ.",
          },
        ],
      },
      {
        id: "payments",
        title: "Payments",
        blocks: [
          {
            type: "p",
            text: "Payments are due as stated on the relevant invoice or quote, by the methods listed there (for example bank transfer or card payment through a third-party gateway). Please provide accurate billing details and raise any billing question promptly.",
          },
        ],
      },
      {
        id: "refunds",
        title: "Refunds",
        blocks: [
          {
            type: "p",
            text: "Refunds are handled under the [Refund Policy](/refund-policy). In short, payments for bespoke work are generally non-refundable, except for billing errors or where the law requires otherwise.",
          },
        ],
      },
      {
        id: "ownership",
        title: "Ownership & your content",
        blocks: [
          {
            type: "p",
            text: "Unless an agreement says otherwise, ownership of the code and deliverables built for you transfers to you once the project is paid in full. I keep the right to reuse general know-how, tools and code that aren't specific to your project.",
          },
          {
            type: "p",
            text: "You're responsible for the content you provide. You allow me to use it to deliver the service and, with your permission, to show the work in my portfolio.",
          },
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        blocks: [
          {
            type: "p",
            text: "To the fullest extent the law allows, I'm not liable for indirect, incidental or consequential damages arising from use of the site or services. My total liability for direct damages is limited to the fees you paid for the service concerned.",
          },
        ],
      },
      {
        id: "termination",
        title: "Termination",
        blocks: [
          {
            type: "p",
            text: "I may suspend or end access to the site for a breach of these terms or for any other lawful reason, with notice where the law requires.",
          },
        ],
      },
      {
        id: "governing-law",
        title: "Governing law & disputes",
        blocks: [
          {
            type: "p",
            text: "These terms are governed by the laws of Pakistan. Both sides agree to try to resolve any dispute through good-faith discussion first. Mandatory consumer-protection laws where you live still apply.",
          },
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        blocks: [
          {
            type: "p",
            text: `I may update these terms; changes take effect when posted here. Continuing to use the site after a change means you accept it. Questions: ${EMAIL_LINK}.`,
          },
        ],
      },
    ],
  },
  refund: {
    title: "Refund Policy",
    highlight: ["Policy"],
    path: "/refund-policy",
    updated: LEGAL_UPDATED,
    description:
      "Refund policy for services purchased from Muhammad Aman via muhammad-aman.com — when refunds apply and how to request one.",
    summary:
      "Bespoke work starts the moment it's paid for, so payments are generally final — with clear exceptions for billing mistakes and anything the law requires.",
    sections: [
      {
        id: "scope",
        title: "Scope",
        blocks: [
          {
            type: "p",
            text: `This policy covers paid services, deposits and fees for project work, consulting and any digital goods sold directly by ${SITE.name}.`,
          },
        ],
      },
      {
        id: "no-refunds",
        title: "Payments are final",
        blocks: [
          {
            type: "p",
            text: "Because work starts as soon as a payment is made, payments for bespoke services and deposits are generally non-refundable. By purchasing a service you accept that the sale is final, unless one of the exceptions below applies.",
          },
        ],
      },
      {
        id: "exceptions",
        title: "Exceptions",
        blocks: [
          {
            type: "list",
            items: [
              "Duplicate charges or clear billing errors confirmed with the payment processor.",
              "Where a refund is required by the consumer-protection law that applies to you.",
              "A material breach of a written agreement on my side.",
            ],
          },
        ],
      },
      {
        id: "how-to-request",
        title: "How to request a refund",
        blocks: [
          {
            type: "list",
            items: [
              `Email ${EMAIL_LINK} with the subject “Refund request”.`,
              "Include your invoice or order number, or other proof of payment, and the reason for the request.",
              "I'll acknowledge it within 7 working days and may ask for more information.",
              "Approved refunds go back to the original payment method where possible; your bank sets how long that takes.",
            ],
          },
        ],
      },
      {
        id: "fees",
        title: "Payment processing fees",
        blocks: [
          {
            type: "p",
            text: "Payments through third-party gateways are subject to their terms. Processing fees charged by those providers may not be recoverable when a refund is issued.",
          },
        ],
      },
      {
        id: "disputes",
        title: "Disputes",
        blocks: [
          {
            type: "p",
            text: "If something goes wrong, please contact me first so we can try to sort it out directly. This policy is governed by the laws of Pakistan; mandatory local consumer-protection laws still apply.",
          },
        ],
      },
    ],
  },
};

/* ═══════════════════════════ Portfolio data ═══════════════════════════ */

export const STATS: Stat[] = [
  { value: 2, suffix: "+", label: "years building" },
  { value: 4, suffix: "", label: "roles held" },
  { value: 3, suffix: "", label: "teams worked with" },
  { value: 45, suffix: "+", label: "tools & technologies" },
];

/** Teams Aman has shipped with — the strip under the hero. */
export const COMPANIES = ["SIGMAKODE", "TECHLOSET", "CodeeTechs"];

/** The mobile stack, grouped. Mobile app development is the whole focus of this portfolio. */
export const SKILL_GROUPS: SkillGroup[] = [
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

/** Most-used tools, for tickers and short lists. */
export const CORE_TOOLS = [
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
export const EXPERIENCE: ExperienceRole[] = [
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
export const COMPANY_PERIODS: Record<string, string> = {
  SIGMAKODE: "May 2026 — now",
  TECHLOSET: "2024 — 2025",
  CodeeTechs: "2024",
};

/** Placeholder testimonials — replace with real client quotes before publishing. */
export const TESTIMONIALS: Testimonial[] = [
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

export const SERVICES: Service[] = [
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

export const FAQS: Faq[] = [
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

/** Project listings (the flagship spans two columns when unfiltered). */
export const PROJECTS: ProjectSummary[] = [
  {
    slug: "quran-companion",
    name: "Quran Companion",
    type: "Mobile",
    year: "2025",
    role: "Solo build",
    tagline: "Offline-first Quran app with 100k+ daily readers.",
    tags: ["React Native", "SQLite", "Reanimated"],
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
  },
  {
    slug: "ledgerly",
    name: "Ledgerly",
    type: "Web",
    year: "2024",
    role: "Full-stack",
    tagline: "Accounting automation for freelancers.",
    tags: ["Next.js", "tRPC", "Stripe"],
  },
  {
    slug: "banklite",
    name: "BankLite",
    type: "Mobile",
    year: "2023",
    role: "Team lead",
    tagline: "Fintech app serving 250k customers at 0.3% crash rate.",
    tags: ["React Native", "Kotlin", "GraphQL"],
  },
  {
    slug: "orderflow-api",
    name: "OrderFlow API",
    type: "Backend",
    year: "2023",
    role: "Architect",
    tagline: "Order-processing backbone handling 2M requests a day.",
    tags: ["NestJS", "PostgreSQL", "Docker"],
  },
  {
    slug: "studiosite-cms",
    name: "StudioSite CMS",
    type: "Client work",
    year: "2022",
    role: "Full-stack",
    tagline: "Custom CMS powering 12 agency client sites.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
];

/* ═══════════════════════════ Case studies ═══════════════════════════ */

/** PLACEHOLDER COPY — written to match the project listings. Replace with real project details. */
export const CASE_STUDIES: Record<string, CaseStudy> = {
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
    stack: [
      "React Native",
      "TypeScript",
      "SQLite",
      "Reanimated",
      "Expo",
      "FTS5",
    ],
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
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "WebSockets",
      "Redis",
      "Mapbox",
    ],
    quote: {
      text: "Aman rebuilt our app in half the estimated time and it hasn't crashed once in eight months. Worth every dollar.",
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
    stack: [
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Redis",
      "BullMQ",
      "OpenTelemetry",
    ],
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

/* ═══════════════════════════ Blog posts ═══════════════════════════ */

/** The technical guidance is real; dates, client numbers and voice are placeholder. */
export const BLOG_POSTS: Post[] = [
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

/* ═══════════════════════════ Research ═══════════════════════════ */

/** PLACEHOLDER COPY — replace sections, findings and citation with the real papers. */
export const RESEARCH: Paper[] = [
  {
    slug: "offline-first-sync-low-connectivity",
    title:
      "Offline-first data synchronization patterns in low-connectivity regions",
    authors: "M. Aman",
    year: "2026",
    isoDate: "2026-02-01",
    venue: "Preprint",
    abstract:
      "A comparative study of CRDT and operational-transform approaches for mobile applications operating under intermittent connectivity, with benchmarks from a production deployment serving 100k daily active users across South Asia.",
    tags: ["distributed systems", "mobile", "CRDTs"],
    findings: [
      {
        value: 100,
        suffix: "k",
        label: "daily active users in the deployment studied",
      },
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
