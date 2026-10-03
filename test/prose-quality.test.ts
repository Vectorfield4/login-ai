import { describe, expect, it } from "vitest";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";

/**
 * Prose-quality guard for service taglines: a tagline must state what the
 * service does, not frame it against a counterpart. Both negation ("а не...")
 * and contrast ("... вместо ...") are the AI-slop "not X, but Y" pattern from
 * `docs/frontend/prose-quality.md`; rewrite as a single positive claim.
 */

type Lang = "ru" | "en";

const DICTS = { ru: astroDictRu, en: astroDictEn } as const;

/** Standalone negation words per language. Whole-token match, so words that
 *  merely contain "не" ("нетипичное") do not trip the guard. */
const NEGATION_WORDS: Record<Lang, ReadonlySet<string>> = {
  ru: new Set(["не", "ни", "нет"]),
  en: new Set(["not", "no", "never"]),
};

/** Contrast words that set the tagline against an alternative. */
const CONTRAST_WORDS: Record<Lang, ReadonlySet<string>> = {
  ru: new Set(["вместо"]),
  en: new Set(["instead"]),
};

function tokens(text: string): string[] {
  return text.toLowerCase().match(/\p{L}+(?:['’]t)?/gu) ?? [];
}

function isBanned(word: string, lang: Lang): boolean {
  if (NEGATION_WORDS[lang].has(word) || CONTRAST_WORDS[lang].has(word)) return true;
  return lang === "en" && (word.endsWith("n't") || word.endsWith("n’t"));
}

describe("prose quality: service taglines", () => {
  it("a service tagline has no negation or contrast framing in any language", () => {
    const offenders: string[] = [];
    for (const lang of ["ru", "en"] as const) {
      for (const [slug, entry] of Object.entries(DICTS[lang].services)) {
        const tagline = entry.tagline;
        expect(tagline, `${lang} services.${slug}.tagline is empty`).toBeTruthy();
        if (tokens(tagline).some((word) => isBanned(word, lang))) {
          offenders.push(`${lang} services.${slug}.tagline: "${tagline}"`);
        }
      }
    }
    expect(offenders, "taglines with negation or contrast read as AI slop").toEqual([]);
  });
});
