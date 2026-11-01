/**
 * Every piece of constant data in the site — identity, navigation, page copy,
 * portfolio data, long-form content, icons and motion presets. Components,
 * hooks and utils read from here; nothing hard-codes content inline.
 */
import type {
  AnalyticsEvent,
  CaseStudy,
  ClientCaseStudy,
  CalloutStyle,
  CalloutType,
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
  PostQuery,
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
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammad-aman1718/",
    },
    { label: "GitHub", href: "https://github.com/Muhammad-Aman1718" },
  ],
  portrait: "/imgs/muhammad-aman.avif",
};

/** Raw theme values for places CSS variables can't reach (OG image, viewport). */
/** Default page title: "Name — Role". */
export const SITE_TITLE = `${SITE.name} — ${SITE.role}`;

/** schema.org @id of the site owner, shared by every JSON-LD block. */
export const PERSON_ID = `${SITE.url}/#person`;

/** The one booking link: every "book a call" button on the site opens it. */
export const BOOKING_URL = "https://cal.com/muhammad-aman/20min";

/** The résumé PDF in /public; the About page offers it as a download. */
export const RESUME = {
  href: "/Muhammad-Aman-Resume.pdf",
  fileName: "Muhammad-Aman-Resume.pdf",
};

/** How each plan is billed and paid, quoted in the services FAQ and the Terms of Service. */
export const PAYMENT_TERMS = {
  audit: "50% upfront, 50% on delivery",
  mvp: "milestone-based (30% to start, 40% at the mid-point build, 30% on store submission)",
  retainer: "billed monthly in advance",
  methods:
    "international bank transfer (SWIFT), Wise, Payoneer, Remitly or Upwork",
};

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
  /** Avatar's `sizes`: a little over its 44px so hover zoom stays sharp */
  avatarSizes: "48px",
  /** Projects page: filter pills show only with more options than this ("All" + one type is no choice) */
  minProjectFilters: 2,
  /** Projects page: cards whose cover loads with high priority (the first row) */
  priorityProjectCards: 2,
  /** Analytics start on the first interaction, or this long after load without one (ms) */
  analyticsFallbackMs: 15000,
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
  /** Project cards: dots shown at once; more images slide the dots along */
  maxDots: 3,
  /** Width of one dot's slot, gap included (px) */
  dotSlotPx: 14,
  /** Case-study carousel: dots shown at once, their slot width (px) and time per image (ms) */
  carouselMaxDots: 5,
  carouselDotSlotPx: 22,
  carouselAutoplayMs: 4500,
  /** Showcase images are pre-compressed mock-ups: keep them sharp (needs images.qualities in next.config) */
  showcaseQuality: 90,
  /** Project cards: time each showcase image stays before the next fades in (ms) */
  slideshowMs: 3500,
  /** Research cards: findings shown per paper */
  paperFindings: 3,
  /** Blog list: posts shown at first and added by "Load more" */
  postsPageSize: 6,
  /** Research page: related papers listed under the citation */
  relatedResearch: 2,
} as const;

/* ═══════════════════════════ Page metadata ═══════════════════════════ */

export const PAGE_META: Record<
  | "about"
  | "experience"
  | "skills"
  | "services"
  | "contact"
  | "projects"
  | "posts",
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
      "Hire Muhammad Aman, React Native developer — a one-week app audit and rescue sprint, an MVP built for iOS and Android, or an ongoing development partner every month.",
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
    booking: "Book a 20-min call",
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
      description:
        "Three ways to work together — a one-week audit, an MVP built to a fixed scope, or a monthly development partner. Each priced up front.",
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
      badge: "Free · 20 minutes",
      title: "Still not sure?",
      text: "Book a free 20-minute call. No pitch — just an honest answer on whether I'm the right person for the app you're building.",
      cta: "Book a 20-min call",
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
    resume: "Download résumé",
    lead: `I'm ${SITE.name}, a mobile app developer building iOS and Android apps with React Native.`,
    paragraphs: [
      "I care about the details users feel: a quick launch, smooth 60fps screens, offline that just works, and a release that sails through store review. From the first screen to the App Store and Google Play, my work is shaped by apps real people use every day.",
      "I started on the web with React and Next.js, and moved to mobile for good. Today I build React Native apps at SIGMAKODE in Faisalabad — and drop into Swift or Kotlin when a feature needs to go native.",
    ],
    primaryCta: "Work with me",
    secondaryCta: "See my experience",
    journey: {
      eyebrow: "Journey",
      title: "How I got here.",
      highlight: ["here."],
    },
    beyond: {
      eyebrow: "Beyond the code",
      title: "What keeps me sharp.",
      highlight: ["sharp."],
    },
    cta: "Let's collaborate on your next project.",
  },
  experience: {
    hero: {
      eyebrow: "Experience",
      title: "Where I've built.",
      highlight: ["built."],
      description:
        "From the web to mobile for good — the teams I've shipped with and what I built there.",
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
    daily: {
      eyebrow: "Daily stack",
      title: "What I reach for first.",
      highlight: ["first."],
    },
    totalLabel: "technologies listed",
    cta: {
      title: "Have a stack in mind?",
      description:
        "If your project uses these tools, let's talk about what you're building.",
    },
  },
  services: {
    hero: {
      eyebrow: "Services",
      title: "What I can build for you.",
      highlight: ["build", "for", "you."],
      description:
        "Three ways to work together — a one-week audit, an MVP built to a fixed scope, or a monthly development partner. Each priced up front.",
    },
    featuredBadge: "Most requested",
    includes: "includes",
    discuss: "Discuss this",
    bookCall: "or book a 20-min call",
    caseStudies: {
      eyebrow: "Case studies",
      title: "Apps I've shipped for clients.",
      highlight: ["shipped"],
      clientType: "Client",
      problem: "The problem",
      built: "What I built",
      role: "My role",
      stack: "Stack",
      result: "Result",
      appStore: "App Store",
      playStore: "Google Play",
    },
    included: "See what's included",
    process: {
      eyebrow: "Process",
      title: "How a project runs.",
      highlight: ["runs."],
    },
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
    booking: "Book a 20-min call",
    faq: {
      eyebrow: "FAQ",
      title: "Common questions.",
      highlight: ["questions."],
    },
  },
  projects: {
    hero: {
      eyebrow: "Projects",
      title: "Selected work.",
      highlight: ["work."],
      description:
        "iOS and Android apps — each with a case study on the problem, the build and the result.",
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
    galleryLabel: "Screens",
    slideLabel: "{index} of {total}",
    previousImage: "Previous screen",
    nextImage: "Next screen",
    goToImage: "Show screen {index}",
    facts: {
      role: "role",
      timeline: "timeline",
      team: "team",
      platform: "platform",
    },
    ctaDescription:
      "Need something built with the care that went into {name}? Tell me about it.",
  },
  posts: {
    eyebrow: "writing",
    title: "Posts & research",
    intro:
      "Notes from production: mobile performance, architecture decisions, and the business of building software well.",
    tabsLabel: "Content type",
    filterLabel: "Filter posts by category",
    featured: "Featured",
    readArticle: "Read article",
    read: "read",
    minutes: "min",
    empty: "No posts match these filters.",
    clearFilters: "Clear filters",
    paper: "Paper",
    readPaper: "Read paper",
    searchLabel: "Search posts",
    searchPlaceholder: "Search by title, summary or tag…",
    sortLabel: "Sort posts",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    subcategoryLabel: "Filter by topic",
    taggedWith: "Tagged",
    removeTag: "Remove tag filter",
    loadMore: "Load more",
    showing: "Showing {shown} of {total}",
    noPapers: "No research published yet.",
    draftsNotice: "{count} draft(s) — only visible on your computer",
    showDrafts: "Show drafts",
    hideDrafts: "Hide drafts",
    draftBadge: "Draft",
  },
  post: {
    all: "All posts",
    keepReading: "Keep reading",
    read: "read",
    updated: "Updated",
    tagsLabel: "Tags",
    draft: "Draft — not public",
    series: "Part {index} of {total} in",
    seriesLabel: "Series",
    anchorLabel: "Link to section",
    opensInNewTab: "(opens in a new tab)",
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
    openPaper: "Open paper",
    downloadPdf: "Download PDF",
    doi: "DOI",
    related: "More research",
    findings: "Key findings",
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
  budget: {
    label: "Budget range",
    optional: "(optional)",
    placeholder: "Select…",
  },
  message: { label: "Message", placeholder: "What are you building?" },
  submit: "Send message",
  sending: "Sending…",
  hint: "I reply within 24 hours on working days.",
  failed:
    "Your message couldn't be sent. Check your connection and try again, or email me at",
  sentTitle: "Message sent",
  sentText:
    "Thanks — your brief is in my inbox and I'll reply within 24 hours on working days. Anything urgent? Email me at",
  back: "Send another message",
  subject: "Project enquiry from",
} as const;

/* ═══════════════════════════ Analytics ═══════════════════════════ */

/** PostHog's recommended settings bundle (pageviews, autocapture, web vitals) as of this date. */
export const POSTHOG_DEFAULTS = "2026-08-30";

/** Google tag script; the measurement ID comes from NEXT_PUBLIC_GA_MEASUREMENT_ID. */
export const GA_SCRIPT_URL = "https://www.googletagmanager.com/gtag/js";

/** Custom analytics events (PostHog and Google Analytics), on top of the automatic pageviews and clicks. */
export const ANALYTICS_EVENTS: Record<
  "contactSubmitted" | "contactFailed",
  AnalyticsEvent
> = {
  contactSubmitted: "contact_form_submitted",
  contactFailed: "contact_form_failed",
};

/** Formspree form that delivers the project brief to my inbox. */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/meeqgpyp";

/** Hidden field bots fill in; Formspree drops any submission that has it. */
export const HONEYPOT_FIELD = "_gotcha";

/** Says what's wrong and how to fix it. */
export const CONTACT_ERRORS = {
  name: "Please enter your name.",
  emailMissing: "Please enter your email so I can reply.",
  emailInvalid:
    "That email looks incomplete — use a format like you@company.com.",
  message: "Tell me a little about the project (at least 10 characters).",
} as const;

/** Inline markup in long-form text: `code`, **bold** and [label](href). */
export const INLINE_TOKEN_PATTERN =
  /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
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
  {
    label: "Based in",
    value: `${SITE.location.city}, ${SITE.location.country}`,
  },
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
  {
    title: "Discover",
    text: "A call to understand the problem, constraints, and what success means.",
  },
  {
    title: "Scope",
    text: "Architecture, timeline and a fixed estimate you can hold me to.",
  },
  {
    title: "Build",
    text: "Weekly demos, honest progress reports, production-quality code.",
  },
  {
    title: "Support",
    text: "Store submission and launch help, then post-launch support or a monthly plan.",
  },
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
export const TAB_KEY_STEPS: Record<string, number> = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
};

/** First filter of each list shows everything. */
export const FILTER_ALL = "All";

/* ═══════════════════════════ MDX articles ═══════════════════════════ */

/** Article folders inside /content at the project root. */
export const CONTENT_DIRS = {
  posts: "posts",
  research: "research",
};

/** Opening/closing line of a fenced code block in markdown. */
export const MARKDOWN_FENCE_PATTERN = /^\s*(```|~~~)/;

/** A markdown ATX heading: hashes, then the text. */
export const MARKDOWN_HEADING_PATTERN = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

/** The blog list before any filtering (the tag comes from the URL). */
export const DEFAULT_POST_QUERY: Omit<PostQuery, "tag"> = {
  search: "",
  category: FILTER_ALL,
  subcategory: FILTER_ALL,
  sort: "newest",
};

/** Messages from the content loader ({file}, {problems}… are filled in). */
export const CONTENT_MESSAGES = {
  emptyFile: "[content] Skipped {file}: the file is empty.",
  skippedDraft:
    "[content] Skipped {file}: it isn't published yet and its frontmatter is incomplete. Fix this before setting status to published.\n{problems}",
  invalidPublished:
    "Invalid frontmatter in published article {file}:\n{problems}",
  slugMismatch:
    '{file}: slug "{slug}" must match the file name ("{expected}.mdx")',
  duplicateSlug: 'Duplicate slug "{slug}" in {first} and {file}',
};

/** Reading speed for the automatic reading time. */
export const WORDS_PER_MINUTE = 200;

/** Shiki theme for code blocks (its background is replaced by the --code token). */
export const CODE_THEME = "github-dark-default";

/** Languages highlighted in code blocks; anything else renders as plain text. */
export const CODE_LANGUAGES = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "bash",
  "python",
  "sql",
  "css",
  "html",
  "yaml",
  "diff",
  "markdown",
  "swift",
  "kotlin",
  "java",
  "xml",
  "graphql",
];

/** Display names for the language label in a code block's header. */
export const CODE_LANGUAGE_LABELS: Record<string, string> = {
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  javascript: "JavaScript",
  jsx: "JSX",
  json: "JSON",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  zsh: "Shell",
  python: "Python",
  py: "Python",
  sql: "SQL",
  css: "CSS",
  html: "HTML",
  yaml: "YAML",
  yml: "YAML",
  diff: "Diff",
  markdown: "Markdown",
  md: "Markdown",
  swift: "Swift",
  kotlin: "Kotlin",
  java: "Java",
  xml: "XML",
  graphql: "GraphQL",
  text: "Text",
};

/** Callout boxes in articles: icon, screen-reader label and colours per type. */
export const CALLOUT_STYLES: Record<CalloutType, CalloutStyle> = {
  info: {
    icon: "info",
    label: "Note",
    className: "border-line bg-linear-to-br from-secondary/60 to-surface",
    accentClassName: "text-accent",
  },
  tip: {
    icon: "lightbulb",
    label: "Tip",
    className: "border-emerald-400/25 bg-emerald-400/[0.06]",
    accentClassName: "text-emerald-300",
  },
  warning: {
    icon: "warning",
    label: "Warning",
    className: "border-amber-400/30 bg-amber-400/[0.06]",
    accentClassName: "text-amber-300",
  },
  danger: {
    icon: "alert",
    label: "Important",
    className: "border-error/40 bg-error/[0.07]",
    accentClassName: "text-error",
  },
};

/** A YouTube video id (embeds are only built from a validated id, never a raw URL). */
export const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/;

/** Privacy-enhanced YouTube player (no cookies until the visitor presses play). */
export const YOUTUBE_EMBED_URL = "https://www.youtube-nocookie.com/embed/";

/** Default box for article images whose size isn't given; CSS keeps the real aspect ratio. */
export const ARTICLE_IMAGE = {
  width: 1600,
  height: 900,
  sizes: "(min-width: 1280px) 720px, (min-width: 768px) 80vw, 100vw",
};

export const POSTS_TABS: PostsTab[] = ["blog", "research"];

/** Anchor of the citation section on a research page. */
export const PAPER_CITE_ID = "cite";

export const PROJECT_FILTERS = [
  "All",
  "Mobile",
  "Web",
  "Backend",
  "Client work",
];

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
  download: { path: "M12 4v11M7 10l5 5 5-5M5 20h14" },
  copy: { path: "M9 9h10v10H9zM5 15V5h10" },
  link: {
    path: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1",
  },
  mail: {
    path: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm-1 2 8 6 8-6",
  },
  calendar: {
    path: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4",
  },
  plus: { path: "M12 5v14M5 12h14" },
  info: { path: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18M12 11v5M12 7.5h.01" },
  lightbulb: {
    path: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z",
  },
  warning: { path: "M12 4 2.5 20h19zM12 10v4M12 17h.01" },
  search: { path: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" },
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
  "fade-up": {
    from: { autoAlpha: 0, y: 24 },
    to: SHOWN,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.05,
  },
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
    duration: 0.8,
    ease: "power1.out",
    stagger: 0.05,
  },
  "slide-left": {
    from: { autoAlpha: 0, x: -36 },
    to: SHOWN,
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.05,
  },
  "slide-right": {
    from: { autoAlpha: 0, x: 36 },
    to: SHOWN,
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.05,
  },
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
    from: {
      autoAlpha: 0,
      y: 40,
      rotateX: -16,
      transformPerspective: 1000,
      transformOrigin: "50% 0%",
    },
    to: { ...SHOWN, rotateX: 0 },
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.06,
  },
  mask: {
    from: { yPercent: 110 },
    to: { yPercent: 0 },
    duration: 0.9,
    ease: "power4.out",
    stagger: 0.04,
  },
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
const LEGAL_UPDATED = "November 1, 2026";

/*
 * The payment schedule in the terms must match the services FAQ:
 * Audit 50% / 50% · MVP 30% / 40% / 30% · Retainer monthly in advance.
 */
export const LEGAL_PAGES: Record<
  "privacy" | "terms" | "refund",
  LegalPageContent
> = {
  privacy: {
    title: "Privacy Policy",
    highlight: ["Policy"],
    path: "/privacy-policy",
    updated: LEGAL_UPDATED,
    description: `How ${SITE_HOST} collects, uses and protects personal information — minimal collection, no selling of data, and your rights.`,
    summary: `This policy explains how **${SITE_HOST}**, run by ${SITE.name}, handles personal information. In short: I only collect what's needed to answer you or do the work you ask for, and I never sell it.`,
    sections: [
      {
        id: "who-i-am",
        title: "Who I am",
        blocks: [
          {
            type: "p",
            text: `${SITE.name} is an independent software developer based in Pakistan and is responsible for the personal information described here. For any privacy question, email ${EMAIL_LINK}.`,
          },
        ],
      },
      {
        id: "information-we-collect",
        title: "Information I collect",
        blocks: [
          {
            type: "p",
            text: "**Information you give me.** When you send a message, book a call, request a quote or hire me, you may share your name, email address, phone number, company, project details and, for paid work, billing information.",
          },
          {
            type: "p",
            text: "**Information collected automatically.** The hosting provider and analytics tool record technical data such as your IP address, browser type, device and the pages you visit. I use this in aggregate to understand how the site is used, not to identify you.",
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
              "Reply to your enquiries, proposals and call bookings.",
              "Deliver, invoice and support the work you hire me for.",
              "Send transactional messages such as confirmations and project updates.",
              "Understand site usage so I can improve performance, design and content.",
              "Meet legal obligations and protect my rights.",
            ],
          },
          {
            type: "p",
            text: "I don't send newsletters or marketing emails unless you've asked for them.",
          },
        ],
      },
      {
        id: "legal-basis",
        title: "Legal basis for processing",
        blocks: [
          {
            type: "p",
            text: "Where laws such as the GDPR apply, I process personal information because it's needed to take steps before or to perform a contract with you, because I have a legitimate interest in running and improving my business and website, because the law requires it (for example tax records), or because you've given consent (for example to non-essential cookies, where consent is required). You can withdraw consent at any time.",
          },
        ],
      },
      {
        id: "sharing",
        title: "Sharing & service providers",
        blocks: [
          { type: "p", text: "I don't sell, rent or share personal information for advertising." },
          {
            type: "p",
            text: "A small number of trusted providers process data on my behalf, only to provide their service to me:",
          },
          {
            type: "list",
            items: [
              // TODO: name the host once the site is deployed (e.g. "Website hosting — Vercel")
              "Website hosting — the provider that serves this site",
              "Contact form — Formspree, which delivers your message to my inbox",
              "Call scheduling — Cal.com",
              "Analytics — PostHog and Google Analytics",
              `Payments — ${PAYMENT_TERMS.methods}`,
            ],
          },
          {
            type: "p",
            text: "I may also disclose information when the law requires it, or to protect the rights, property or safety of others.",
          },
        ],
      },
      {
        id: "international-transfers",
        title: "International transfers",
        blocks: [
          {
            type: "p",
            text: "I work from Pakistan, and some of my service providers store data in other countries, including the United States. When information moves between countries, I rely on providers that offer recognised safeguards such as standard contractual clauses.",
          },
        ],
      },
      {
        id: "client-project-data",
        title: "Data in client projects",
        blocks: [
          {
            type: "p",
            text: "While building or maintaining your app I may need access to your systems, test accounts or production data, which can include your users' personal information. I access it only to do the agreed work, keep it confidential, don't copy it to personal devices beyond what the work requires, and delete any copies when the project ends. I'm happy to sign your data processing agreement (DPA) or NDA.",
          },
        ],
      },
      {
        id: "cookies",
        title: "Cookies & tracking",
        blocks: [
          {
            type: "p",
            // TODO: PostHog and Google Analytics set analytics cookies — add a cookie consent banner for EU/UK visitors before going live there.
            text: "The site uses cookies and similar technologies for core functionality, remembering preferences and analytics. You can block or delete cookies in your browser settings; the site will still work. Third-party analytics providers have their own privacy policies and opt-out options.",
          },
        ],
      },
      {
        id: "security",
        title: "Security",
        blocks: [
          {
            type: "p",
            text: "The site is served over HTTPS, accounts I use for client work are protected with two-factor authentication where available, and access to any data I hold is restricted. No method of transmission or storage is completely secure, so while I take reasonable care I can't guarantee absolute security.",
          },
        ],
      },
      {
        id: "retention",
        title: "How long I keep data",
        blocks: [
          {
            type: "p",
            text: "Enquiries that don't turn into a project are deleted within 12 months. Project and billing records are kept for as long as the law requires for accounting and tax purposes, then deleted.",
          },
        ],
      },
      {
        id: "your-rights",
        title: "Your rights",
        blocks: [
          {
            type: "p",
            text: `You can ask to access, correct, export or delete the personal information I hold about you, or object to or restrict how it is used. Email ${EMAIL_LINK} and I'll respond within 30 days.`,
          },
          {
            type: "p",
            text: "Depending on where you live, you may also have the right to complain to your local data-protection authority.",
          },
        ],
      },
      {
        id: "children",
        title: "Children",
        blocks: [
          {
            type: "p",
            text: "This site and my services are intended for businesses and adults. I don't knowingly collect personal information from anyone under 16.",
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
    description: `The terms that govern use of ${SITE_HOST} and services provided by ${SITE.name} — scope, payments, delivery, ownership, liability and governing law.`,
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
            text: "I provide mobile app development, consulting and related services, mainly to businesses. Prices on the [Services](/services) page are starting points or typical ranges. The final scope, deliverables, timeline and price of each engagement are set out in a separate written quote or agreement, which takes precedence over these terms where they differ.",
          },
        ],
      },
      {
        id: "payments",
        title: "Payments",
        blocks: [
          {
            type: "p",
            text: "Unless your quote says otherwise, payments follow this schedule:",
          },
          {
            type: "list",
            items: [
              "**App Audit & Rescue Sprint:** 50% before work starts, 50% on delivery of the report.",
              "**MVP & App Development:** 30% to start, 40% at the mid-point build, 30% on store submission.",
              "**Ongoing Development Partner:** billed monthly in advance.",
            ],
          },
          {
            type: "p",
            text: `Invoices are due within 7 days and can be paid by ${PAYMENT_TERMS.methods}. If a payment is more than 14 days overdue, I may pause work until it's settled, and the timeline moves by the same amount.`,
          },
        ],
      },
      {
        id: "client-responsibilities",
        title: "Your responsibilities",
        blocks: [
          {
            type: "list",
            items: [
              "Give feedback and approvals within 3 working days so the project stays on schedule. Longer delays move the timeline.",
              "Provide the content, designs, API access and test accounts needed for the work.",
              "Own the Apple Developer Program and Google Play Console accounts in your name and pay their fees. Apps are published under your accounts.",
              "Pay for third-party services the app uses, such as hosting, APIs, maps, push notification or analytics plans.",
            ],
          },
        ],
      },
      {
        id: "changes-to-scope",
        title: "Changes to scope",
        blocks: [
          {
            type: "p",
            text: "Small adjustments within the agreed features are included. New features or significant changes are quoted in writing as a change request, and work on them starts only after you approve the quote.",
          },
        ],
      },
      {
        id: "delivery",
        title: "Delivery & acceptance",
        blocks: [
          {
            type: "p",
            text: "Work is delivered in milestones, each with a working build (for example via TestFlight or Google Play internal testing). You have 5 working days to review each milestone and report issues within the agreed scope, which I'll fix. If no issues are reported in that time, the milestone is treated as accepted.",
          },
        ],
      },
      {
        id: "app-store-review",
        title: "App Store & Google Play review",
        blocks: [
          {
            type: "p",
            text: "I build and submit apps following Apple's and Google's published guidelines, but approval is decided by Apple and Google, not by me, so I can't guarantee it. If a submission is rejected for reasons within the agreed scope, I'll make the required changes at no extra cost during the project or its support period. Rejections caused by the app's business model, content or policies you control may need a separate quote.",
          },
        ],
      },
      {
        id: "support",
        title: "Post-launch support",
        blocks: [
          {
            type: "p",
            text: "Where a plan includes post-launch support (for example 30 days for the MVP plan), it covers fixing bugs in the code I delivered. It doesn't cover new features, changes made by others, or issues caused by third-party services, new OS versions or store policy changes. After the support period, you can move to the Ongoing Development Partner plan or request fixes on a per-task basis.",
          },
        ],
      },
      {
        id: "retainer",
        title: "Monthly retainer",
        blocks: [
          {
            type: "p",
            text: "The Ongoing Development Partner plan includes the hours stated in your agreement each month. Unused hours don't carry over unless we agree otherwise. Either side can cancel with 14 days' written notice before the next billing date.",
          },
        ],
      },
      {
        id: "ownership",
        title: "Ownership & your content",
        blocks: [
          {
            type: "p",
            text: "The code lives in a repository you own from the start. Unless an agreement says otherwise, ownership of the code and deliverables built for you transfers to you once the project is paid in full. I keep the right to reuse general know-how, tools and code that aren't specific to your project.",
          },
          {
            type: "p",
            text: "Apps may include open-source libraries, which remain under their own licences, and third-party services, which are subject to their own terms.",
          },
          {
            type: "p",
            text: "You're responsible for the content you provide and confirm you have the right to use it. You allow me to use it to deliver the service and, only with your permission, to show the work in my portfolio.",
          },
        ],
      },
      {
        id: "confidentiality",
        title: "Confidentiality",
        blocks: [
          {
            type: "p",
            text: "I keep your business information, code and data confidential and use them only to do the work. I'm happy to sign your NDA before we discuss details.",
          },
        ],
      },
      {
        id: "independent-contractor",
        title: "Independent contractor",
        blocks: [
          {
            type: "p",
            text: "I work as an independent contractor, not as your employee, and I'm responsible for my own taxes.",
          },
        ],
      },
      {
        id: "warranty",
        title: "Disclaimer",
        blocks: [
          {
            type: "p",
            text: "I deliver work with reasonable skill and care. Apart from that and any support period in your agreement, the site and services are provided “as is”, and I don't guarantee specific business results such as downloads, revenue or rankings.",
          },
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        blocks: [
          {
            type: "p",
            text: "To the fullest extent the law allows, I'm not liable for indirect, incidental or consequential damages, lost profits or lost data arising from use of the site or services, or for outages and changes in third-party services. Please keep your own backups of production data. My total liability for direct damages is limited to the fees you paid for the service concerned (for a monthly retainer, the fees paid in the 3 months before the claim).",
          },
        ],
      },
      {
        id: "termination",
        title: "Ending a project",
        blocks: [
          {
            type: "p",
            text: "Either side can end a project with written notice. You pay for work completed up to that point, including the in-progress part of the current milestone, and I hand over the code and materials for everything you've paid for. Refunds for unstarted work follow the [Refund Policy](/refund-policy).",
          },
          {
            type: "p",
            text: "I may also suspend or end access to the site for a breach of these terms or for any other lawful reason, with notice where the law requires.",
          },
        ],
      },
      {
        id: "force-majeure",
        title: "Events outside anyone's control",
        blocks: [
          {
            type: "p",
            text: "Neither side is responsible for delays caused by events beyond reasonable control, such as natural disasters, widespread internet or power outages, or government action. We'll keep each other informed and agree a new timeline.",
          },
        ],
      },
      {
        id: "governing-law",
        title: "Governing law & disputes",
        blocks: [
          {
            type: "p",
            text: "Unless your written agreement names a different law, these terms are governed by the laws of Pakistan. Both sides agree to try to resolve any dispute through good-faith discussion first. Mandatory consumer-protection laws where you live still apply.",
          },
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        blocks: [
          {
            type: "p",
            text: `I may update these terms; changes take effect when posted here and don't change agreements already signed. Continuing to use the site after a change means you accept it. Questions: ${EMAIL_LINK}.`,
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
    description: `Refund policy for services purchased from ${SITE.name} via ${SITE_HOST} — what's refundable on each plan and how to request a refund.`,
    summary:
      "You pay for work that's been done or is in progress — never for work that hasn't started. Here's how that works on each plan.",
    sections: [
      {
        id: "scope",
        title: "Scope",
        blocks: [
          {
            type: "p",
            text: `This policy covers payments for services provided by ${SITE.name}: the App Audit & Rescue Sprint, MVP & App Development, the Ongoing Development Partner retainer and any custom quote. A written agreement can set different terms, and those take precedence.`,
          },
        ],
      },
      {
        id: "by-plan",
        title: "Refunds by plan",
        blocks: [
          {
            type: "list",
            items: [
              "**App Audit & Rescue Sprint:** full refund if you cancel before the audit starts. Once the audit has started, the payment covers the time already spent and isn't refundable.",
              "**MVP & App Development:** payments are tied to milestones. If the project ends early, you pay for work completed up to that point, including the in-progress part of the current milestone. Any amount paid for milestones that haven't started is refunded.",
              "**Ongoing Development Partner:** the current month isn't refundable once it has started. You can cancel any time with 14 days' notice before the next billing date and won't be charged again.",
            ],
          },
        ],
      },
      {
        id: "exceptions",
        title: "Always refunded",
        blocks: [
          {
            type: "list",
            items: [
              "Duplicate charges or clear billing errors.",
              "Work I'm unable to start or complete for reasons on my side.",
              "Any case where the consumer-protection law that applies to you requires a refund.",
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
              "Include your invoice number or other proof of payment and the reason for the request.",
              "I'll reply within 7 working days and may ask for more information.",
              "Approved refunds are sent within 14 days to the original payment method where possible; your bank or payment provider sets how long it takes to arrive.",
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
            text: "Payments through third-party platforms are subject to their terms. Transfer or processing fees those providers charge may not be recoverable when a refund is issued. Payments made through a freelance platform (such as Upwork) follow that platform's refund and dispute process.",
          },
        ],
      },
      {
        id: "disputes",
        title: "Disputes",
        blocks: [
          {
            type: "p",
            text: "If something goes wrong, please contact me before opening a chargeback so we can sort it out directly. This policy is governed by the laws of Pakistan unless your written agreement says otherwise; mandatory local consumer-protection laws still apply.",
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
    years: "Aug 2026 — now",
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
    years: "Mar — Aug 2026",
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
  SIGMAKODE: "Mar 2026 — now",
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

/**
 * The single source of truth for plans and prices: the services page, the
 * home stack, the contact form, the FAQ and the structured data all read it.
 * Never hard-code a price anywhere else.
 */
export const SERVICES: Service[] = [
  {
    name: "App Audit & Rescue Sprint",
    description:
      "A one-week deep dive into your existing app — crashes, slow start-up, janky screens and failed store reviews. The low-risk way to start working together.",
    items: [
      "Full codebase & architecture audit",
      "Performance & crash profiling",
      "Top 3–5 critical issues fixed",
      "Written report with prioritized roadmap",
      "Walkthrough call to review findings",
    ],
    engagement: "fixed price · 1 week",
    from: "$900",
    priceLabel: "starting",
  },
  {
    name: "MVP & App Development",
    description:
      "Turn your idea into a production-ready iOS and Android app from one React Native codebase — built for performance and approval on the first try.",
    items: [
      "Up to 15 screens, iOS + Android",
      "Authentication & API integration",
      "Push notifications",
      "App Store & Play Store submission",
      "Working build every week",
      "30 days post-launch support",
    ],
    engagement: "fixed scope · 6–8 weeks",
    from: "$4k – $6k",
    priceLabel: "typical range",
    note: "Need a backend or admin panel? Available as an add-on.",
    featured: true,
  },
  {
    name: "Ongoing Development Partner",
    description:
      "A dedicated React Native developer on your team every month — new features, native modules, upgrades and performance, without a full-time hire.",
    items: [
      "~10 hours/week of dedicated time",
      "New features & improvements",
      "Native iOS & Android modules (Swift/Kotlin)",
      "React Native upgrades & performance",
      "Monthly progress report",
    ],
    engagement: "monthly retainer",
    from: "$1.5k",
    priceLabel: "per month",
  },
];

/** The plans by role, for copy that quotes them (order as listed above). */
const [AUDIT, MVP, PARTNER] = SERVICES;

/** Contact form "Project type": one option per plan. */
export const PROJECT_TYPE_OPTIONS = [...SERVICES.map((s) => s.name), "Other"];

export const BUDGET_OPTIONS = [
  "Under $1k (Audit)",
  "$4k – $6k (MVP)",
  "$6k+ (larger build)",
  "Monthly retainer ($1.5k+/mo)",
  "Not sure yet",
];

/** Budget pre-selected when a visitor clicks "Discuss this" on a plan. */
export const SERVICE_BUDGETS: Record<string, string> = {
  [AUDIT.name]: BUDGET_OPTIONS[0],
  [MVP.name]: BUDGET_OPTIONS[1],
  [PARTNER.name]: BUDGET_OPTIONS[3],
};

export const FAQS: Faq[] = [
  {
    q: "What time zone do you work in?",
    a: `I'm based in ${SITE.location.country} (${SITE.location.timezone}). I overlap fully with UK/Europe working hours and keep 2–3 hours of daily overlap with US time zones for calls and quick replies.`,
  },
  {
    q: "How does payment work?",
    a: `Audit: ${PAYMENT_TERMS.audit}. MVP: ${PAYMENT_TERMS.mvp}. Retainer: ${PAYMENT_TERMS.retainer}.${
      PAYMENT_TERMS.methods ? ` Payments via ${PAYMENT_TERMS.methods} — whichever is easiest for you.` : ""
    }`,
  },
  {
    q: "Who owns the code?",
    a: "You do. The code lives in your GitHub repo from day one, and full IP is transferred on final payment.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes, happy to sign your NDA before we discuss details.",
  },
  {
    q: "How will we communicate?",
    a: "Slack, email or WhatsApp, whichever you prefer. You get a short weekly demo call plus a working build every week (TestFlight / Google Play internal testing).",
  },
  {
    q: "What if the scope changes mid-project?",
    a: "Small tweaks are fine. New features are quoted separately as a change request before any work starts, so there are no surprise invoices.",
  },
  {
    q: "What happens after the 30-day support period?",
    a: `You can switch to the ${PARTNER.name} plan (from ${PARTNER.from}/month) or request fixes on a per-task basis.`,
  },
  {
    q: "Can you also build the backend or admin panel?",
    a: "Yes, as an add-on to the MVP plan. It's quoted separately depending on scope.",
  },
];

/**
 * Client work for the services page. Entries whose title still starts with
 * "TODO" are placeholders: they never render, and the section hides itself
 * while every entry is one. Only add real projects, results and links.
 */
export const CLIENT_CASE_STUDIES: ClientCaseStudy[] = [
  {
    title: "TODO: project name",
    clientType: "TODO: client type (e.g. fintech startup, UK)",
    problem: "TODO: the problem the client came with",
    built: "TODO: what you built",
    role: "TODO: your role",
    stack: ["TODO: tech stack"],
    result: "TODO: a measurable outcome, if any",
  },
  {
    title: "TODO: project name",
    clientType: "TODO: client type",
    problem: "TODO: the problem the client came with",
    built: "TODO: what you built",
    role: "TODO: your role",
    stack: ["TODO: tech stack"],
    result: "TODO: a measurable outcome, if any",
  },
  {
    title: "TODO: project name",
    clientType: "TODO: client type",
    problem: "TODO: the problem the client came with",
    built: "TODO: what you built",
    role: "TODO: your role",
    stack: ["TODO: tech stack"],
    result: "TODO: a measurable outcome, if any",
  },
];

/** Project listings (the flagship spans two columns when unfiltered). */
export const PROJECTS: ProjectSummary[] = [
  {
    slug: "dermacare",
    name: "DermaCare",
    type: "Mobile",
    year: "2026",
    role: "Mobile app developer",
    tagline:
      "Book a dermatologist, manage appointments and chat with your doctor in one app.",
    tags: ["React Native", "TypeScript", "Healthcare"],
    images: [
      {
        src: "/imgs/projects/dermacare/01.webp",
        alt: "Three iPhones showing the DermaCare doctors list, home schedule and a doctor profile",
      },
      {
        src: "/imgs/projects/dermacare/02.webp",
        alt: "DermaCare home screen on an iPhone: your dermatologist, one tap away",
      },
      {
        src: "/imgs/projects/dermacare/03.webp",
        alt: "Booking flow screens layered: doctor profile, payment confirmation and appointments",
      },
      {
        src: "/imgs/projects/dermacare/04.webp",
        alt: "Appointments list and chat with a doctor on two iPhones",
      },
      {
        src: "/imgs/projects/dermacare/05.webp",
        alt: "Settings on an iPhone lying flat, with the patient profile standing behind",
      },
      {
        src: "/imgs/projects/dermacare/06.webp",
        alt: "Five DermaCare screens fanned out: doctors, appointments, home, chat and profile",
      },
      {
        src: "/imgs/projects/dermacare/07.webp",
        alt: "Doctor profile with booking calendar on a large iPhone: book a visit in seconds",
      },
    ],
  },
  {
    slug: "work-mate",
    name: "Work Mate",
    type: "Mobile",
    year: "2026",
    role: "Mobile app developer",
    tagline:
      "An HR app for employees: clock in, follow the day's tasks and meetings, and check payroll.",
    tags: ["React Native", "TypeScript", "HR"],
    images: [
      {
        src: "/imgs/projects/work-mate/01.webp",
        alt: "Three iPhones showing Work Mate clock-in, the home summary and an active work session",
      },
      {
        src: "/imgs/projects/work-mate/02.webp",
        alt: "Work Mate home on an iPhone: your workday in one app",
      },
      {
        src: "/imgs/projects/work-mate/03.webp",
        alt: "Change password, verification code and password updated screens layered",
      },
      {
        src: "/imgs/projects/work-mate/04.webp",
        alt: "Payroll details and monthly payroll history on two iPhones",
      },
      {
        src: "/imgs/projects/work-mate/05.webp",
        alt: "Office assets on an iPhone lying flat, with the profile standing behind",
      },
      {
        src: "/imgs/projects/work-mate/06.webp",
        alt: "Five Work Mate screens fanned out: sign in, sign up, home, clock-in and personal data",
      },
      {
        src: "/imgs/projects/work-mate/07.webp",
        alt: "Work Mate onboarding on a large iPhone",
      },
    ],
  },

  {
    slug: "caption-ai",
    name: "Caption AI",
    type: "Mobile",
    year: "2026",
    role: "Mobile app developer",
    tagline: "AI captions for your photos, tuned by mood, platform and tone.",
    tags: ["React Native", "TypeScript", "AI"],
    images: [
      {
        src: "/imgs/projects/caption-ai/01.webp",
        alt: "Three iPhones showing Caption AI premium, the caption generator and recent captions",
      },
      {
        src: "/imgs/projects/caption-ai/02.webp",
        alt: "Caption AI generator on an iPhone: captions that sound like you",
      },
      {
        src: "/imgs/projects/caption-ai/03.webp",
        alt: "Password reset screens layered: verification code, new password and success",
      },
      {
        src: "/imgs/projects/caption-ai/04.webp",
        alt: "Two onboarding screens with full-bleed photos on iPhones",
      },
      {
        src: "/imgs/projects/caption-ai/05.webp",
        alt: "Profile on an iPhone lying flat, with the log-in screen standing behind",
      },
      {
        src: "/imgs/projects/caption-ai/06.webp",
        alt: "Five Caption AI screens fanned out: onboarding, splash, home, premium and recents",
      },
    ],
  },
  {
    slug: "fire-weather",
    name: "Fire Weather",
    type: "Mobile",
    year: "2026",
    role: "Mobile app developer",
    tagline:
      "Live fire-weather conditions and alerts for your location, with your own warning thresholds.",
    tags: ["React Native", "TypeScript", "Weather"],
    images: [
      {
        src: "/imgs/projects/fire-weather/01.webp",
        alt: "Three iPhones showing Fire Weather settings, the 36°C home screen and notifications",
      },
      {
        src: "/imgs/projects/fire-weather/02.webp",
        alt: "Fire Weather home on an iPhone: know the fire risk before you head out",
      },
      {
        src: "/imgs/projects/fire-weather/03.webp",
        alt: "Password reset screens layered: forgot password, email code and password changed",
      },
      {
        src: "/imgs/projects/fire-weather/04.webp",
        alt: "Sign-up and location steps on two iPhones",
      },
      {
        src: "/imgs/projects/fire-weather/05.webp",
        alt: "Notifications on an iPhone lying flat, with the ready screen standing behind",
      },
      {
        src: "/imgs/projects/fire-weather/06.webp",
        alt: "Five Fire Weather screens fanned out: splash, sign-in, home, settings and profile",
      },
      {
        src: "/imgs/projects/fire-weather/07.webp",
        alt: "Fire Weather Alert splash screen on a large iPhone",
      },
    ],
  },
];

/* ═══════════════════════════ Case studies ═══════════════════════════ */

/** PLACEHOLDER COPY — written to match the project listings. Replace with real project details. */
export const CASE_STUDIES: Record<string, CaseStudy> = {
  "work-mate": {
    summary:
      "An HR and task app for employees: clock in and out, see today's meetings and tasks, check payroll and tax, and keep personal details and office assets up to date.",
    timeline: "",
    team: "Mobile app development from a Figma UI kit",
    platform: "iOS & Android",
    metrics: [],
    stack: ["React Native", "TypeScript", "React Navigation", "Reanimated"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "Work Mate gives every employee one place for the workday. The home screen sums it up — today's meetings with a one-tap join, and the tasks assigned for the day with their status, priority and progress.",
          },
        ],
      },
      {
        id: "features",
        title: "Key features",
        blocks: [
          {
            type: "list",
            items: [
              "**Attendance** — clock in, take a break and clock out, with today's hours, the pay period total and a day-by-day history.",
              "**Payroll and tax** — working hours and overtime, a payslip breakdown (basic salary, tax, reimbursement, bonus) that can be saved as a PDF, and a month-by-month record of what was received and when.",
              "**Profile** — personal data with photo, date of birth, position and address, plus the office assets issued to the employee with brand, warranty and dates.",
              "**Account** — sign in with email, employee ID or phone, register with a company ID, change the password, and reset it with a verification code.",
              "**Onboarding** — a short welcome, terms and privacy policy, and a nudge to complete the profile.",
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Design and build notes",
        blocks: [
          {
            type: "p",
            text: "One violet carries every primary action on a light, airy layout, with cards for each part of the day. Confirmations — profile updated, payroll saved, password changed — share one bottom-sheet pattern, so every flow ends the same reassuring way.",
          },
        ],
      },
    ],
  },
  "fire-weather": {
    summary:
      "A fire-weather alert app: it shows the conditions that drive wildfire risk where you are — temperature, humidity, wind and drought index — and alerts you when they cross the limits you set.",
    timeline: "",
    team: "Mobile app development from a UI design",
    platform: "iOS & Android",
    metrics: [],
    stack: [
      "React Native",
      "TypeScript",
      "React Navigation",
      "Push notifications",
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "Fire Weather turns a weather feed into one question: is it dangerous out there today? The home screen leads with the temperature for the chosen location, then the four readings fire crews watch — humidity, wind speed, the Keetch–Byram Drought Index (KBDI) and wind direction.",
          },
        ],
      },
      {
        id: "features",
        title: "Key features",
        blocks: [
          {
            type: "list",
            items: [
              "**Location picker** — search for a place or use the device location.",
              "**Conditions at a glance** — temperature with wind, cloud and humidity, and a card for each fire-risk reading.",
              "**Your own thresholds** — set the temperature, humidity, wind speed, KBDI and wind direction that should trigger an alert.",
              "**Notifications** — high-wind, heavy-rain and wind-direction alerts in one list, with mark-all-as-read.",
              "**Account** — a guided sign-up (details, then country, state and region), sign-in, profile editing and a full password-reset flow with an email code.",
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Design and build notes",
        blocks: [
          {
            type: "p",
            text: "One warm orange carries every action and alert, on a light, quiet background, so a warning stands out the moment it appears. Multi-step forms show a progress bar, and each flow ends on a clear confirmation before returning home.",
          },
        ],
      },
    ],
  },
  "caption-ai": {
    summary:
      "An AI post and caption generator: pick a photo, choose the mood, the platform and the tone, and get captions ready to post — with a premium tier for more styles.",
    timeline: "",
    team: "Mobile app development from a UI design",
    platform: "iOS & Android",
    metrics: [],
    stack: ["React Native", "TypeScript", "React Navigation", "AI API"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "Caption AI helps people post faster. The home screen starts from the photo and three choices — mood, platform and tone — and turns them into captions with one tap. Every generated caption is kept in a recents list to reuse later.",
          },
        ],
      },
      {
        id: "features",
        title: "Key features",
        blocks: [
          {
            type: "list",
            items: [
              "**Onboarding** — three full-photo screens that introduce the app before sign-up.",
              "**Caption generator** — auto-caption a photo, or steer it with mood, platform and tone chips.",
              "**Recents** — a history of captioned photos with their dates.",
              "**Premium** — unlimited AI captions and premium tones and styles, with plan options.",
              "**Account** — log in or sign up with email, Google or Apple; reset a password with a phone verification code; dark mode, language and feedback in the profile.",
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Design and build notes",
        blocks: [
          {
            type: "p",
            text: "Onboarding is cinematic — full-bleed photos with bold white type — while the working screens switch to a warm off-white with a coral accent, so the tool itself feels calm. Auth screens share one layout and a built-in keypad for the codes.",
          },
        ],
      },
    ],
  },
  dermacare: {
    summary:
      "A dermatology patient app: find a skin specialist, check their schedule, book and pay for a visit, and keep in touch with the doctor through chat — all from one blue, calm interface.",
    timeline: "",
    team: "Mobile app development from a Figma UI kit",
    platform: "iOS & Android",
    metrics: [],
    stack: ["React Native", "TypeScript", "React Navigation", "Reanimated"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            text: "DermaCare puts a dermatology clinic in the patient's pocket. The home screen opens on today's schedule — a week strip of dates and the next appointment on a timeline — followed by the doctors the patient sees most.",
          },
          {
            type: "p",
            text: "The app covers the whole journey: sign-up and log-in, choosing a doctor, booking and paying, managing upcoming visits, messaging the doctor, and the account settings around it.",
          },
        ],
      },
      {
        id: "features",
        title: "Key features",
        blocks: [
          {
            type: "list",
            items: [
              "**Doctor directory** — each specialist with their speciality, rating and review count, sortable A–Z and by favourites.",
              "**Doctor profile** — years of experience, focus areas, working hours and a month calendar to pick a visit date.",
              "**Booking and payment** — payment method, a review summary before paying, and a clear confirmation with the doctor, date and time.",
              "**Appointments** — upcoming, completed and cancelled tabs, with details, confirm and cancel actions, and reviews after a visit.",
              "**Chat** — text and voice messages with the doctor, with a typing indicator.",
              "**Account** — profile, favourite doctors and services, payment methods, notification and password settings, help centre and privacy policy.",
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Design and build notes",
        blocks: [
          {
            type: "p",
            text: "The interface uses one strong blue for actions and a pale blue for cards, so every screen reads the same way: white for content, pale blue for groups, solid blue for what you can tap. The bottom bar keeps the four main areas — home, chat, profile and appointments — one tap away.",
          },
          {
            type: "p",
            text: "Screens were built from a Figma UI kit with shared components for doctor cards, date chips and list rows, so the same pieces carry through the home, directory and appointment screens.",
          },
        ],
      },
    ],
  },
};
