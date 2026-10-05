import type { ImageMetadata } from "astro";

/**
 * Diagram manifest for the mechanism block.
 *
 * Convention: a generated file named
 * `<serviceSlug>.<diagramSlug>.<lang>.svg`, plus a `.dark.svg` sibling, under
 * `src/shared/assets/images/diagrams/`. The pages render them as static images,
 * so Mermaid never reaches the browser.
 *
 * Sources live in `src/shared/assets/diagrams/<...>.mmd` and are rendered by
 * `npm run diagrams` (see `scripts/generate-diagrams.mjs`). This module is the
 * only diagram place aware of `ImageMetadata`; entities keep a plain
 * `MechanismItem.diagram` slug (see `src/entities/AGENTS.md`).
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../../shared/assets/images/diagrams/*.svg",
  { eager: true },
);

const images = new Map<string, ImageMetadata>();
for (const [path, module] of Object.entries(modules)) {
  if (!module?.default) continue;
  const file = path.slice(path.lastIndexOf("/") + 1);
  images.set(file.replace(/\.svg$/, ""), module.default);
}

export interface DiagramImages {
  light: ImageMetadata;
  dark: ImageMetadata;
}

/** Light and dark SVG of one diagram; `undefined` — asset missing. */
export function getServiceDiagram(
  serviceSlug: string,
  diagramSlug: string,
  lang: "ru" | "en",
): DiagramImages | undefined {
  const base = `${serviceSlug}.${diagramSlug}.${lang}`;
  const light = images.get(base);
  const dark = images.get(`${base}.dark`);
  return light && dark ? { light, dark } : undefined;
}
