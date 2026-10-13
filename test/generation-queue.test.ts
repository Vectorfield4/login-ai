import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  KIND_DIRS,
  KINDS,
  type QueueEntry,
  readQueue,
  targetPath,
} from "../scripts/generation-queue.mjs";

/**
 * The generation queue (`content/generation-queue.json`) is the one home for the
 * images still to generate, for all three pipelines. A record means "pending";
 * the image file is its removal trigger.
 *
 * These checks keep the manifest honest: shape, no duplicates, no stale record
 * whose image already exists, and the one hard tie left — a published article
 * must have a cover. An `article` record may precede its draft (covers are
 * queued first, the article is written later), so the queue no longer demands a
 * draft file; a `service` record is still tied to its `draft: true` fixture. A
 * solution record is not a draft gate — solutions ship an SVG hero.
 */

const ROOT = process.cwd();
const ENTRIES: QueueEntry[] = readQueue();
const SERVICE_FIXTURES = join(ROOT, "src/entities/service/model/fixtures");

/** Article `draft` mirrors the schema default: draft unless `false`. */
function articleIsDraft(slug: string): boolean {
  const file = join(ROOT, "articles", `${slug}.ru.md`);
  if (!existsSync(file)) return false;
  const text = readFileSync(file, "utf8");
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? "";
  return /^draft:\s*(true|false)\s*,?\s*$/m.exec(fm)?.[1] !== "false";
}

/** Service `draft` is an explicit line in the fixture. */
function serviceIsDraft(slug: string): boolean {
  const file = join(SERVICE_FIXTURES, `${slug}.ts`);
  if (!existsSync(file)) return false;
  return /draft:\s*true/.test(readFileSync(file, "utf8"));
}

/** Slugs that already have a cover under `assets/images/articles/`. */
function coverSlugs(): Set<string> {
  const slugs = new Set<string>();
  for (const file of readdirSync(join(ROOT, "assets/images/articles"))) {
    const dot = file.lastIndexOf(".");
    if (dot <= 0) continue;
    if (!["png", "jpg", "jpeg", "webp"].includes(file.slice(dot + 1).toLowerCase())) continue;
    slugs.add(file.slice(0, dot));
  }
  return slugs;
}

describe("generation queue", () => {
  it("нет дублей (kind, slug)", () => {
    const seen = new Set<string>();
    const duplicates = ENTRIES.filter((entry) => {
      const key = `${entry.kind}:${entry.slug}`;
      if (seen.has(key)) return true;
      seen.add(key);
      return false;
    }).map((entry) => `${entry.kind}:${entry.slug}`);
    expect(duplicates, "уберите повторные записи из content/generation-queue.json").toEqual([]);
  });

  it("у каждой записи корректная форма", () => {
    const malformed = ENTRIES.filter(
      (entry) =>
        !KINDS.includes(entry.kind) ||
        !/^[a-z0-9-]+$/.test(entry.slug) ||
        typeof entry.title !== "string" ||
        entry.title.trim() === "" ||
        !Array.isArray(entry.keywords) ||
        entry.keywords.length === 0 ||
        entry.keywords.some((keyword) => typeof keyword !== "string" || keyword.trim() === "") ||
        typeof entry.story !== "string",
    ).map((entry) => JSON.stringify(entry));
    expect(malformed, "запись должна нести kind, slug, title, keywords[] и story").toEqual([]);
  });

  it("у pending-записи картинки ещё нет", () => {
    const already = ENTRIES.filter((entry) => existsSync(targetPath(entry.kind, entry.slug))).map(
      (entry) => `${entry.kind}:${entry.slug}`,
    );
    expect(
      already,
      `уберите из очереди те, чья картинка уже лежит в ${KIND_DIRS.article}/…`,
    ).toEqual([]);
  });

  it("каждая услуга в очереди указывает на черновик", () => {
    const notDraft = ENTRIES.filter(
      (entry) => entry.kind === "service" && !serviceIsDraft(entry.slug),
    ).map((entry) => `${entry.kind}:${entry.slug}`);
    expect(notDraft, "в очереди только черновики; опубликованную услугу из неё уберите").toEqual(
      [],
    );
  });

  it("у каждой опубликованной статьи есть обложка", () => {
    const present = coverSlugs();
    const missing = readdirSync(join(ROOT, "articles"))
      .filter((file) => file.endsWith(".ru.md"))
      .map((file) => file.slice(0, -".ru.md".length))
      .filter((slug) => !articleIsDraft(slug) && !present.has(slug));
    expect(
      missing,
      "у опубликованной статьи нет обложки: сгенерируйте её или верните статью в драфт (draft: true)",
    ).toEqual([]);
  });
});
