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

/** Skill groups as listed on muhammad-aman.com/skills. `context` is one line on how each is used. */
export const skillGroups = [
  {
    name: "Mobile",
    context: "Cross-platform apps with React Native — my day-to-day work at SIGMAKODE.",
    icon: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 19h2",
    items: ["React Native", "Expo", "React Native CLI", "Native APIs", "RTK Query", "Mobile UI optimisation"],
  },
  {
    name: "Frontend",
    context: "Fast, accessible interfaces in React and Next.js.",
    icon: "M4 5h16v11H4zM8 21h8M12 16v5",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Zustand", "Framer Motion", "shadcn/ui", "SCSS / Sass", "HTML5", "CSS3"],
  },
  {
    name: "Backend",
    context: "APIs and services that the apps above talk to.",
    icon: "M5 8h14M5 12h14M5 16h14M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Authentication", "Prisma ORM", "Mongoose"],
  },
  {
    name: "Database",
    context: "Schema design and data stores, SQL and NoSQL.",
    icon: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase / Firestore", "Database design"],
  },
  {
    name: "DevOps",
    context: "Version control, pipelines and deployment.",
    icon: "M6 19a4 4 0 0 1 0-8 6 6 0 0 1 11.3-2A5 5 0 0 1 18 19H6z",
    items: ["Git", "GitHub", "GitHub Actions", "Docker", "Docker Compose", "CI/CD", "AWS", "Vercel"],
  },
  {
    name: "Foundations",
    context: "The languages and computer-science basics underneath it all.",
    icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.4-2.4 2.4-2.4z",
    items: ["JavaScript", "TypeScript", "Python", "Data structures", "Algorithms", "System design basics", "Performance optimisation", "Clean architecture"],
  },
];

/** Most-used tools, for tickers and short lists. */
export const coreTools = [
  "React Native", "TypeScript", "Next.js", "React", "Redux Toolkit", "RTK Query", "Expo",
  "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Tailwind CSS", "Prisma", "Docker", "Git",
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
    tags: ["TypeScript", "React Native", "Expo", "React Native CLI", "Redux Toolkit", "RTK Query", "REST APIs"],
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
    tags: ["TypeScript", "React", "Next.js", "MongoDB", "REST APIs", "React Native", "Redux"],
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
  { company: string; location: string; period: string; current: boolean; roles: typeof experience }[]
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
    quote: "The rare engineer who pushes back on bad ideas and delivers better ones.",
    name: "Omar Farooq",
    role: "Founder, Ledgerly",
  },
  {
    quote: "Clear communication, honest estimates, and production-quality code from day one.",
    name: "Anna Keller",
    role: "PM, TechVentures",
  },
  {
    quote: "Our store rating went from 3.8 to 4.7 after his performance overhaul.",
    name: "David Chen",
    role: "Product Lead, Digital Studio Co",
  },
];

export const services = [
  {
    name: "Mobile App Development",
    description: "React Native apps built for reliability, performance, and store approval on the first try.",
    items: ["Architecture & setup", "UI implementation", "Native modules", "Store submission", "3 months support"],
    engagement: "fixed scope",
    from: "from $8k",
    featured: true,
  },
  {
    name: "Web Application Development",
    description: "Next.js products from landing page to full SaaS, deployed and monitored.",
    items: ["Full-stack build", "Database design", "Auth & payments", "SEO & analytics", "Deployment"],
    engagement: "fixed scope / weekly",
    from: "from $5k",
  },
  {
    name: "Technical Consulting",
    description: "Audits, performance rescue, and architecture reviews for existing products.",
    items: ["Codebase audit", "Performance profiling", "Written report", "Roadmap session", "Follow-up call"],
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
  { slug: "quran-companion", name: "Quran Companion", type: "Mobile", year: "2025", role: "Solo build", tagline: "Offline-first Quran app with 100k+ daily readers.", tags: ["React Native", "SQLite", "Reanimated"], tone: "from-primary/30", flagship: true },
  { slug: "fleetpulse-dashboard", name: "FleetPulse Dashboard", type: "Web", year: "2025", role: "Lead engineer", tagline: "Real-time logistics tracking that cut dispatch errors by 60%.", tags: ["Next.js", "WebSockets", "Redis"], tone: "from-accent/20" },
  { slug: "ledgerly", name: "Ledgerly", type: "Web", year: "2024", role: "Full-stack", tagline: "Accounting automation for freelancers.", tags: ["Next.js", "tRPC", "Stripe"], tone: "from-secondary" },
  { slug: "banklite", name: "BankLite", type: "Mobile", year: "2023", role: "Team lead", tagline: "Fintech app serving 250k customers at 0.3% crash rate.", tags: ["React Native", "Kotlin", "GraphQL"], tone: "from-primary/20" },
  { slug: "orderflow-api", name: "OrderFlow API", type: "Backend", year: "2023", role: "Architect", tagline: "Order-processing backbone handling 2M requests a day.", tags: ["NestJS", "PostgreSQL", "Docker"], tone: "from-accent/15" },
  { slug: "studiosite-cms", name: "StudioSite CMS", type: "Client work", year: "2022", role: "Full-stack", tagline: "Custom CMS powering 12 agency client sites.", tags: ["React", "Node.js", "PostgreSQL"], tone: "from-secondary" },
];
