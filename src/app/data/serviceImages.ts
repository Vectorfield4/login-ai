import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { ImageSource } from "@/shared/types/content";

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
 * Astro type (see `src/entities/AGENTS.md`); pages pass `getServiceImage(slug)`
 * to `og:image`/the hero, and `getServiceCover(slug)` yields the optimized
 * `ImageSource` an island can carry.
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

/**
 * Widths for the home picker visual. The 16:9 box is at most ~800 CSS px on
 * desktop (`Container` 1120 minus padding, `Grid` 9/12) and full width on
 * phones; DPR2 desktop wants ~1600, so the 1200 candidate (the source width)
 * is the ceiling and the browser upscales from there.
 */
const coverWidths = [640, 960, 1200] as const;

const coverCache = new Map<string, Promise<ImageSource>>();

/**
 * Optimized cover for the home services picker: WebP variants plus `srcSet`.
 * The picker is an island, so it cannot carry `ImageMetadata` — this maps the
 * backdrop into a plain `ImageSource` the widget can serialize. Rendering the
 * raw PNG (1.2–1.5 MB) is what made the visual take seconds and made every tab
 * switch look stuck while the next full-size file downloaded.
 */
export function getServiceCover(slug?: string): Promise<ImageSource | undefined> {
  if (!slug) return Promise.resolve(undefined);
  const image = getServiceImage(slug);
  if (!image) return Promise.resolve(undefined);
  const cached = coverCache.get(image.src);
  if (cached) return cached;
  const pending = buildServiceCover(image);
  coverCache.set(image.src, pending);
  return pending;
}

async function buildServiceCover(image: ImageMetadata): Promise<ImageSource> {
  const variants = await Promise.all(
    coverWidths
      .filter((width) => width <= image.width)
      .map(async (width) => {
        const { src } = await getImage({ src: image, width, format: "webp", quality: 72 });
        return { src, width };
      }),
  );
  // Source narrower than every candidate — serve it as is, without a srcSet.
  const list = variants.length > 0 ? variants : [{ src: image.src, width: image.width }];
  const largest = list[list.length - 1];
  return {
    src: largest.src,
    srcSet: list.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
    sizes: "(min-width: 900px) 800px, 100vw",
  };
}
