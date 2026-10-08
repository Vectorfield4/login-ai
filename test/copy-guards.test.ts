import { describe, expect, it } from "vitest";
import { services } from "@/entities/service/model/fixtures";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";
import { bannedPhrase, bannedWords, EN_EM_DASH, EN_QUOTES, type Lang } from "./copyRules";

/**
 * Copy guards over the whole dictionary. `prose-quality.md` lists banned words,
 * phrases and structural tells for marketing text; `test/prose-quality.test.ts`
 * guards only service block items. This file sweeps every user-facing string in
 * RU and EN, so chrome, solutions, cases, news and investors copy is covered too.
 *
 * TDD: rules must fail on the offending copy, then pass after the rewrite.
 *
 * The rules live in `./copyRules`; `articles.test.ts` runs the same rules over
 * the article markdown.
 */

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

function lexiconOffenders(lang: Lang): string[] {
  return leaves(DICTS[lang]).flatMap(([path, value]) =>
    bannedWords(lang, value).map((hit) => `${lang} ${path}: "${value}" [${hit}]`),
  );
}

function phraseOffenders(lang: Lang): string[] {
  return leaves(DICTS[lang]).flatMap(([path, value]) => {
    const hit = bannedPhrase(lang, value);
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
    expect(charOffenders("en", EN_QUOTES, "curly quote")).toEqual([]);
  });

  it("EN строках нет em dash (AI-признак из prose-quality.md, п.8)", () => {
    expect(charOffenders("en", [EN_EM_DASH], "em dash")).toEqual([]);
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
