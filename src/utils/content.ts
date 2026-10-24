import {
  BLOG_POSTS,
  CASE_STUDIES,
  COMPANY_PERIODS,
  COPY,
  EXPERIENCE,
  EXTRA_TOOL_LOGOS,
  FILTER_ALL,
  PAPER_CITE_ID,
  PROJECTS,
  RESEARCH,
  SITE,
  SKILL_GROUPS,
  STATS,
  TESTIMONIALS,
  UI,
} from "@/constants/constant";
import type {
  CompanyHistory,
  Fact,
  Neighbours,
  Paper,
  Post,
  PostsTab,
  Project,
  ProjectSummary,
  Section,
  Stat,
  Testimonial,
  TestimonialStrip,
  TocItem,
  Tool,
} from "@/types/types";

/** Absolute URL for a site path — canonical links, sitemap, structured data. */
export const absoluteUrl = (path = "/"): string => new URL(path, SITE.url).toString();

/** Listings merged with their case studies — what /projects/[slug] renders. */
export const projects: Project[] = PROJECTS.map((p) => ({ ...p, ...CASE_STUDIES[p.slug] }));

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

export const getPost = (slug: string): Post | undefined => BLOG_POSTS.find((p) => p.slug === slug);

export const getPaper = (slug: string): Paper | undefined => RESEARCH.find((r) => r.slug === slug);

/** The previous and next items around `index`, wrapping around the list. */
export const neighbours = <T>(list: T[], index: number): Neighbours<T> => ({
  prev: list[(index - 1 + list.length) % list.length],
  next: list[(index + 1) % list.length],
});

/** The next `count` items after `index`, wrapping around (for "keep reading"). */
export const nextItems = <T>(list: T[], index: number, count: number): T[] =>
  Array.from({ length: count }, (_, i) => list[(index + i + 1) % list.length]);

/** Position of a project in the full list (its "01", "02" number). */
export const projectNumber = (slug: string): number => PROJECTS.findIndex((p) => p.slug === slug) + 1;

/** Shared view-transition name linking a project's preview to its case-study hero. */
export const previewTransitionName = (slug: string): string => `project-${slug}`;

/** Role, timeline, team and platform as label/value pairs for the case-study header. */
export const projectFacts = (project: Project): Fact[] => {
  const { facts } = COPY.project;
  return [
    { label: facts.role, value: project.role },
    { label: facts.timeline, value: project.timeline },
    { label: facts.team, value: project.team },
    { label: facts.platform, value: project.platform },
  ];
};

/** Table-of-contents entries for a list of long-form sections. */
export const tocItems = (sections: Section[]): TocItem[] => sections.map(({ id, title }) => ({ id, title }));

/** Position of a paper in the research list (its "paper 01" number). */
export const paperNumber = (slug: string): number => RESEARCH.findIndex((r) => r.slug === slug) + 1;

/** A paper's contents: its sections, then the citation block. */
export const paperTocItems = (paper: Paper): TocItem[] => [
  ...tocItems(paper.sections),
  { id: PAPER_CITE_ID, title: COPY.research.citeTitle },
];

/** Projects of one type ("All" keeps every project). */
export const filterProjects = (type: string): ProjectSummary[] =>
  PROJECTS.filter((p) => type === FILTER_ALL || p.type === type);

/** Posts in one category ("All" keeps every post). */
export const filterPosts = (category: string): Post[] =>
  BLOG_POSTS.filter((p) => category === FILTER_ALL || p.category === category);

/** Simple Icons slug for a tool name — from the skill groups, plus store names used in short lists. */
export const toolLogo = (name: string): string | undefined =>
  SKILL_GROUPS.flatMap((g) => g.items).find((t) => t.name === name)?.logo ?? EXTRA_TOOL_LOGOS[name];

/** Plain tool names → tools with logos. */
export const withLogos = (names: string[]): Tool[] => names.map((name) => ({ name, logo: toolLogo(name) }));

/** Total tools across every skill group. */
export const totalTools = (): number => SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

/** The skills page numbers: the tool count, then the headline stats. */
export const skillStats = (): Stat[] => [
  { value: totalTools(), suffix: "", label: COPY.skills.totalLabel },
  ...STATS.slice(0, UI.skillStats),
];

/**
 * Work history grouped by company (newest first) so a company with several
 * roles — internship then junior — appears once with its roles beneath.
 */
export const experienceByCompany: CompanyHistory[] = EXPERIENCE.reduce<CompanyHistory[]>((groups, role) => {
  const group = groups.find((g) => g.company === role.company);
  if (group) {
    group.roles.push(role);
    group.current ||= role.current;
  } else {
    groups.push({
      company: role.company,
      location: role.location,
      period: COMPANY_PERIODS[role.company] ?? role.years,
      current: role.current,
      roles: [role],
    });
  }
  return groups;
}, []);

/** Number of entries behind a posts tab. */
export const postsTabCount = (tab: PostsTab): number => (tab === "blog" ? BLOG_POSTS.length : RESEARCH.length);

export const totalRoles = (): number => EXPERIENCE.length;

/**
 * The featured testimonial (shown large on its own) and the strip of the rest.
 * Each half of the strip holds the set twice, so a half is always wider than
 * its container and the loop never shows a gap.
 */
export const testimonialStrip = (): TestimonialStrip => {
  const [featured, ...others] = orderedTestimonials();
  return { featured, loop: [...others, featured, ...others, featured] };
};

/** Featured testimonial first, then the rest. */
export const orderedTestimonials = (): Testimonial[] => [
  ...TESTIMONIALS.filter((t) => t.featured),
  ...TESTIMONIALS.filter((t) => !t.featured),
];
