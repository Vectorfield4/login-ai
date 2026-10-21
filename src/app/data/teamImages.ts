import type { ImageMetadata } from "astro";

/**
 * Team photo manifest.
 *
 * Convention: a portrait named after the person's slug under
 * `assets/images/team/` — `filipp-kuksov.jpg` belongs to `filipp-kuksov`.
 * `import.meta.glob` with `eager` turns every matching file into a static
 * import through Astro's asset plugin, so `default` is `ImageMetadata` and the
 * page can render it with `<Image>` (WebP variants plus `srcSet`) instead of
 * shipping the source JPEG as is.
 */
const photoExtensions = ["png", "jpg", "jpeg", "webp"] as const;

const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  "../../../assets/images/team/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

/** Slug → portrait; when several extensions exist the higher-priority one wins. */
const photos = new Map<string, { image: ImageMetadata; rank: number }>();

for (const [path, module] of Object.entries(photoModules)) {
  const file = path.slice(path.lastIndexOf("/") + 1);
  const dot = file.lastIndexOf(".");
  if (dot <= 0) continue;
  const slug = file.slice(0, dot);
  const rank = photoExtensions.indexOf(
    file.slice(dot + 1).toLowerCase() as (typeof photoExtensions)[number],
  );
  const image = module?.default;
  if (rank === -1 || !image) continue;
  const current = photos.get(slug);
  if (!current || rank < current.rank) photos.set(slug, { image, rank });
}

/** Portrait of a team member by slug; `undefined` — no file, the card falls back. */
export function getTeamPhoto(slug?: string): ImageMetadata | undefined {
  return slug ? photos.get(slug)?.image : undefined;
}
