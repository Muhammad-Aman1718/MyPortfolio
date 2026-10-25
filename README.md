# muhammad-aman.com

Portfolio of Muhammad Aman — Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP.

## Getting started

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev
```

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Development server on :3000      |
| `npm run build` | Production build (static pages)  |
| `npm start`     | Serve the production build       |
| `npm run lint`  | ESLint                           |

### Environment variables

| Variable                            | Required | Purpose                                                                 |
| ----------------------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | No       | PostHog analytics. Without it analytics are off.                        |
| `NEXT_PUBLIC_POSTHOG_HOST`          | No       | PostHog API host, e.g. `https://us.i.posthog.com`.                      |
| `NEXT_PUBLIC_IMAGE_HOST`            | No       | Host of your Cloudflare R2 custom domain for images (see below).        |
| `SHOW_DRAFTS`                       | No       | `true` shows draft posts locally. Never set it in production.           |

`.env.local` is git-ignored. Set the same variables on your host (e.g. Vercel → Project → Settings → Environment Variables). `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

## Project layout

```
content/            Articles (MDX) — one file per post or paper
  posts/            Blog posts → /posts/<file-name>
  research/         Research papers → /posts/research/<file-name>
public/             Static files (images under public/images/…)
src/
  app/              Routes
  components/       PascalCase components (mdx/ renders article content)
  constants/        All copy and constant data (constant.ts)
  hooks/            Client state (one hook per stateful component)
  lib/              Server modules: content loading, MDX, SEO, analytics
  types/            All types (types.ts)
  utils/            Pure helpers
```

## Writing a blog post

1. Create `content/posts/my-post-title.mdx`. The file name is the URL slug.
2. Add frontmatter, write the body in Markdown/MDX, and set `status: "published"` when it's ready.

```mdx
---
title: "Profiling React Native cold starts"
excerpt: "A practical investigation into React Native startup performance."
publishedAt: "2026-10-20"
updatedAt: "2026-10-22"        # optional
category: "Technical"
subcategory: "Performance"     # optional — adds a topic filter under the category
tags:
  - "React Native"
  - "Performance"
featured: true                 # optional — the featured spread on /posts
featuredOrder: 1               # optional — lower comes first among featured posts
coverImage: "/images/posts/cold-starts.png"   # optional, local path or https URL
coverImageAlt: "Startup trace in Perfetto"    # required with coverImage
status: "published"            # "draft" (default) or "published"
---

## First section

Your article…
```

All frontmatter fields:

| Field | Notes |
| --- | --- |
| `title`, `excerpt`, `publishedAt`, `category` | Required. Dates are `YYYY-MM-DD`. |
| `slug` | Optional; must equal the file name if set. |
| `updatedAt` | Shown as "Updated …" and used for `dateModified` and the sitemap. |
| `author` | Defaults to Muhammad Aman. |
| `subcategory`, `tags` | Filters on /posts. Tags on an article link to `/posts?tag=…`. |
| `featured`, `featuredOrder` | Featured status is separate from `status`. |
| `coverImage`, `coverImageAlt` | Shown under the header and used as the social image. |
| `readingTime` | Minutes. Calculated automatically from the text when omitted. |
| `status` | `draft` posts never appear in listings, static pages, search or the sitemap. |
| `seoTitle`, `seoDescription`, `canonicalUrl`, `ogImage` | Override the metadata derived from `title`/`excerpt`/cover. |
| `series`, `seriesOrder` | Posts sharing a `series` get a "Part 2 of 3" list. |
| `relatedPosts` | Slugs to suggest under the article; the rest are picked by shared tags and category. |
| `allowComments` | Reserved; there is no comments backend. |

Frontmatter is validated when the site builds: a missing field, a misspelt key or a bad date fails the build with the file name and the problem.

Preview drafts locally with `SHOW_DRAFTS=true npm run dev`. `content/posts/mdx-authoring-reference.mdx` is a draft that shows every element below — copy it to start.

## Writing a research paper

Create `content/research/my-paper.mdx`:

```mdx
---
title: "Offline-first data synchronization patterns"
authors:
  - "M. Aman"
publishedAt: "2026-02-01"
year: "2026"
venue: "Preprint"
abstract: "One-paragraph abstract."
tags: ["mobile", "CRDTs"]
status: "published"
doi: "10.1145/1234567"                  # optional
pdfUrl: "https://…/paper.pdf"           # optional — otherwise "Request PDF" links to /contact
paperUrl: "https://…"                   # optional
findings:                               # optional — shown as counting-up numbers
  - value: 40
    suffix: "%"
    label: "faster cold start"
relatedResearch: ["other-paper-slug"]   # optional
bibtex: |
  @misc{aman2026offline,
    title  = {…},
    author = {Aman, M.},
    year   = {2026}
  }
---

## Introduction
```

Sections are numbered automatically, and "Cite this paper" (with a copy button for the BibTeX) is added at the end.

## Article elements

```mdx
## Section heading            ← becomes a table-of-contents entry with a #anchor
### Sub-heading

**bold**, *italic*, `inline code`, [internal link](/projects), [external link](https://example.com)
Footnote reference.[^1]

- bullet list
1. numbered list
- [x] task list

> Blockquote

| Column | Column |
| --- | --- |
| Tables | scroll sideways on phones |

![Alt text](/images/posts/chart.png "Optional caption")

<Figure src="/images/posts/diagram.png" alt="What it shows" caption="Caption" width={1600} height={900} />
<Quote cite="Name">A pull quote with attribution.</Quote>
<Callout type="tip" title="Practical advice">Text.</Callout>   ← info (default), tip, warning, danger
<YouTube id="VIDEO_ID" title="What the video shows" />

[^1]: Footnote text.
```

### Code blocks

Fenced code is highlighted at build time (no client JavaScript) and every block gets a language label and a **Copy code** button.

````mdx
```ts title="lib/measure.ts" {2-3} showLineNumbers
const startedAt = performance.now();
await loadInitialData();
console.log(performance.now() - startedAt);
```
````

- `title="…"` — filename/caption in the header
- `{2,4-6}` — highlight lines
- `showLineNumbers` — line numbers
- Supported: TypeScript, TSX, JavaScript, JSX, JSON, Bash/Shell, Python, SQL, CSS, HTML, YAML, Diff, Markdown, Swift, Kotlin, Java, XML, GraphQL. Any other language renders as plain text. Add languages in `CODE_LANGUAGES` (`src/constants/constant.ts`).

Escape `{`, `}` and `<` in prose as `\{`, `\}` and `\<` — MDX reads them as code and JSX. Inside backticks and code blocks they're fine.

## Images

**Local:** put files in `public/images/posts/` or `public/images/research/` and reference them as `/images/posts/file.png`. They're resized and served as modern formats by Next.js.

**Cloudflare R2 (optional):** for large or many images.

1. Cloudflare dashboard → **R2** → **Create bucket** (e.g. `portfolio-images`).
2. Bucket → **Settings** → **Custom Domains** → **Connect Domain** → e.g. `images.muhammad-aman.com` (the domain must be on Cloudflare). This makes the bucket publicly readable at that domain. Leave the `r2.dev` URL disabled for production.
3. Upload images in the dashboard (**Objects** → **Upload**), or with `npx wrangler r2 object put portfolio-images/posts/cold-starts.png --file ./cold-starts.png --remote`.
4. Set `NEXT_PUBLIC_IMAGE_HOST=images.muhammad-aman.com` in `.env.local` and on your host, then rebuild. This adds the host to `images.remotePatterns` in `next.config.ts`, so its images are optimised.
5. Use `https://images.muhammad-aman.com/posts/cold-starts.png` in `coverImage`, `![…](…)` or `<Figure>`.

Uploads happen in the Cloudflare dashboard or with Wrangler on your machine — the site never needs R2 access keys, and none should be added to it. Without `NEXT_PUBLIC_IMAGE_HOST` the site works with local images only; other https images are shown as-is, and an image that fails to load shows its alt text instead of a broken icon.

## Analytics

PostHog starts in `src/instrumentation-client.ts` and records pageviews, clicks and web vitals automatically. Custom events: `contact_form_submitted` (project type and budget only — no names, emails or messages) and `contact_form_failed`.
