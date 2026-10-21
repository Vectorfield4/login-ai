import {
  getServices,
  groupServices,
  SERVICE_DIRECTION_GROUPS,
  SERVICE_DIRECTION_ORDER,
} from "@/entities/service";
import { getSolutions } from "@/entities/solution";
import type { SvgIconComponent } from "@/shared/data/iconCatalog";

/** A single entry inside a nav section: a service, a solution, or a group. */
export interface NavChild {
  slug: string;
  /**
   * Explicit clean path of the entry. Section entities omit it and fall back to
   * `<section>/<slug>`; page children and groups carry the real path.
   */
  path?: string;
  /** i18n key of the entry title (`navTitle` of the entity, or `ui.menu.*`). */
  titleKey: string;
  /** Optional entity icon, rendered inline without the circular background. */
  icon?: SvgIconComponent;
  /**
   * Services the entry covers without rendering them. The menu stops at the
   * group level, so active state still has to know that the current service
   * belongs to a group and its direction.
   */
  serviceSlugs?: string[];
  /** Nested entries: a direction opens its groups. */
  children?: NavChild[];
}

/** A top-level nav entry: a plain link, or a section that opens a menu. */
export interface NavItem {
  /** i18n key of the entry title (`ui.menu.*`). */
  titleKey: string;
  /** Clean path of the section index; omitted for a grouping menu (Company). */
  path?: string;
  /** i18n key of the "all entries" link (`ui.menu.allSolutions`); sections only. */
  allKey?: string;
  /** Children of a section; an item with children opens a menu. */
  children?: NavChild[];
}

function toChildren(
  entries: { slug: string; navTitle: string; icon?: SvgIconComponent }[],
): NavChild[] {
  return entries.map((entry) => ({
    slug: entry.slug,
    titleKey: entry.navTitle,
    icon: entry.icon,
  }));
}

/**
 * Services grouped into directions and groups. The menu stops at the group:
 * a direction opens its groups, and a group page lists its services. Groups
 * without services yet are left out, so no menu link points at a missing page.
 */
function serviceDirections(): NavChild[] {
  const buckets = groupServices(getServices());
  return SERVICE_DIRECTION_ORDER.map((direction) => {
    const groups = SERVICE_DIRECTION_GROUPS[direction].flatMap((group) => {
      const bucket = buckets.find((entry) => entry.group === group);
      if (!bucket) return [];
      return [
        {
          slug: group,
          path: `/services/group/${group}`,
          titleKey: `servicesGroups.${group}.label`,
          serviceSlugs: bucket.services.map((service) => service.slug),
        },
      ];
    });
    const serviceSlugs = groups.flatMap((group) => group.serviceSlugs ?? []);
    return {
      slug: direction,
      path: `/services/direction/${direction}`,
      titleKey: `servicesDirections.${direction}.label`,
      serviceSlugs,
      ...(groups.length ? { children: groups } : {}),
    };
  });
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
    children: serviceDirections(),
  },
  {
    titleKey: "ui.menu.company",
    children: [
      { slug: "news", path: "/news", titleKey: "ui.menu.news" },
      { slug: "cases", path: "/cases", titleKey: "ui.menu.cases" },
      { slug: "team", path: "/team", titleKey: "ui.menu.team" },
      { slug: "contacts", path: "/contacts", titleKey: "ui.menu.contacts" },
      { slug: "investors", path: "/investors", titleKey: "ui.menu.investors" },
    ],
  },
];

/** True for the section index and for every page inside the section. */
export function isSectionActive(currentPath: string, path?: string): boolean {
  if (!path) return false;
  return currentPath === path || currentPath.startsWith(`${path}/`);
}

/** Service slug of a clean `/services/<slug>` path, else `undefined`. */
export function currentServiceSlug(currentPath: string): string | undefined {
  return /^\/services\/([^/]+)$/.exec(currentPath)?.[1];
}

/** Clean path of a child inside a parent path. */
export function resolveChildPath(parentPath: string | undefined, child: NavChild): string {
  if (child.path) return child.path;
  return parentPath ? `${parentPath}/${child.slug}` : `/${child.slug}`;
}

/** Clean path of a child entry inside its section. */
export function childPath(item: NavItem, child: NavChild): string {
  return resolveChildPath(item.path, child);
}

/** True when the section index or any descendant entry is the current page. */
export function isItemActive(currentPath: string, item: NavItem): boolean {
  if (isSectionActive(currentPath, item.path)) return true;
  const serviceSlug = currentServiceSlug(currentPath);
  const walk = (parentPath: string | undefined, children: NavChild[]): boolean =>
    children.some((child) => {
      const path = resolveChildPath(parentPath, child);
      if (isSectionActive(currentPath, path)) return true;
      if (serviceSlug && child.serviceSlugs?.includes(serviceSlug)) return true;
      return child.children ? walk(path, child.children) : false;
    });
  return walk(item.path, item.children ?? []);
}
