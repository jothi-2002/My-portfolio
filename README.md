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
  shared/        layer.ts (stack-layer colours) · icons.ts (inline SVG icon paths, typed names)
                 ui/ reusable primitives: Icon, SectionHeader, LayerBadge, TechChips, FormField,
                 ArchitectureDiagram, Reveal directive
  utils/         Pure helpers (form validation, URL builders, count-up, reduced-motion) + specs
src/styles.css   Design tokens (`@theme`), light/dark palettes, shared classes (.card, .btn-*, .chip, ...)
```

## Editing content

Everything shown on the page comes from `src/app/data/portfolio.data.ts`. Add a project by appending to `projects`
(include a `caseStudy` to get the challenge / approach / outcomes / architecture layout).

## Design system

- Colours are semantic tokens (`bg-canvas`, `text-ink`, `text-soft`, `border-line`, `text-brand`) that switch with the `.dark` class, so components need no `dark:` variants.
- Each part of the stack has a colour: Frontend `ui`, Backend `api`, Database `data`, Security `security`, Delivery `ops`, Full stack `core`. These are used consistently across skills, experience highlights and the architecture diagram.
- Motion is progressive enhancement: scroll-reveal never hides content on the server or without JS, and everything respects `prefers-reduced-motion`.

## Performance and SEO notes

- Icons are inline SVG (`shared/icons.ts`), so there is no icon-font request or flash of ligature text. To add one, copy its path data from [Material Icons](https://github.com/marella/material-design-icons) into `ICON_PATHS`.
- All sections are in the prerendered HTML. Below-the-fold sections use `@defer (hydrate on viewport)` (incremental hydration), so their JavaScript loads only when scrolled to.
- Critical-CSS inlining is off for production (`angular.json`): with a ~7 kB gzipped stylesheet, a blocking `<link>` avoids a layout shift on first paint.
- `public/assets/resume.pdf` is the file behind "Download Resume". Replace it whenever the resume changes.
- `public/og-image.png` is the social preview. Before deploying, make the `og:image` / `twitter:image` URLs in `src/index.html` absolute (and add a canonical link) once the final domain is known.
