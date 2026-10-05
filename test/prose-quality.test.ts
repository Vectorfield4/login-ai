import { describe, expect, it } from "vitest";
import { services } from "@/entities/service/model/fixtures";
import { astroDictEn, astroDictRu, astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { backdropSlugs } from "./backdrops";
import { wordCount } from "./words";

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

/**
 * A caveat or a result must read as a full sentence, or the reader has to guess
 * what it means. Volume target for one item text, words over the helper
 * `wordCount` (`test/words.ts`), the same unit as the service page guard.
 */
const ITEM_TEXT_MIN_WORDS = 12;

const ITEM_COLLECTIONS = ["tradeoffs", "outcomes"] as const;

describe("prose quality: service section items", () => {
  it("title, value and text carry no negation or contrast framing in any language", () => {
    const offenders: string[] = [];
    for (const lang of ["ru", "en"] as const) {
      const t = createT(lang, astroDicts);
      for (const service of services) {
        for (const collection of ITEM_COLLECTIONS) {
          for (const [index, item] of (service[collection] ?? []).entries()) {
            for (const field of ["title", "value", "text"] as const) {
              const key = (item as unknown as Record<string, unknown>)[field];
              if (typeof key !== "string") continue;
              const value = t(key);
              if (tokens(value).some((word) => isBanned(word, lang))) {
                offenders.push(
                  `${lang} services.${service.slug}.${collection}.${index}.${field}: "${value}"`,
                );
              }
            }
          }
        }
      }
    }
    expect(offenders, "section items with negation or contrast read as AI slop").toEqual([]);
  });

  it("текст пункта не короче минимального порога", () => {
    const offenders: string[] = [];
    for (const lang of ["ru", "en"] as const) {
      const t = createT(lang, astroDicts);
      for (const service of services) {
        for (const collection of ITEM_COLLECTIONS) {
          for (const [index, item] of (service[collection] ?? []).entries()) {
            const words = wordCount(t(item.text));
            if (words < ITEM_TEXT_MIN_WORDS) {
              offenders.push(
                `${lang} services.${service.slug}.${collection}.${index}.text: ${words}/${ITEM_TEXT_MIN_WORDS}`,
              );
            }
          }
        }
      }
    }
    expect(offenders, `текст пункта короче ${ITEM_TEXT_MIN_WORDS} слов: смысл теряется`).toEqual(
      [],
    );
  });
});

/**
 * Volume guard for services. The targets live in
 * `docs/frontend/prose-quality.md`: RU minimum per service and an EN mirror of at
 * least 90% of the RU volume. Every text field of the slug's dictionary subtree
 * counts, `sections` and `techStack` included, so the check spans all service
 * components at once.
 *
 * Scope is the set of services that can go live: already published, or draft
 * with the backdrop ready. A draft that still waits for its image is exempt,
 * because there is nothing to publish yet. This makes the guard the twin of the
 * backdrop gate: art ready means copy ready.
 */
const SERVICE_RU_MIN = 700;
const SERVICE_EN_MIN_RATIO = 0.9;

const serviceDict = (lang: "ru" | "en", slug: string): unknown =>
  (DICTS[lang].services as Record<string, unknown>)[slug];

function publishableServices() {
  const withBackdrop = backdropSlugs();
  return services.filter((service) => service.draft !== true || withBackdrop.has(service.slug));
}

describe("prose quality: service volume", () => {
  it("RU-текст каждой публикуемой услуги набирает минимум слов", () => {
    const short = publishableServices()
      .map((service) => ({
        slug: service.slug,
        words: wordCount(serviceDict("ru", service.slug)),
      }))
      .filter(({ words }) => words < SERVICE_RU_MIN)
      .sort((a, b) => a.words - b.words);
    expect(
      short.map(({ slug, words }) => `${slug}: ${words}/${SERVICE_RU_MIN}`),
      `RU-текст публикуемой услуги короче ${SERVICE_RU_MIN} слов (docs/frontend/prose-quality.md)`,
    ).toEqual([]);
  });

  it("EN-текст каждой публикуемой услуги не короче 90% RU", () => {
    const short = publishableServices()
      .map((service) => {
        const ru = wordCount(serviceDict("ru", service.slug));
        const en = wordCount(serviceDict("en", service.slug));
        return { slug: service.slug, ru, en, ratio: en / ru };
      })
      .filter(({ ratio }) => ratio < SERVICE_EN_MIN_RATIO)
      .sort((a, b) => a.ratio - b.ratio);
    expect(
      short.map(
        ({ slug, en, ru }) => `${slug}: EN ${en} / RU ${ru} = ${Math.round((en / ru) * 100)}%`,
      ),
      "EN-текст публикуемой услуги короче 90% RU (docs/frontend/prose-quality.md)",
    ).toEqual([]);
  });
});
