import type { ImageMetadata } from "astro";

/**
 * Service backdrop manifest.
 *
 * Convention: a file named after the service slug under
 * `src/shared/assets/images/services/` — `software-development.png` backdrops
 * `software-development`. Nothing else changes: the backdrop is picked up by
 * the "file is named after the slug" rule below. One image serves every
 * surface — the home services block, the service hero, and `og:image`.
 *
 * `import.meta.glob` with `eager` is build-time static analysis: every matching
 * file becomes a regular import and passes through Astro's asset plugin, so
 * `default` is `ImageMetadata`. This module is the only place aware of
 * `ImageMetadata` for services — entities keep `image?: string` and forbid the
 * Astro type (see `src/entities/AGENTS.md`); pages map `getServiceImage(slug)`
 * into the plain `ImageSource` an island can carry.
 */
const backdropExtensions = ["png", "jpg", "jpeg", "webp"] as const;

const backdropModules = import.meta.glob<{ default: ImageMetadata }>(
  "../../shared/assets/images/services/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

/** Slug → backdrop; when several extensions exist the higher-priority one wins. */
const backdropImages = new Map<string, { image: ImageMetadata; rank: number }>();

for (const [path, module] of Object.entries(backdropModules)) {
  const file = path.slice(path.lastIndexOf("/") + 1);
  const dot = file.lastIndexOf(".");
  if (dot <= 0) continue;
  const slug = file.slice(0, dot);
  const rank = backdropExtensions.indexOf(
    file.slice(dot + 1).toLowerCase() as (typeof backdropExtensions)[number],
  );
  const image = module?.default;
  if (rank === -1 || !image) continue;
  const current = backdropImages.get(slug);
  if (!current || rank < current.rank) backdropImages.set(slug, { image, rank });
}

/** Backdrop of a service by slug; `undefined` — no file, the surfaces fall back. */
export function getServiceImage(slug?: string): ImageMetadata | undefined {
  return slug ? backdropImages.get(slug)?.image : undefined;
}
