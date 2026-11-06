# Portfolio — project instructions

Personal portfolio website. Communicate with the owner in Spanish (Castilian). Write code, identifiers, comments, documentation, commits and pull request descriptions in English. Public website content is localized into Spanish and English.

## Stack

- Next.js with the App Router.
- React and TypeScript in strict mode.
- Tailwind CSS for layout and utilities.
- Motion for animations (required for this project's animations).
- Lucide React for icons.
- Custom CSS for visual effects.
- SVG for original graphic assets.
- React Three Fiber and Three.js only if they add a real visual improvement and keep performance excellent.
- GSAP is optional. If used, follow `gsap-core` and `gsap-performance`.

## Planned structure

```text
app/
  layout.tsx
  page.tsx
  globals.css
  proyectos/
    [slug]/
      page.tsx

components/
  layout/
    Navbar.tsx
    Footer.tsx

  sections/
    Hero.tsx
    Projects.tsx
    Skills.tsx
    Tools.tsx
    Abilities.tsx
    About.tsx
    Process.tsx
    Contact.tsx

  ui/
    Button.tsx
    ProjectCard.tsx
    SectionHeading.tsx
    AnimatedReveal.tsx
    FluidArtwork.tsx

data/
  projects.ts
  skills.ts
  site-config.ts

public/
  images/
  artwork/
```

## Navigation

Menu items, in order:

1. Inicio
2. Proyectos
3. Skills
4. Habilidades
5. Sobre mí
6. Contacto

Requirements:

- Sticky navbar with a subtly translucent background.
- Animated indicator for the active section.
- Smooth transitions when navigating.
- Accessible mobile navigation.
- Clear hover and focus states.
- Working internal links.
- Respect `prefers-reduced-motion`.

## Skills

Local copies of the skills live in `skills/` and are linked into `.claude/skills/`. Use a skill only for the phase it covers, and read only the ones relevant to the current task. If a skill conflicts with this file, this file wins.

| Phase | Skill |
| --- | --- |
| Artistic direction, visual concept, typography | `frontend-design` |
| UX, responsive layout, accessibility, interaction | `ui-ux-pro-max` |
| Component implementation and interface behavior | `frontend-ui-engineering` |
| Interaction refinement and micro-animations | `emil-design-eng` |
| New copy in Spanish and English | `copywriting` |
| Editing existing copy | `copy-editing` |
| Technical and on-page SEO, metadata, indexing, sitemap | `seo` |
| Performance and Core Web Vitals | `performance-optimization` |
| Clarity of modified code | `code-simplification` |
| Final quality and regression review | `code-review-and-quality` |
| Installation, scripts and deployment automation (when relevant) | `ci-cd-and-automation` |
| GSAP, if used | `gsap-core`, `gsap-performance` |

The `ui-ux-pro-max` examples point to a global path; use the local script instead:

```sh
python3 skills/ui-ux-pro-max/scripts/search.py "developer portfolio minimal" --design-system -p "Portfolio"
```

## Rules

- Only apply skill guidance that fits a static-leaning portfolio. Examples about databases, authentication or specific hosting do not set this project's stack.
- Do not drive Chrome or run browser automation through Chrome without explicit authorization for the current task.
- Skills do not authorize publishing or changes to external accounts.
- Respect the owner's decisions over any skill suggestion.
