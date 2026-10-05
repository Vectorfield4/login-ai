# Service mechanism diagrams

Sources are Mermaid (`.mmd`), rendered ahead of time to SVG and committed. The
service page renders them as static `<img>`; Mermaid never reaches the browser.

- Naming: `<serviceSlug>.<diagramSlug>.<lang>.mmd`.
- `npm run diagrams` writes two assets per source into
  `src/shared/assets/images/diagrams/`: `<base>.svg` (light) and
  `<base>.dark.svg`. The theme attribute `data-theme` picks one
  (`app/styles/global.css`).
- `app/data/serviceDiagrams.ts` resolves `serviceSlug + diagramSlug + lang` into
  the two `ImageMetadata`; the page maps `.src` into a `DiagramSource`. Entities
  keep only the slug (`MechanismItem.diagram`).

Regeneration needs a headless browser (Puppeteer, shipped with mermaid-cli). If
`npm ci` skipped its download, run `npx puppeteer browsers install chrome` once.
The Astro build never calls Mermaid.
