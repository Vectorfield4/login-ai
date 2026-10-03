import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { services } from "@/entities/service/model/fixtures";

/**
 * Backdrop gate for services.
 *
 * A service becomes a generated page — menu item, route, sitemap entry, hero
 * and `og:image` — the moment `draft` is not `true`. Such a page without a
 * backdrop under `src/shared/assets/images/services/<slug>.<ext>` ships a
 * placeholder instead of art. The rule: a published service carries a backdrop;
 * a service whose image is not generated yet waits as a draft.
 *
 * The failure message carries the recovery: generate the backdrop, or add the
 * slug to the "Awaiting generation" table in the services README and set
 * `draft: true` on the fixture until the file lands.
 */

const backdropExtensions = new Set(["png", "jpg", "jpeg", "webp"]);

function backdropSlugs(): Set<string> {
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

describe("service backdrops", () => {
  it("у каждой опубликованной услуги есть обложка, иначе услуга ждёт генерации", () => {
    const present = backdropSlugs();
    const awaiting = services.filter(
      (service) => service.draft !== true && !present.has(service.slug),
    );
    const detail = awaiting
      .map(
        (service) =>
          `  • ${service.slug}: нет src/shared/assets/images/services/${service.slug}.png — ` +
          'сгенерируйте обложку или добавьте слаг в таблицу "Awaiting generation"' +
          " (src/shared/assets/images/services/README.md) и поставьте draft: true",
      )
      .join("\n");

    expect(
      awaiting.map((service) => service.slug),
      `Услуги без обложки должны быть черновиками (draft: true):\n${detail}`,
    ).toEqual([]);
  });
});
