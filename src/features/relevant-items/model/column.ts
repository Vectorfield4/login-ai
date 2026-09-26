import type { EntityRefType } from "@/features/relevant-items/model/entityRef";
import type { RelevantsByType } from "@/features/relevant-items/model/relevants.types";

/**
 * Политика раскладки колонок «связанного». Живёт рядом с колонками
 * (`ui/organisms/`), потому что это их поведение: виджет страницы задаёт
 * только заголовок, лимит и флаг строк, а плотность считается здесь.
 */

/**
 * Порог плотности колонки: два пункта ещё помещаются как карточки, три и
 * больше — только строки. Без порога колонка решений на странице услуги
 * растягивала секцию на весь экран.
 */
export const COMPACT_THRESHOLD = 2;

/**
 * Сколько пунктов показывает колонка строками. Список строк дешевле по
 * высоте, поэтому лимит выше, чем у карточек: третий пункт не должен просто
 * исчезнуть за лимитом карточек.
 */
export const COMPACT_LIMIT = 4;

/** Плотность колонки: строки по требованию виджета или по числу пунктов. */
export function isRowsLayout(count: number, forceRows?: boolean): boolean {
  return forceRows === true || count > COMPACT_THRESHOLD;
}

/** Сколько пунктов колонка отдаёт при выбранной плотности. */
export function columnLimit(limit: number, count: number, forceRows?: boolean): number {
  return isRowsLayout(count, forceRows) ? Math.max(limit, COMPACT_LIMIT) : limit;
}

/**
 * Ссылка «все N …» под усечённой колонкой: в режиме строк часть пунктов не
 * помещается в лимит карточек, и без выхода из блока колонка становится
 * тупиком.
 */
export const ALL_LINKS: Record<EntityRefType, { href: string; labelKey: string }> = {
  service: { href: "/services", labelKey: "ui.menu.allServices" },
  solution: { href: "/solutions", labelKey: "ui.menu.allSolutions" },
  case: { href: "/cases", labelKey: "ui.menu.allCases" },
};

/** Есть ли хоть одна связь: без них вся секция не рендерится. */
export function hasAnyRelation(grouped: RelevantsByType): boolean {
  return grouped.service.length > 0 || grouped.solution.length > 0 || grouped.case.length > 0;
}
