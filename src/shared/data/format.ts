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
