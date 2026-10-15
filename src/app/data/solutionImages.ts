import type { ImageMetadata } from "astro";
import agenticSystemsImage from "../../../assets/images/solutions/agentic-systems.svg";
import appDevelopmentSystemsImage from "../../../assets/images/solutions/app-development-systems.svg";
import computerVisionImage from "../../../assets/images/solutions/computer-vision.svg";
import contentGenerationImage from "../../../assets/images/solutions/content-generation.svg";
import customerExperienceImage from "../../../assets/images/solutions/customer-experience.svg";
import manufacturersImage from "../../../assets/images/solutions/manufacturers.svg";
import medicalClinicsImage from "../../../assets/images/solutions/medical-clinics.svg";
import reputationManagementImage from "../../../assets/images/solutions/reputation-management.svg";

/**
 * Solution asset manifest. The only layer aware of `ImageMetadata`: entities
 * keep `image?: string`, and pages map the metadata here in their frontmatter
 * (`image.src` for cards, the metadata itself for og:image via `getImage`).
 *
 * A solution ships an SVG hero; a raster backdrop named after the slug
 * (`assets/images/solutions/<slug>.png`) takes precedence once it lands, so a
 * generated cover needs no code change. `import.meta.glob` with `eager` turns
 * every raster into a static import through Astro's asset plugin — the same
 * contract as `serviceImages.ts` — and the SVG import stays the fallback.
 */
const svgImages = {
  "agentic-systems": agenticSystemsImage,
  "app-development-systems": appDevelopmentSystemsImage,
  "computer-vision": computerVisionImage,
  "content-generation": contentGenerationImage,
  "customer-experience": customerExperienceImage,
  manufacturers: manufacturersImage,
  "medical-clinics": medicalClinicsImage,
  "reputation-management": reputationManagementImage,
} satisfies Record<string, ImageMetadata>;

const rasterExtensions = ["png", "jpg", "jpeg", "webp"] as const;

const rasterModules = import.meta.glob<{ default: ImageMetadata }>(
  "../../../assets/images/solutions/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

/** Slug → backdrop; when several extensions exist the higher-priority one wins. */
const rasterImages = new Map<string, { image: ImageMetadata; rank: number }>();

for (const [path, module] of Object.entries(rasterModules)) {
  const file = path.slice(path.lastIndexOf("/") + 1);
  const dot = file.lastIndexOf(".");
  if (dot <= 0) continue;
  const slug = file.slice(0, dot);
  // Preview variants (`<slug>_v2.png`) share the folder but are not solution
  // slugs; keep them out so the manifest keys stay equal to the solution set.
  if (slug.includes("_")) continue;
  const rank = rasterExtensions.indexOf(
    file.slice(dot + 1).toLowerCase() as (typeof rasterExtensions)[number],
  );
  const image = module?.default;
  if (rank === -1 || !image) continue;
  const current = rasterImages.get(slug);
  if (!current || rank < current.rank) rasterImages.set(slug, { image, rank });
}

/** Manifest: every solution slug, a landed raster backdrop preferred over the SVG. */
export const solutionImages: Record<string, ImageMetadata> = {
  ...svgImages,
  ...Object.fromEntries([...rasterImages].map(([slug, { image }]) => [slug, image])),
};

export function getSolutionImage(slug?: string): ImageMetadata | undefined {
  return slug ? solutionImages[slug] : undefined;
}
