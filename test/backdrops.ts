import { readdirSync } from "node:fs";
import { join } from "node:path";

/** Extensions accepted as a service backdrop, in `png` preference order. */
const backdropExtensions = new Set(["png", "jpg", "jpeg", "webp"]);

/**
 * Slugs that already have a backdrop under
 * `src/shared/assets/images/services/`. A service with a backdrop can go live,
 * so the copy gate applies to it; a service without one waits as a draft.
 * Shared by the backdrop gate (`awaiting-generation.test.ts`) and the volume
 * gate (`prose-quality.test.ts`).
 */
export function backdropSlugs(): Set<string> {
  const dir = join(process.cwd(), "src/shared/assets/images/services");
  const slugs = new Set<string>();
  for (const file of readdirSync(dir)) {
    const dot = file.lastIndexOf(".");
    if (dot <= 0) continue;
    if (!backdropExtensions.has(file.slice(dot + 1).toLowerCase())) continue;
    slugs.add(file.slice(0, dot));
  }
  return slugs;
}
