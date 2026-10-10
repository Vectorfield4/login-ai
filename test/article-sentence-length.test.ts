import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Sentence-length gate for every article in `articles/`. A reader loses the
 * thread past a certain clause count, so RU sentences stay at or under 28 words
 * and EN sentences at or under 32. Frontmatter, headings, table rows and list
 * items are not prose and are skipped. The sentence splitter ignores decimals
 * and the common abbreviations below.
 */

const ARTICLES_DIR = join(process.cwd(), "articles");
const RU_MAX_WORDS = 28;
const EN_MAX_WORDS = 32;

const ABBREVIATIONS = /(?:\bи т\.д\.|\bт\.е\.|\bт\.к\.|\bдр\.|\bнапр\.|etc\.|e\.g\.|i\.e\.)/i;

function stripFrontmatter(text: string): string {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---/, "").trim();
}

function cleanInline(fragment: string): string {
  return fragment
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`[^`]*`/g, "")
    .replace(/[*_]/g, "")
    .trim();
}

function wordCount(fragment: string): number {
  return cleanInline(fragment)
    .split(/\s+/)
    .map((token) => token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

/** Prose paragraphs: no fenced code, headings, table rows or list items. */
function proseParagraphs(body: string): string[] {
  return body
    .replace(/```[\s\S]*?```/g, "")
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => {
      if (block.startsWith("#") || block.startsWith("|")) return false;
      return !/^([-*+]|\d+\.)\s/.test(block);
    });
}

/** Sentences of one paragraph, decimals and abbreviations kept whole. */
function sentencesOf(paragraph: string): string[] {
  const text = cleanInline(paragraph).replace(/\s+/g, " ").trim();
  if (!text) return [];
  const out: string[] = [];
  let buffer = "";
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    buffer += char;
    if (!".!?…".includes(char)) continue;
    const previous = text[index - 1] ?? "";
    const next = text[index + 1] ?? "";
    if (char === "." && /\d/.test(previous) && /\d/.test(next)) continue;
    if (ABBREVIATIONS.test(buffer.trim())) continue;
    while (index + 1 < text.length && /[\s"»)]/.test(text[index + 1])) {
      buffer += text[index + 1];
      index += 1;
    }
    out.push(buffer.trim());
    buffer = "";
  }
  if (buffer.trim()) out.push(buffer.trim());
  return out.filter((sentence) => /[\p{L}\p{N}]/u.test(sentence));
}

interface ArticleFile {
  file: string;
  lang: "ru" | "en";
  sentences: string[];
}

function loadArticles(): ArticleFile[] {
  return readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".ru.md") || file.endsWith(".en.md"))
    .map((file) => {
      const body = stripFrontmatter(readFileSync(join(ARTICLES_DIR, file), "utf8"));
      return {
        file,
        lang: file.endsWith(".en.md") ? "en" : "ru",
        sentences: proseParagraphs(body).flatMap(sentencesOf),
      };
    });
}

const ARTICLES = loadArticles();
const RU = ARTICLES.filter((article) => article.lang === "ru");
const EN = ARTICLES.filter((article) => article.lang === "en");

function longSentences(articles: ArticleFile[], max: number): string[] {
  return articles.flatMap((article) =>
    article.sentences
      .map((sentence) => ({ sentence, words: wordCount(sentence) }))
      .filter(({ words }) => words > max)
      .map(({ sentence, words }) => `${article.file}: ${words} words — ${sentence}`),
  );
}

describe("articles: sentence length", () => {
  it("RU text contains zero sentences exceeding 28 words", () => {
    expect(longSentences(RU, RU_MAX_WORDS), "RU sentence exceeds 28 words").toEqual([]);
  });

  it("EN text contains zero sentences exceeding 32 words", () => {
    expect(longSentences(EN, EN_MAX_WORDS), "EN sentence exceeds 32 words").toEqual([]);
  });
});
