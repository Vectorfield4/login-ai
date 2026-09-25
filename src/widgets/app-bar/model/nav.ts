import { getServices, getSolutions } from "@/shared/data/entities";

/** A single entry inside a nav section: one solution or one service. */
export interface NavChild {
  slug: string;
  /** i18n key of the entry title (`navTitle` of the entity). */
  titleKey: string;
}

/** A top-level nav entry: a plain link, or a section that opens a menu. */
export interface NavItem {
  /** i18n key of the entry title (`ui.menu.*`). */
  titleKey: string;
  /** Clean (locale-free) path of the section or page. */
  path: string;
  /** i18n key of the "all entries" link (`ui.menu.allSolutions`); sections only. */
  allKey?: string;
  /** Children of a section; an item with children opens a menu. */
  children?: NavChild[];
}

function toChildren(entries: { slug: string; navTitle: string }[]): NavChild[] {
  return entries.map((entry) => ({ slug: entry.slug, titleKey: entry.navTitle }));
}

/** Top-level navigation of the app shell, in render order. */
export const NAV_ITEMS: NavItem[] = [
  { titleKey: "ui.menu.home", path: "/" },
  {
    titleKey: "ui.menu.solutions",
    path: "/solutions",
    allKey: "ui.menu.allSolutions",
    children: toChildren(getSolutions()),
  },
  {
    titleKey: "ui.menu.services",
    path: "/services",
    allKey: "ui.menu.allServices",
    children: toChildren(getServices()),
  },
  { titleKey: "ui.menu.cases", path: "/cases" },
  { titleKey: "ui.menu.investors", path: "/investors" },
  { titleKey: "ui.menu.contacts", path: "/contacts" },
];

/** True for the section index and for every page inside the section. */
export function isSectionActive(currentPath: string, path: string): boolean {
  return currentPath === path || currentPath.startsWith(`${path}/`);
}

/** Clean path of a child entry inside its section. */
export function childPath(item: NavItem, child: NavChild): string {
  return `${item.path}/${child.slug}`;
}
