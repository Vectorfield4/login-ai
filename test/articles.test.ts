import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { bannedChars, bannedPhrase, bannedWords, type Lang } from "./copyRules";
import { wordCount } from "./words";

/**
 * Deterministic gate for the article markdown in `articles/`. The dictionary
 * guards (`copy-guards.test.ts`, `prose-quality.test.ts`) never read these
 * files, so before this suite a short or sloppy article shipped unchecked.
 *
 * Covered: frontmatter completeness, the RU genre floor, the EN mirror floor
 * (when an `.en.md` pair exists), the banned lexicon and EN typography. Not
 * covered here: semantic quality (marketing fluff, argument), the two-reader
 * test and AEO. Those belong to `prose-critic`, the primary editorial gate.
 */

const ARTICLES_DIR = join(process.cwd(), "articles");

/** Lower bound of the RU volume table in `SKILL.md` and the content plan. */
const GENRE_RU_FLOOR: Record<string, number> = {
  product: 600,
  research: 900,
  technical: 1000,
  "case-study": 900,
  corporate: 600,
  industry: 900,
  media: 500,
  community: 500,
};

const EN_MIN_RATIO = 0.9;

/**
 * Live articles written before the genre floors existed. Their `category` is
 * set for the site, but the RU floor is not retroactive: bringing them up to
 * length is separate content work. The suite fails if a listed slug already
 * reaches its floor, so the list cannot go stale.
 */
const GRANDFATHERED_FLOOR = new Set([
  "ai-agents-support-autonomy",
  "computer-vision-line-review",
  "conversational-bi-architecture",
  "deterministic-rag-infrastructure",
  "reviews-tone-monitoring",
]);

interface ArticleFile {
  file: string;
  lang: Lang;
  text: string;
  body: string;
  category?: string;
}

function frontmatter(text: string): string {
  return /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? "";
}

function readCategory(text: string): string | undefined {
  const value = /^category:\s*(.+)$/m.exec(frontmatter(text))?.[1]?.trim();
  return value || undefined;
}

function readExcerpt(text: string): string | undefined {
  const value = /^excerpt:\s*(.+)$/m.exec(frontmatter(text))?.[1]?.trim();
  return value || undefined;
}

function stripFrontmatter(text: string): string {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---/, "");
}

function loadArticles(): ArticleFile[] {
  return readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".ru.md") || file.endsWith(".en.md"))
    .map((file) => {
      const text = readFileSync(join(ARTICLES_DIR, file), "utf8");
      return {
        file,
        lang: file.endsWith(".en.md") ? "en" : "ru",
        text,
        body: stripFrontmatter(text),
        category: readCategory(text),
      };
    });
}

const ARTICLES = loadArticles();
const RU = ARTICLES.filter((article) => article.lang === "ru");
const EN = ARTICLES.filter((article) => article.lang === "en");

const slugOf = (file: string): string => file.replace(/\.(ru|en)\.md$/, "");

describe("articles: RU volume", () => {
  it("у каждой статьи проставлена категория", () => {
    const missing = ARTICLES.filter((article) => !article.category).map((article) => article.file);
    expect(missing, "нет category: рубрика и объём по жанру не проверяются").toEqual([]);
  });

  it("excerpt проставлен или предупреждает", () => {
    const missing = ARTICLES.filter((article) => !readExcerpt(article.text)).map(
      (article) => article.file,
    );
    if (missing.length) {
      console.warn(`[articles] без excerpt: ${missing.join(", ")}`);
    }
    expect(Array.isArray(missing)).toBe(true);
  });

  it("RU-текст размеченной статьи набирает минимум слов жанра", () => {
    const short = RU.filter(
      (article) =>
        article.category !== undefined &&
        article.category in GENRE_RU_FLOOR &&
        !GRANDFATHERED_FLOOR.has(slugOf(article.file)),
    )
      .map((article) => ({
        file: article.file,
        floor: GENRE_RU_FLOOR[article.category as string],
        words: wordCount(article.body),
      }))
      .filter(({ words, floor }) => words < floor)
      .sort((a, b) => a.words - b.words);
    expect(
      short.map(({ file, words, floor }) => `${file}: ${words}/${floor}`),
      "RU-текст статьи короче нижней границы жанра (write-article/references/genres)",
    ).toEqual([]);
  });

  it("grandfathered-статьи, доросшие до порога, исключены из списка", () => {
    const recovered = [...GRANDFATHERED_FLOOR].filter((slug) => {
      const article = RU.find((entry) => slugOf(entry.file) === slug);
      if (!article?.category) return false;
      const floor = GENRE_RU_FLOOR[article.category];
      return floor !== undefined && wordCount(article.body) >= floor;
    });
    expect(recovered, "уберите из GRANDFATHERED_FLOOR: объём уже достигнут").toEqual([]);
  });
});

describe("articles: EN mirror volume", () => {
  it("EN-пара не короче 90% RU", () => {
    const ruBySlug = new Map(RU.map((article) => [slugOf(article.file), article]));
    const short: Array<{ file: string; en: number; ru: number; ratio: number }> = [];
    for (const en of EN) {
      const ru = ruBySlug.get(slugOf(en.file));
      if (!ru) continue;
      const ruWords = wordCount(ru.body);
      const enWords = wordCount(en.body);
      const ratio = ruWords === 0 ? 1 : enWords / ruWords;
      if (ratio < EN_MIN_RATIO) short.push({ file: en.file, en: enWords, ru: ruWords, ratio });
    }
    short.sort((a, b) => a.ratio - b.ratio);
    expect(
      short.map(
        ({ file, en, ru }) => `${file}: EN ${en} / RU ${ru} = ${Math.round((en / ru) * 100)}%`,
      ),
      "EN-пара короче 90% RU (docs/frontend/news.md)",
    ).toEqual([]);
  });
});

describe("articles: banned lexicon and typography", () => {
  it("в статьях нет запрещённой лексики и конструкций", () => {
    const offenders = ARTICLES.flatMap((article) => {
      const words = bannedWords(article.lang, article.text).map(
        (word) => `${article.file}: "${word}"`,
      );
      const phrase = bannedPhrase(article.lang, article.text);
      return phrase ? [...words, `${article.file}: /${phrase.source}/`] : words;
    });
    expect(
      offenders,
      "запрещённая лексика или конструкция из docs/frontend/prose-quality.md",
    ).toEqual([]);
  });

  it("EN-статьи без длинного тире и кривых кавычек", () => {
    const offenders = EN.flatMap((article) =>
      bannedChars("en", article.text).map((char) => `${article.file}: ${JSON.stringify(char)}`),
    );
    expect(offenders, "EN-типографика: длинное тире или кривые кавычки").toEqual([]);
  });
});
