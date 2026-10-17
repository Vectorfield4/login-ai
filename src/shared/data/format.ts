import type { AppLang } from "@/shared/hooks/useT";

/**
 * Сумма с разрядами и знаком ₽. Форматирование ручное, а не через
 * `Intl.NumberFormat`: разряды должны совпадать в билде и в тесте, а ICU-локаль
 * ru-RU на CI может откатиться к en-разделителю. RU ставит ₽ после суммы,
 * EN перед ней.
 *
 * Pure and UI-free: the pricing block and the calculator engine both format
 * money through it, and neither may depend on the other.
 */
export function formatPrice(lang: AppLang, amount: number): string {
  const grouped = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, lang === "ru" ? "\u00A0" : ",");
  return lang === "ru" ? `${grouped} ₽` : `₽${grouped}`;
}

/** Compact units, largest first: a million is the smallest one a price uses. */
const COMPACT_UNITS = [
  { limit: 1_000_000_000, divisor: 1_000_000_000, ru: "млрд.", en: "B" },
  { limit: 1_000_000, divisor: 1_000_000, ru: "млн.", en: "M" },
] as const;

/**
 * `2 000 000` as `2 млн. ₽`, `1 450 000` as `1,45 млн. ₽`. Below a million the
 * figure stays exact, so a small estimate never loses precision. Digits are
 * computed by hand for the same ICU reason as `formatPrice`.
 */
export function formatPriceCompact(lang: AppLang, amount: number): string {
  const unit = COMPACT_UNITS.find(({ limit }) => Math.abs(amount) >= limit);
  if (!unit) return formatPrice(lang, amount);
  const scaled = (amount / unit.divisor).toFixed(2).replace(/\.?0+$/, "");
  const value = lang === "ru" ? scaled.replace(".", ",") : scaled;
  return lang === "ru" ? `${value} ${unit.ru} ₽` : `₽${value}${unit.en}`;
}
