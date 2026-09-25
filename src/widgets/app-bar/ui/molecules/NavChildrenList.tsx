import { routeUrl } from "@/shared/data/routes";
import type { AppLang } from "@/shared/hooks/useT";
import type { TFunc } from "@/shared/i18n/t";
import { childPath, type NavItem } from "../../model/nav";
import NavLink from "../atoms/NavLink";

type NavChildrenListProps = {
  item: NavItem;
  currentPath: string;
  lang: AppLang;
  t: TFunc;
  /** `item` — entries of the bar dropdown, `subItem` — nested drawer entries. */
  variant: "item" | "subItem";
  /** `menuitem` inside the bar dropdown; the drawer list carries no roles. */
  itemRole?: "menuitem";
  onNavigate?: () => void;
};

/** "All entries" link, then the entry list of a nav section. */
export default function NavChildrenList({
  item,
  currentPath,
  lang,
  t,
  variant,
  itemRole,
  onNavigate,
}: NavChildrenListProps) {
  if (!item.allKey) return null;

  const sectionCurrent = currentPath === item.path;

  const allLink = (
    <NavLink
      href={routeUrl(item.path, lang)}
      variant={variant}
      tone="primary"
      role={itemRole}
      active={sectionCurrent}
      current={sectionCurrent ? "page" : undefined}
      onNavigate={onNavigate}
    >
      {t(item.allKey)}
    </NavLink>
  );

  const childLinks = (item.children ?? []).map((child) => {
    const path = childPath(item, child);
    const childCurrent = currentPath === path;
    return (
      <NavLink
        key={child.slug}
        href={routeUrl(path, lang)}
        variant={variant}
        role={itemRole}
        active={childCurrent}
        current={childCurrent ? "page" : undefined}
        onNavigate={onNavigate}
      >
        {t(child.titleKey)}
      </NavLink>
    );
  });

  return (
    <>
      {allLink}
      {childLinks}
    </>
  );
}
