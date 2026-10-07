import { describe, expect, it } from "vitest";
import { services } from "@/entities/service/model/fixtures";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";

/**
 * Copy guards over the whole dictionary. `prose-quality.md` lists banned words,
 * phrases and structural tells for marketing text; `test/prose-quality.test.ts`
 * guards only service block items. This file sweeps every user-facing string in
 * RU and EN, so chrome, solutions, cases, news and investors copy is covered too.
 *
 * TDD: rules must fail on the offending copy, then pass after the rewrite.
 */

type Lang = "ru" | "en";

const DICTS: Record<Lang, unknown> = { ru: astroDictRu, en: astroDictEn };

/** Every string leaf of a nested dictionary as `[keyPath, value]`. */
function leaves(
  node: unknown,
  prefix = "",
  out: Array<[string, string]> = [],
): Array<[string, string]> {
  if (typeof node === "string") {
    out.push([prefix, node]);
    return out;
  }
  if (Array.isArray(node)) {
    for (const [index, value] of node.entries()) {
      leaves(value, `${prefix}.${index}`, out);
    }
    return out;
  }
  if (node !== null && typeof node === "object") {
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      leaves(value, prefix ? `${prefix}.${key}` : key, out);
    }
  }
  return out;
}

const tokens = (text: string): string[] => text.toLowerCase().match(/\p{L}+/gu) ?? [];

/**
 * «Banned lexical tells» tables from `prose-quality.md`. Matching is by stem so
 * case and Russian endings ("уникальный" / "уникальной") both trip. `передов`
 * never matches the standalone preposition "перед".
 */
const BANNED_STEMS: Record<Lang, readonly string[]> = {
  ru: [
    "инновационн",
    "передов",
    "комплексн",
    "перспективн",
    "универсальн",
    "уникальн",
    "революционн",
    "прорывн",
    "экосистем",
    "синерг",
    "холистич",
  ],
  en: [
    "leverage",
    "robust",
    "seamless",
    "navigat",
    "delve",
    "embark",
    "unveil",
    "truly",
    "deeply",
    "fundamental",
    "utiliz",
    "utilis",
    "facilitat",
    "subsequent",
    "commence",
    "terminat",
    "furthermore",
    "moreover",
    "consequently",
  ],
};

/** Superficial `-ing` phrases banned as a construction. */
const ING_TELLS = ["ensuring", "highlighting", "showcasing", "fostering", "reflecting"];

/**
 * Banned constructions from the tables in `prose-quality.md`. The `not just X,
 * but Y` tell is a pattern, not the bare phrase: a plain trailing "not just" is
 * idiomatic and stays. The rest are literal substrings.
 */
const BANNED_PATTERNS: Record<Lang, readonly RegExp[]> = {
  en: [
    /\bnot just\b[^.]{0,60}\bbut\b/i,
    /\bnot only\b[^.]{0,60}\bbut\b/i,
    /\bmore than just\b/i,
    /\bunlock the\b/i,
    /\bnext level\b/i,
    /\bin today's\b/i,
    /\bin a world where\b/i,
    /\bgame[- ]changer\b/i,
    /\bcutting[- ]edge\b/i,
    /\bat the end of the day\b/i,
    /\bit goes without saying\b/i,
    /\bwhether you're\b/i,
    /\bbest[- ]in[- ]class\b/i,
  ],
  ru: [
    /не просто[^.]{0,60}\sа\s/iu,
    /раскрыть потенциал/iu,
    /вывести на новый уровень/iu,
    /в мире, где/iu,
    /в эпоху/iu,
    /эксперты считают/iu,
    /исследования показывают/iu,
    /качественно новый уровень/iu,
  ],
};

function lexiconOffenders(lang: Lang): string[] {
  const stems = BANNED_STEMS[lang];
  const ing = lang === "en" ? ING_TELLS : [];
  return leaves(DICTS[lang]).flatMap(([path, value]) => {
    const hits = tokens(value).filter(
      (word) => stems.some((stem) => word.startsWith(stem)) || ing.includes(word),
    );
    return hits.map((hit) => `${lang} ${path}: "${value}" [${hit}]`);
  });
}

function phraseOffenders(lang: Lang): string[] {
  const patterns = BANNED_PATTERNS[lang];
  return leaves(DICTS[lang]).flatMap(([path, value]) => {
    const hit = patterns.find((pattern) => pattern.test(value));
    return hit ? [`${lang} ${path}: "${value}" [${hit.source}]`] : [];
  });
}

function charOffenders(lang: Lang, chars: readonly string[], label: string): string[] {
  return leaves(DICTS[lang]).flatMap(([path, value]) => {
    const found = chars.filter((char) => value.includes(char));
    return found.length ? [`${lang} ${path} (${label}): "${value}"`] : [];
  });
}

describe("copy guards: banned lexicon", () => {
  it("RU и EN тексты без запрещённых слов из prose-quality.md", () => {
    expect(
      [...lexiconOffenders("ru"), ...lexiconOffenders("en")],
      "запрещённая лексика: назови технологию, результат или метрику",
    ).toEqual([]);
  });
});

describe("copy guards: banned phrases", () => {
  it("RU и EN тексты без запрещённых конструкций", () => {
    expect(
      [...phraseOffenders("ru"), ...phraseOffenders("en")],
      "запрещённые фразы: сформулируй утверждение прямо",
    ).toEqual([]);
  });
});

describe("copy guards: EN typography", () => {
  it("EN строках нет кривых кавычек", () => {
    expect(charOffenders("en", ["\u201c", "\u201d", "\u2018", "\u2019"], "curly quote")).toEqual(
      [],
    );
  });

  it("EN строках нет em dash (AI-признак из prose-quality.md, п.8)", () => {
    expect(charOffenders("en", ["\u2014"], "em dash")).toEqual([]);
  });
});

/**
 * Soft floor: a published service should back its claims with a number. Warn
 * only; hard-requiring a digit per service would push writers to invent one.
 */
function digitlessServices(): string[] {
  const t = (node: unknown): string =>
    leaves(node)
      .map(([, value]) => value)
      .join(" ");
  const servicesDict = (astroDictRu as unknown as { services: Record<string, unknown> }).services;
  return services
    .filter((service) => service.draft !== true)
    .filter((service) => {
      const values = t(servicesDict[service.slug]);
      return !/\d/.test(values);
    })
    .map((service) => service.slug);
}

describe("copy guards: evidence (soft)", () => {
  it("публикуемая услуга несёт хотя бы одно число (warning)", () => {
    const short = digitlessServices();
    if (short.length) {
      console.warn(`[copy] услуги без чисел в тексте: ${short.join(", ")}`);
    }
    expect(Array.isArray(short)).toBe(true);
  });
});
