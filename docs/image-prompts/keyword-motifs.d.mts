/** Keyword → motif enhancer dictionary for the cover/backdrop builder. */

export const KEYWORD_MOTIFS: Record<string, string>;

/** Motif for one keyword, or `undefined` when the keyword is unknown. */
export function keywordMotif(keyword: string): string | undefined;

/** Motifs for a keyword list: unknown dropped, duplicates collapsed, capped. */
export function resolveKeywordMotifs(keywords: string[], limit?: number): string[];

/** Every keyword the dictionary can name. */
export function knownKeywords(): string[];
