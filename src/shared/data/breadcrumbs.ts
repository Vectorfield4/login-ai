import type { TFunc } from "../i18n/t";
import { getCaseBySlug, getServiceBySlug, getSolutionBySlug } from "./entities";

/** One crumb: a translated label plus the clean path it links to, if any. */
export interface Breadcrumb {
  label: string;
  path?: string;
}

export interface BreadcrumbsData {
  /** Ordered crumbs, the last one being the current page (no `path`). */
  items: Breadcrumb[];
}

const INDEX_LABEL_KEYS: Record<string, string> = {
  "/services": "servicesPage.title",
  "/cases": "casesPage.title",
  "/solutions": "solutionsPage.title",
  "/contacts": "contactsPage.title",
  // Short nav-style label: the investors H1 is a whole sentence.
  "/investors": "ui.menu.investors",
  "/news": "newsPage.title",
};

const SECTION_LABEL_KEYS: Record<string, string> = {
  "/services": "servicesPage.title",
  "/cases": "casesPage.title",
  "/solutions": "solutionsPage.title",
  "/news": "newsPage.title",
};

function entityTitleKey(section: string, slug: string): string | undefined {
  if (section === "services") return getServiceBySlug(slug)?.title;
  if (section === "solutions") return getSolutionBySlug(slug)?.title;
  if (section === "cases") return getCaseBySlug(slug)?.title;
  return undefined;
}

/** Options for routes whose leaf title is not a dictionary key. */
export interface BreadcrumbOptions {
  /**
   * Ready-made label of the leaf crumb. News articles live in the content
   * collection, so their titles are plain strings, not i18n keys — the page
   * passes the title it already has instead of duplicating the resolution.
   */
  entityTitle?: string;
}

/**
 * Builds the breadcrumb trail for a clean route. Returns `null` for pages that
 * sit outside the hierarchy: the home page, 404 and anything deeper than
 * `/<section>/<slug>`. The trail always starts at the home page, so section
 * index pages get a two-crumb chain and detail pages add the entity.
 */
export function resolveBreadcrumbs(
  cleanPath: string,
  t: TFunc,
  options?: BreadcrumbOptions,
): BreadcrumbsData | null {
  const path = cleanPath.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/404") return null;

  const home: Breadcrumb = { label: t("ui.menu.home"), path: "/" };
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 1) {
    const labelKey = INDEX_LABEL_KEYS[path];
    if (!labelKey) return null;
    return { items: [home, { label: t(labelKey), path }] };
  }

  if (segments.length !== 2) return null;

  const [section, slug] = segments;
  const sectionPath = `/${section}`;
  const sectionKey = SECTION_LABEL_KEYS[sectionPath];
  const leafTitle = options?.entityTitle ?? entityTitleKey(section, slug);
  if (!sectionKey || !leafTitle) return null;

  return {
    items: [home, { label: t(sectionKey), path: sectionPath }, { label: t(leafTitle) }],
  };
}
