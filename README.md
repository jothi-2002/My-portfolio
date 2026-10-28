# Jothi MuthuKamaraj – Portfolio

Single-page portfolio built with Angular 21 (standalone components, signals, zoneless, SSR/prerender) and Tailwind CSS 4.

```bash
npm install
npm run dev      # dev server on :3000
npm run build    # production build + prerender
npm test         # Vitest unit tests
npm run lint
```

## Structure

```
src/app/
  core/          ThemeService (dark/light), SectionNavService (scroll-spy + smooth scroll)
  data/          portfolio.data.ts (all content) · portfolio.models.ts (types)
  layout/        Navbar, Footer
  sections/      Hero, About (story), Skills, Experience, Impact, Projects (case study), Education, Contact
  shared/        layer.ts (stack-layer colours) · ui/ reusable primitives:
                 SectionHeader, LayerBadge, TechChips, FormField, ArchitectureDiagram, Reveal directive
  utils/         Pure helpers (form validation, URL builders, count-up) + specs
src/styles.css   Design tokens (`@theme`), light/dark palettes, shared classes (.card, .btn-*, .chip, ...)
```

## Editing content

Everything shown on the page comes from `src/app/data/portfolio.data.ts`. Add a project by appending to `projects`
(include a `caseStudy` to get the challenge / approach / outcomes / architecture layout).

## Design system

- Colours are semantic tokens (`bg-canvas`, `text-ink`, `text-soft`, `border-line`, `text-brand`) that switch with the `.dark` class, so components need no `dark:` variants.
- Each part of the stack has a colour: Frontend `ui`, Backend `api`, Database `data`, Security `security`, Delivery `ops`, Full stack `core`. These are used consistently across skills, experience highlights and the architecture diagram.
- Motion is progressive enhancement: scroll-reveal never hides content on the server or without JS, and everything respects `prefers-reduced-motion`.
