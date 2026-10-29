import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getSolutions } from "@/entities/solution";

const backdropExtensions = new Set(["png", "jpg", "jpeg", "webp"]);

function solutionBackdropSlugs(): Set<string> {
  const dir = join(process.cwd(), "assets", "images", "solutions");
  const slugs = new Set<string>();
  for (const file of readdirSync(dir)) {
    const dot = file.lastIndexOf(".");
    if (dot <= 0) continue;
    if (!backdropExtensions.has(file.slice(dot + 1).toLowerCase())) continue;
    slugs.add(file.slice(0, dot));
  }
  return slugs;
}

describe("solution backdrops", () => {
  it("у каждой опубликованной решения есть обложка", () => {
    const present = solutionBackdropSlugs();
    const awaiting = getSolutions().filter((s) => !present.has(s.slug));
    expect(
      awaiting.map((s) => s.slug),
      `Решения без обложки:\n${awaiting.map((s) => `  • ${s.slug}`).join("\n")}`,
    ).toEqual([]);
  });
});
