import { describe, expect, it } from "vitest";
import { solutions } from "@/entities/solution/model/fixtures";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";
import { wordCount } from "./words";

/**
 * Volume guard for solutions, the row `prose-quality.md` left as a writing
 * target. Same ruler as services: RU minimum per solution, EN mirrors at least
 * 90% of the RU volume. The service prose guard lives in
 * `test/services/prose-quality.test.ts`.
 */

type Lang = "ru" | "en";

const DICTS = { ru: astroDictRu, en: astroDictEn } as const;

const SOLUTION_RU_MIN = 1000;
const SOLUTION_EN_MIN_RATIO = 0.9;

const solutionDict = (lang: Lang, slug: string): unknown =>
  (DICTS[lang].solutions as Record<string, unknown>)[slug];

const publishedSolutions = () => solutions.filter((solution) => solution.draft !== true);

describe("prose quality: solution volume", () => {
  it("RU-текст каждого решения набирает минимум слов", () => {
    const short = publishedSolutions()
      .map((solution) => ({
        slug: solution.slug,
        words: wordCount(solutionDict("ru", solution.slug)),
      }))
      .filter(({ words }) => words < SOLUTION_RU_MIN)
      .sort((a, b) => a.words - b.words);
    expect(
      short.map(({ slug, words }) => `${slug}: ${words}/${SOLUTION_RU_MIN}`),
      `RU-текст решения короче ${SOLUTION_RU_MIN} слов (docs/frontend/prose-quality.md)`,
    ).toEqual([]);
  });

  it("EN-текст каждого решения не короче 90% RU", () => {
    const short = publishedSolutions()
      .map((solution) => {
        const ru = wordCount(solutionDict("ru", solution.slug));
        const en = wordCount(solutionDict("en", solution.slug));
        return { slug: solution.slug, ru, en, ratio: en / ru };
      })
      .filter(({ ratio }) => ratio < SOLUTION_EN_MIN_RATIO)
      .sort((a, b) => a.ratio - b.ratio);
    expect(
      short.map(
        ({ slug, en, ru }) => `${slug}: EN ${en} / RU ${ru} = ${Math.round((en / ru) * 100)}%`,
      ),
      "EN-текст решения короче 90% RU (docs/frontend/prose-quality.md)",
    ).toEqual([]);
  });
});
