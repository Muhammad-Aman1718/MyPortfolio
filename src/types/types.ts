/**
 * Every shared type and interface in the app. Components, hooks, utils and
 * constants import from here — no type declarations live anywhere else.
 */
import type { ChangeEvent, CSSProperties, FocusEvent, ReactNode } from "react";
import type { MetadataRoute } from "next";

/* ─────────────────────────── Site & navigation ─────────────────────────── */

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteLocation {
  city: string;
  country: string;
  countryCode: string;
  timezone: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  url: string;
  email: string;
  role: string;
  employer: string;
  location: SiteLocation;
  whatsapp: { display: string; href: string };
  description: string;
  keywords: string[];
  knowsAbout: string[];
  socials: SocialLink[];
  portrait: string;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  muted: string;
  primary: string;
}

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
}

export interface ArticleMetaInput extends PageMetaInput {
  publishedTime?: string;
}

export type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export interface SitemapPage {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

/* ─────────────────────────── Long-form content ─────────────────────────── */

/** Inline `code`, **bold** and [links](href) are supported inside text. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; lang: string; code: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface DayMonth {
  day: string;
  month: string;
}

export interface Neighbours<T> {
  prev: T;
  next: T;
}

export interface TocItem {
  id: string;
  title: string;
}

export type PostCategory = "Technical" | "Tutorials" | "Case Study" | "Notes";

export interface Post {
  slug: string;
  category: PostCategory;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readingTime: string;
  featured?: boolean;
  sections: Section[];
}

export interface Paper {
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
}

export type ProjectType = "Mobile" | "Web" | "Backend" | "Client work";

export interface ProjectSummary {
  slug: string;
  name: string;
  type: ProjectType;
  year: string;
  role: string;
  tagline: string;
  tags: string[];
  flagship?: boolean;
}

export interface ProjectQuote {
  text: string;
  name: string;
  role: string;
}

export interface CaseStudy {
  summary: string;
  timeline: string;
  team: string;
  platform: string;
  metrics: Metric[];
  stack: string[];
  quote?: ProjectQuote;
  sections: Section[];
}

export type Project = ProjectSummary & CaseStudy;

export interface LegalPageContent {
  title: string;
  highlight: readonly string[];
  description: string;
  path: string;
  updated: string;
  /** Opening paragraph — inline markup allowed */
  summary: string;
  sections: Section[];
}

/* ─────────────────────────── Portfolio data ─────────────────────────── */

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/** A tool, with its Simple Icons slug when one exists (served from /logos/<slug>.svg). */
export interface Tool {
  name: string;
  logo?: string;
}

export interface SkillGroup {
  name: string;
  context: string;
  icon: string;
  items: Tool[];
}

export interface ExperienceRole {
  years: string;
  role: string;
  company: string;
  location: string;
  current: boolean;
  bullets: string[];
  tags: string[];
}

export interface CompanyHistory {
  company: string;
  location: string;
  period: string;
  current: boolean;
  roles: ExperienceRole[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
}

export interface Service {
  name: string;
  description: string;
  items: string[];
  engagement: string;
  from: string;
  featured?: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface IconCard {
  title: string;
  text: string;
  icon: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface RouteCard {
  href: string;
  label: string;
  note: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  note: string;
  external?: boolean;
}

/* ─────────────────────────── Motion ─────────────────────────── */

export type RevealVariant =
  | "fade-up"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "clip-up"
  | "clip-left"
  | "clip-right"
  | "tilt"
  | "mask"
  | "blur";

export interface RevealPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration: number;
  ease: string;
  stagger: number;
}

/** CSS on-load entrances defined in globals.css (`[data-enter="…"]`). */
export type EnterAnimation =
  | "rise"
  | "fade"
  | "mask"
  | "skew"
  | "blur"
  | "zoom"
  | "drop"
  | "left"
  | "right"
  | "pop"
  | "wipe"
  | "card";

export type SplitEnter = "mask" | "skew" | "blur" | "rise";

export type HeaderMotion = "words" | "wipe" | "fade" | "blur";

export type StaggerFrom = "start" | "center" | "end" | "edges";

export interface EnterProps {
  "data-enter": EnterAnimation;
  style: CSSProperties;
}

/* ─────────────────────────── Icons ─────────────────────────── */

export type IconName =
  | "arrowRight"
  | "arrowUpRight"
  | "chevronLeft"
  | "chevronRight"
  | "chevronDown"
  | "check"
  | "copy"
  | "link"
  | "mail"
  | "calendar"
  | "plus"
  | "menu"
  | "close"
  | "alert"
  | "play"
  | "pause"
  | "quote";

export interface IconDefinition {
  path: string;
  /** Solid glyphs (quote, play/pause) are filled instead of stroked */
  filled?: boolean;
}

/* ─────────────────────────── Forms & UI state ─────────────────────────── */

export type ContactField = "name" | "email" | "message";

export type ContactFieldElement = HTMLInputElement | HTMLTextAreaElement;

/** gsap.utils.selector() result — scoped querySelectorAll. */
export type ScopedSelector = (selector: string) => Element[];

export type FieldErrors = Partial<Record<ContactField, string>>;

/** Contact form lifecycle: editing → sending → sent, or failed (form kept, error shown). */
export type FormStatus = "idle" | "sending" | "sent" | "failed";

export type PostsTab = "blog" | "research";

export type CarouselDirection = -1 | 1;

/* ─────────────────────────── Component props ─────────────────────────── */

export interface ChildrenProps {
  children: ReactNode;
}

/** A named glyph from ICONS, or a raw 24×24 `path` (data-driven icons). */
export interface IconProps {
  name?: IconName;
  path?: string;
  className?: string;
  strokeWidth?: number;
  pathClassName?: string;
}

export interface HighlightedTextProps {
  text: string;
  highlight?: readonly string[];
}

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Motion preset — see REVEAL_PRESETS */
  variant?: RevealVariant;
  /** Animate direct children with a stagger instead of the wrapper itself */
  stagger?: boolean;
  /** Animate elements matching this selector (inside the wrapper) instead */
  targets?: string;
  /** Override the preset's per-item stagger (seconds) */
  each?: number;
  from?: StaggerFrom;
  /** Stagger as a 2D wave across a CSS grid */
  grid?: boolean;
  delay?: number;
  duration?: number;
  /** ScrollTrigger start position */
  start?: string;
  as?: "div" | "section" | "ul" | "ol" | "span";
  id?: string;
}

export interface RevealOptions {
  variant: RevealVariant;
  stagger: boolean;
  targets?: string;
  each?: number;
  from: StaggerFrom;
  grid: boolean;
  delay: number;
  duration?: number;
  start: string;
}

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  /** Words of the title (exact match) set in the primary colour */
  highlight?: readonly string[];
  description?: string;
  center?: boolean;
  action?: ReactNode;
  motion?: HeaderMotion;
  className?: string;
}

export interface SplitTextProps {
  text: string;
  enter?: SplitEnter;
  /** ms before the first word */
  delay?: number;
  /** ms between words */
  step?: number;
  /** Words (exact match) rendered in the accent colour */
  accent?: readonly string[];
  className?: string;
}

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: readonly string[];
  description?: ReactNode;
  children?: ReactNode;
}

export interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export interface RotatingWordProps {
  words: readonly string[];
  interval?: number;
}

export interface MarqueeProps {
  items: Tool[];
  label: string;
}

export interface CarouselProps {
  children: ReactNode;
  label: string;
  /** Grid columns from lg up (a literal class so Tailwind sees it) */
  desktopCols?: string;
}

export interface FilterPillsProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export interface ReadingProgressProps {
  /** CSS selector of the element whose scroll drives the bar */
  target: string;
}

export interface TocProps {
  items: TocItem[];
  numbered?: boolean;
}

export interface JsonLdProps {
  data: Record<string, unknown>;
}

export interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

export interface AvatarProps {
  className?: string;
  priority?: boolean;
}

export interface PortraitProps {
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export interface ToolLogoProps {
  tool: Tool;
  /** Pixel size of the logo glyph */
  size?: number;
  className?: string;
}

export interface ToolChipProps {
  tool: Tool;
  className?: string;
}

export interface BackLinkProps {
  href: string;
  label: string;
}

export interface TagListProps {
  tags: string[];
  label?: string;
  className?: string;
}

export interface CodeBlockProps {
  code: string;
  caption: string;
  copyLabel: string;
}

export interface MetricGridProps {
  metrics: Metric[];
  size?: "md" | "lg";
}

export interface StatCardProps {
  stat: Stat;
  animated?: boolean;
  className?: string;
}

export interface CtaPanelProps {
  title?: string;
  description?: string;
  email?: boolean;
}

export interface FaqListProps {
  items: Faq[];
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  highlight: readonly string[];
}

export interface FaqSplitProps {
  header: SectionCopy;
  items: Faq[];
}

export interface InlineTextProps {
  text: string;
}

export interface ProseProps {
  sections: Section[];
  numbered?: boolean;
}

export interface ProseBlockProps {
  block: Block;
}

export interface LegalPageProps {
  content: LegalPageContent;
}

export interface ProjectPreviewProps {
  name: string;
  type: ProjectType;
  /** Positioning/sizing is the caller's (e.g. "absolute inset-0") */
  className?: string;
}

export interface PreviewProps {
  name: string;
}

export interface PreviewChromeProps {
  label: string;
}

export interface ProjectCardProps {
  project: ProjectSummary;
  index: number;
  wide: boolean;
}

export interface SharedPreviewProps {
  slug: string;
  children: ReactNode;
}

export interface ProjectTileProps {
  project: ProjectSummary;
}

export interface PostRowProps {
  post: Post;
}

export interface FeaturedPostProps {
  post: Post;
}

export interface PostCardProps {
  post: Post;
}

export interface BlogListProps {
  posts: Post[];
}

export interface PaperCardProps {
  paper: Paper;
  index: number;
}

export interface SkillsExplorerProps {
  groups: SkillGroup[];
}

export interface ServicesStackProps {
  services: Service[];
}

export interface ServiceCardProps {
  service: Service;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export interface QuoteFigureProps {
  testimonial: Testimonial;
}

export interface CompanyCardProps {
  company: CompanyHistory;
}

export interface FormFieldProps {
  label: string;
  /** Set for custom controls: the label renders as a span with this id, for aria-labelledby */
  labelId?: string;
  /** Field name — its error message (if any) renders under the control */
  field?: ContactField;
  error?: string;
  required?: boolean;
  /** Trailing hint, e.g. "(optional)" */
  optional?: string;
  children: ReactNode;
}

export interface SelectFieldProps {
  name: string;
  options: readonly string[];
  placeholder: string;
  /** Id of the visible label */
  labelledBy: string;
  defaultValue?: string;
}

export interface FieldErrorProps {
  id: string;
  message: string;
}

export interface ContactFieldA11y {
  "aria-invalid": true | undefined;
  "aria-describedby": string;
  onBlur: (e: FocusEvent<ContactFieldElement>) => void;
  onChange: (e: ChangeEvent<ContactFieldElement>) => void;
}

export interface PrevNextProps {
  prev: ProjectSummary;
  next: ProjectSummary;
}

export interface FactListProps {
  facts: Fact[];
  className?: string;
}

export interface SkillPanelProps {
  group: SkillGroup;
  index: number;
  total: number;
  id: string;
  labelledBy: string;
  hidden: boolean;
}

export interface ContactSentProps {
  onBack: () => void;
}

export interface InitialsProps {
  name: string;
  className?: string;
}

export interface TestimonialStrip {
  featured: Testimonial;
  loop: Testimonial[];
}

export interface TestimonialsSectionProps {
  loop: Testimonial[];
}

export interface RoleItemProps {
  role: ExperienceRole;
  /** Card is the solid primary one */
  inverted: boolean;
  last: boolean;
}

export interface ChannelCardProps {
  channel: ContactChannel;
  index: number;
}

export interface ProjectProps {
  project: Project;
}

export interface StackListProps {
  stack: string[];
  className?: string;
}

export interface ProjectQuoteProps {
  quote: ProjectQuote;
}

export interface PaperProps {
  paper: Paper;
}

export interface RouteCardLinkProps {
  route: RouteCard;
  delay: number;
}
