/**
 * Кроссейлы — релевантные решения, которые показываются на страницах других
 * решений («Как мы можем вам помочь»). Хранятся централизованно (хранилище),
 * чтобы одни и те же наборы переиспользовались на разных страницах.
 *
 * Ключ группы — slug «источника» (страницы, на которой показываем кроссейлы).
 * У каждого элемента: slug целевого решения (для ссылки и заголовка из
 * `solutions.<slug>.navTitle`) и noteKey — i18n-ключ пояснения «чем поможет»
 * из пространства `crossSells.<sourceSlug>.<targetSlug>`.
 */
export interface CrossSellItem {
  slug: string;
  noteKey: string;
}

export interface CrossSellGroup {
  titleKey: string;
  items: CrossSellItem[];
}

export const crossSells: Record<string, CrossSellGroup> = {
  manufacturers: {
    titleKey: "crossSells.title",
    items: [
      {
        slug: "computer-vision",
        noteKey: "crossSells.manufacturers.computer-vision",
      },
      {
        slug: "agentic-systems",
        noteKey: "crossSells.manufacturers.agentic-systems",
      },
      {
        slug: "reputation-management",
        noteKey: "crossSells.manufacturers.reputation-management",
      },
    ],
  },
  "reputation-management": {
    titleKey: "crossSells.title",
    items: [
      {
        slug: "content-generation",
        noteKey: "crossSells.reputation-management.content-generation",
      },
      {
        slug: "customer-experience",
        noteKey: "crossSells.reputation-management.customer-experience",
      },
    ],
  },
};

/** Группа кроссейлов для страницы решения по slug, либо undefined. */
export function getCrossSells(slug: string | undefined): CrossSellGroup | undefined {
  return slug ? crossSells[slug] : undefined;
}
