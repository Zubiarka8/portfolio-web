# Arkaitz Zubizarreta — Portfolio

Personal portfolio for Arkaitz Zubizarreta, UI/UX & Product Designer. One-page home with project case studies, in Spanish (`/es`) and English (`/en`).

## Requirements

- Node.js 20.9 or later (developed with Node 24)
- npm 10 or later

## Installation

```sh
npm install
cp .env.example .env.local   # optional, see "Configuration"
npm run dev
```

Open <http://localhost:3000>.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` (also type-checks) |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check only (run `npx next typegen` first on a fresh clone) |

## Stack

Next.js 16 (App Router, static export), React 19, TypeScript (strict), Tailwind CSS 4, Motion, Lucide React. Fonts are self-hosted at build time with `next/font`: **Doto** (dot-matrix headlines), **Space Mono** (labels, navigation) and **Space Grotesk** (body text).

## Structure

```text
app/
  (es)/                     Spanish root layout: /es, /es/proyectos/[slug] (plus / and /proyectos/[slug], which redirect by language)
  (en)/                     English root layout: /en, /en/projects/[slug]
  global-not-found.tsx      404 for unmatched URLs
  sitemap.ts, robots.ts, icon.svg
  globals.css               Design tokens and custom effects
components/
  layout/                   Navbar, Footer, SiteShell, RootDocument
  sections/                 Hero, Projects, Skills, Tools, Abilities, About, Process
  pages/                    HomePage, ProjectPage, NotFoundView (shared by both locales)
  ui/                       Button, ProjectCard, SectionHeading, AnimatedReveal, FluidArtwork
data/
  site-config.ts            Name, role, email, form endpoint, social profiles
  projects.ts               The six projects and their case studies
  skills.ts                 Skills and tools by category
  profile.ts                Abilities, work process and About copy
  dictionary.ts             Interface copy in both languages
  navigation.ts             Menu, section ids and route helpers
lib/                        i18n types, fonts, SEO helpers, Open Graph image
public/
  images/projects/          Project covers (original SVG mockups)
  artwork/                  Placeholder artwork for the About photo
```

## Customising the content

Every text that describes Arkaitz or his work lives in `data/`. Components only read from there.

- **Personal data**: `data/site-config.ts`. Set `contact.email` and the `href` of each profile in `social`.
- **Projects**: `data/projects.ts`. Each entry has localized `{ es, en }` copy. Set `isDemo: false` for real work; the "Demo" badges and notices disappear automatically. Keep at least one project (the dynamic routes need one to prerender).
- **Skills and tools**: `data/skills.ts`. Icons come from `lucide-react`.
- **About, abilities and process**: `data/profile.ts`. The About text is provisional.
- **Interface copy**: `data/dictionary.ts`.

## Images

- Project covers are 1600 × 900 (16:9). Replace the files in `public/images/projects/` or point `cover.src` at a new file, and update `cover.alt` in both languages.
- Covers are SVG and rendered with `unoptimized`. For JPG/PNG/WebP photos remove `unoptimized` in `components/ui/ProjectCard.tsx` and `components/pages/ProjectPage.tsx` so Next.js optimises them.
- **Owner photo**: put the file in `public/images/` and set `about.photo.src` (for example `/images/arkaitz.jpg`) in `data/profile.ts`. While it is empty, an abstract placeholder is shown and labelled as such. Never use a generated face.

## Configuring links

Empty URLs are never rendered as links. They appear as disabled buttons that say the link is pending, so nothing points to an invented address.

| What | Where |
| --- | --- |
| Project website / repository | `links.website`, `links.repository` in `data/projects.ts` |
| Email (structured data only) | `contact.email` in `data/site-config.ts` |
| GitHub / LinkedIn | `social[].href` in `data/site-config.ts` |
| Canonical domain | `NEXT_PUBLIC_SITE_URL` env var |

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, **Add New → Project** and import it. The Next.js preset needs no changes.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`).
4. Deploy. Add the custom domain under **Settings → Domains** and redeploy so canonical URLs and the sitemap use it.

## Notes

- Unknown project slugs render the localized "not found" page with `noindex`. Because routes are partially prerendered, the HTTP status for those URLs is 200; unmatched paths outside the project routes return a real 404.
- Animations respect `prefers-reduced-motion` (Motion's `MotionConfig` plus CSS media queries).

## Deployment (GitHub Pages)

The site is a static export (`output: "export"`), so it needs no server. There is no `proxy.ts`: the first-visit language choice runs in the browser (`lib/locale-redirect.ts`), and `/es` is the canonical Spanish URL; `/` only redirects by language.

1. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. GitHub Pages on a private repository needs a paid plan; a public repository works on the free plan.
2. Push to `main` (or `nextjs`). `.github/workflows/deploy.yml` builds and publishes `out/`.
3. The workflow derives the base path (`/<repository>`, or empty for `<owner>.github.io`) and the site URL. To use a custom domain, define the repository variable `SITE_URL`.
4. If a branch other than `main` deploys, allow it under **Settings → Environments → github-pages → Deployment branches**.

Build locally for a project site:

```sh
NEXT_PUBLIC_BASE_PATH=/portfolio-web NEXT_PUBLIC_SITE_URL=https://<user>.github.io/portfolio-web npm run build
```
