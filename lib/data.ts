/**
 * All site content lives here — swap the placeholder copy for your real
 * details in one place.
 */

export const stats = [
  { value: 8, suffix: "+", label: "years of experience", large: true },
  { value: 40, suffix: "+", label: "projects shipped" },
  { value: 25, suffix: "+", label: "clients served" },
  { value: 30, suffix: "+", label: "technologies mastered" },
  { value: 2100, suffix: "+", label: "github contributions" },
];

export const featuredProjects = [
  {
    name: "Quran Companion",
    tagline: "A beautifully-crafted Quran app trusted by 100k+ daily readers.",
    tags: ["React Native", "TypeScript", "SQLite", "Reanimated"],
    href: "/projects",
    type: "Mobile",
    year: "2025",
    tone: "from-primary/30",
  },
  {
    name: "FleetPulse Dashboard",
    tagline: "Real-time logistics tracking that cut dispatch errors by 60%.",
    tags: ["Next.js", "PostgreSQL", "WebSockets", "Redis"],
    href: "/projects",
    type: "Web",
    year: "2025",
    tone: "from-accent/20",
  },
  {
    name: "Ledgerly",
    tagline: "Accounting automation for freelancers — invoices to taxes in one flow.",
    tags: ["Next.js", "tRPC", "Stripe", "Prisma"],
    href: "/projects",
    type: "Web",
    year: "2024",
    tone: "from-secondary",
  },
];

export const skillsBento = [
  {
    name: "Mobile",
    span: "md:col-span-2",
    icon: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 19h2",
    items: ["React Native", "Expo", "Swift", "Kotlin", "Reanimated", "App Store Ops"],
  },
  {
    name: "Frontend",
    span: "md:col-span-2",
    icon: "M4 5h16v11H4zM8 21h8M12 16v5",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    name: "Backend",
    span: "",
    icon: "M5 8h14M5 12h14M5 16h14M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    items: ["Node.js", "NestJS", "tRPC", "GraphQL"],
  },
  {
    name: "Database",
    span: "",
    icon: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6",
    items: ["PostgreSQL", "SQLite", "Redis", "Prisma"],
  },
  {
    name: "Cloud",
    span: "",
    icon: "M6 19a4 4 0 0 1 0-8 6 6 0 0 1 11.3-2A5 5 0 0 1 18 19H6z",
    items: ["AWS", "Vercel", "Docker", "CI/CD"],
  },
  {
    name: "Tools",
    span: "",
    icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.4-2.4 2.4-2.4z",
    items: ["Git", "Figma", "Sentry", "Linear"],
  },
];

export const experience = [
  {
    years: "2023 — now",
    role: "Senior Software Engineer",
    company: "Freelance / Consulting",
    location: "Karachi, Pakistan (remote)",
    current: true,
    bullets: [
      "Shipped 6 client products end-to-end, from scoping to app-store release.",
      "Reduced a client's app cold-start time by 40% through native module profiling.",
      "Set up CI/CD pipelines that cut release cycles from weeks to days.",
    ],
    tags: ["React Native", "Next.js", "AWS"],
  },
  {
    years: "2020 — 2023",
    role: "Lead Mobile Engineer",
    company: "TechVentures",
    location: "Remote",
    bullets: [
      "Led a team of 5 building a fintech app used by 250k customers.",
      "Cut crash rate from 2.1% to 0.3% with a structured stability program.",
    ],
    tags: ["React Native", "Kotlin", "GraphQL"],
  },
  {
    years: "2018 — 2020",
    role: "Full-stack Developer",
    company: "Digital Studio Co",
    location: "Karachi, Pakistan",
    bullets: [
      "Built and maintained 12 client web applications.",
      "Introduced TypeScript and testing culture across the team.",
    ],
    tags: ["React", "Node.js", "PostgreSQL"],
  },
];

export const certificates = [
  {
    name: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    year: "2025",
    id: "AWS-SAA-00123",
    href: "https://aws.amazon.com/verification",
  },
  {
    name: "Google Associate Android Developer",
    issuer: "Google",
    year: "2024",
    id: "GAAD-88410",
    href: "https://developers.google.com/certification",
  },
  {
    name: "Meta React Native Specialization",
    issuer: "Meta / Coursera",
    year: "2023",
    id: "META-RN-5521",
    href: "https://coursera.org/verify",
  },
  {
    name: "Professional Scrum Master I",
    issuer: "Scrum.org",
    year: "2022",
    id: "PSM-I-99031",
    href: "https://scrum.org/certificates",
  },
];

export const testimonials = [
  {
    quote:
      "Hafiz rebuilt our app in half the estimated time and it hasn't crashed once in eight months. Worth every dollar.",
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

export const posts = [
  {
    category: "Technical",
    title: "Profiling React Native cold starts: a field guide",
    excerpt: "Where those two seconds actually go, and how to claw them back.",
    date: "Jul 2026",
    readingTime: "9 min",
  },
  {
    category: "Case Study",
    title: "Shipping a Quran app to 100k daily readers",
    excerpt: "Offline-first architecture decisions that made it possible.",
    date: "Jun 2026",
    readingTime: "12 min",
  },
  {
    category: "Notes",
    title: "Why I stopped estimating in hours",
    excerpt: "Scope-based pricing changed my client relationships entirely.",
    date: "May 2026",
    readingTime: "5 min",
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

/** Full project list for /projects (flagship spans two columns when unfiltered). */
export const allProjects: {
  name: string;
  type: string;
  year: string;
  role: string;
  tagline: string;
  tags: string[];
  tone: string;
  flagship?: boolean;
}[] = [
  { name: "Quran Companion", type: "Mobile", year: "2025", role: "Solo build", tagline: "Offline-first Quran app with 100k+ daily readers.", tags: ["React Native", "SQLite", "Reanimated"], tone: "from-primary/30", flagship: true },
  { name: "FleetPulse Dashboard", type: "Web", year: "2025", role: "Lead engineer", tagline: "Real-time logistics tracking that cut dispatch errors by 60%.", tags: ["Next.js", "WebSockets", "Redis"], tone: "from-accent/20" },
  { name: "Ledgerly", type: "Web", year: "2024", role: "Full-stack", tagline: "Accounting automation for freelancers.", tags: ["Next.js", "tRPC", "Stripe"], tone: "from-secondary" },
  { name: "BankLite", type: "Mobile", year: "2023", role: "Team lead", tagline: "Fintech app serving 250k customers at 0.3% crash rate.", tags: ["React Native", "Kotlin", "GraphQL"], tone: "from-primary/20" },
  { name: "OrderFlow API", type: "Backend", year: "2023", role: "Architect", tagline: "Order-processing backbone handling 2M requests a day.", tags: ["NestJS", "PostgreSQL", "Docker"], tone: "from-accent/15" },
  { name: "StudioSite CMS", type: "Client work", year: "2022", role: "Full-stack", tagline: "Custom CMS powering 12 agency client sites.", tags: ["React", "Node.js", "PostgreSQL"], tone: "from-secondary" },
];
