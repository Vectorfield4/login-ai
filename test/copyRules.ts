/**
 * One source for the copy rules in `docs/frontend/prose-quality.md`. Two suites
 * consume it: `copy-guards.test.ts` sweeps the RU/EN dictionaries, and
 * `articles.test.ts` sweeps the article markdown in `articles/`. Splitting the
 * constants out keeps the two gates from drifting.
 */

export type Lang = "ru" | "en";

const tokens = (text: string): string[] => text.toLowerCase().match(/\p{L}+/gu) ?? [];

/**
 * «Banned lexical tells» tables. Matching is by stem so case and Russian
 * endings ("уникальный" / "уникальной") both trip. `передов` never matches the
 * standalone preposition "перед".
 */
export const BANNED_STEMS: Record<Lang, readonly string[]> = {
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
export const ING_TELLS: readonly string[] = [
  "ensuring",
  "highlighting",
  "showcasing",
  "fostering",
  "reflecting",
];

/**
 * Banned constructions. The `not just X, but Y` tell is a pattern, not the bare
 * phrase: a plain trailing "not just" is idiomatic and stays. The rest are
 * literal substrings.
 */
export const BANNED_PATTERNS: Record<Lang, readonly RegExp[]> = {
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

/** EN curly quotes. RU uses «ёлочки»; the guard applies to EN only. */
export const EN_QUOTES: readonly string[] = ["\u201c", "\u201d", "\u2018", "\u2019"];

/** EN em dash. RU typography keeps the dash; the guard applies to EN only. */
export const EN_EM_DASH = "\u2014";

/** Banned word tokens in one language's text. */
export function bannedWords(lang: Lang, text: string): string[] {
  const stems = BANNED_STEMS[lang];
  const ing = lang === "en" ? ING_TELLS : [];
  return tokens(text).filter(
    (word) => stems.some((stem) => word.startsWith(stem)) || ing.includes(word),
  );
}

/** First banned construction in the text, if any. */
export function bannedPhrase(lang: Lang, text: string): RegExp | undefined {
  return BANNED_PATTERNS[lang].find((pattern) => pattern.test(text));
}

/** Banned characters present in the text. Non-EN languages return nothing. */
export function bannedChars(lang: Lang, text: string): string[] {
  if (lang !== "en") return [];
  return [...EN_QUOTES, EN_EM_DASH].filter((char) => text.includes(char));
}
