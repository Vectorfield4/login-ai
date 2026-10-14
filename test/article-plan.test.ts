import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  type ContentPlanEntry,
  type ContentPlanFile,
  PLAN_PERSONA_FILES,
} from "../content/plan/contract";

/**
 * Join between the calendar (`content/plan/*.json`) and the articles that name
 * their row through the frontmatter bridge (`src/content.config.ts`). An
 * article without the bridge (a legacy live page) is exempt, like
 * `GRANDFATHERED_FLOOR` in `articles.test.ts`; the bridge is opt-in per slug.
 *
 * Covered: the mapping count, row agreement on `number`/`funnel`/`persona`,
 * the AEO window (the target query lands in the head) and that a `pillar`
 * resolves to a row. The hub/spoke graph reciprocity stays in
 * `test/content-plan.test.ts`.
 */

const ARTICLES_DIR = join(process.cwd(), "articles");
const PLAN_DIR = join(process.cwd(), "content/plan");
const AEO_WINDOW = 300;

function frontmatter(text: string): string {
  return /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? "";
}

function stripFrontmatter(text: string): string {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---/, "");
}

/** One scalar frontmatter field, quotes stripped. */
function fmValue(fm: string, key: string): string | undefined {
  const raw = new RegExp(`^${key}:\\s*(.+)$`, "m").exec(fm)?.[1]?.trim();
  if (!raw) return undefined;
  return raw.replace(/^["']|["']$/g, "");
}

const PLAN_ENTRIES: ContentPlanEntry[] = Object.values(PLAN_PERSONA_FILES).flatMap((file) => {
  const plan = JSON.parse(readFileSync(join(PLAN_DIR, file), "utf8")) as ContentPlanFile;
  return plan.entries;
});

const ENTRY_BY_SLUG = new Map(PLAN_ENTRIES.map((entry) => [entry.slug, entry]));

interface BridgeArticle {
  file: string;
  slug: string;
  draft: boolean;
  planNumber?: number;
  funnel?: string;
  persona?: string;
  pillar?: string;
  targetQuery?: string;
  title: string;
  excerpt?: string;
  head: string;
}

const ARTICLES: BridgeArticle[] = readdirSync(ARTICLES_DIR)
  .filter((file) => file.endsWith(".ru.md"))
  .map((file) => {
    const text = readFileSync(join(ARTICLES_DIR, file), "utf8");
    const fm = frontmatter(text);
    const number = Number(fmValue(fm, "planNumber"));
    return {
      file,
      slug: file.replace(/\.ru\.md$/, ""),
      draft: fmValue(fm, "draft") !== "false",
      planNumber: Number.isFinite(number) ? number : undefined,
      funnel: fmValue(fm, "funnel"),
      persona: fmValue(fm, "persona"),
      pillar: fmValue(fm, "pillar"),
      targetQuery: fmValue(fm, "targetQuery"),
      title: fmValue(fm, "title") ?? "",
      excerpt: fmValue(fm, "excerpt"),
      head: stripFrontmatter(text).trim().slice(0, AEO_WINDOW),
    };
  });

const MAPPED = ARTICLES.filter((article) => article.planNumber !== undefined);

describe("article ↔ plan bridge", () => {
  it("bridge-поля есть хотя бы у одной опубликованной статьи", () => {
    const published = MAPPED.filter((article) => !article.draft).map((article) => article.slug);
    expect(
      published,
      "проставьте planNumber/funnel/persona хотя бы одной опубликованной статье",
    ).not.toEqual([]);
  });

  it("bridge-статья находит свою строку в плане", () => {
    const orphans = MAPPED.filter((article) => !ENTRY_BY_SLUG.has(article.slug)).map(
      (article) => article.file,
    );
    expect(orphans, "slug статьи не встречается в content/plan/*.json").toEqual([]);
  });

  it("number, funnel и persona совпадают со строкой плана", () => {
    const bad: string[] = [];
    for (const article of MAPPED) {
      const row = ENTRY_BY_SLUG.get(article.slug);
      if (!row) continue;
      if (article.planNumber !== row.number) {
        bad.push(`${article.file}: planNumber ${article.planNumber} ≠ строки ${row.number}`);
      }
      if (article.funnel && article.funnel !== row.funnel) {
        bad.push(`${article.file}: funnel ${article.funnel} ≠ строки ${row.funnel}`);
      }
      if (article.persona && article.persona !== row.persona) {
        bad.push(`${article.file}: persona ${article.persona} ≠ строки ${row.persona}`);
      }
    }
    expect(bad, "bridge-поля расходятся с календарём").toEqual([]);
  });

  it("targetQuery входит в заголовок, excerpt или первые 300 знаков", () => {
    const bad = MAPPED.filter((article) => article.targetQuery)
      .filter((article) => {
        const needle = (article.targetQuery ?? "").toLowerCase();
        const hay = `${article.title}\n${article.excerpt ?? ""}\n${article.head}`.toLowerCase();
        return !hay.includes(needle);
      })
      .map((article) => article.file);
    expect(bad, "AEO-окно: targetQuery должен попадать в head статьи").toEqual([]);
  });

  it("pillar разрешается в строку плана", () => {
    const bad = MAPPED.filter(
      (article) => article.pillar && !ENTRY_BY_SLUG.has(article.pillar),
    ).map((article) => `${article.file}: pillar ${article.pillar} не найден`);
    expect(bad, "pillar указывает на слаг вне календаря").toEqual([]);
  });
});
