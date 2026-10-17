import { formatPriceCompact } from "@/shared/data/format";
import type { AppLang } from "@/shared/hooks/useT";
import type { Range } from "./types";

/**
 * `low – high`, or a single figure when the band collapses. Large sums go
 * compact (`6,96 млн. ₽`) so the result row stays one line on a phone.
 */
export function formatRange(lang: AppLang, range: Range): string {
  const low = formatPriceCompact(lang, range.low);
  return range.low === range.high ? low : `${low} – ${formatPriceCompact(lang, range.high)}`;
}

/** `N wk` or `low–high wk`; `suffix` is the translated unit. */
export function formatWeeks(range: Range, suffix: string): string {
  const span = range.low === range.high ? `${range.low}` : `${range.low}–${range.high}`;
  return `${span} ${suffix}`;
}
