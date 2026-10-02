import type { LucideIcon } from "lucide-react";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { routeUrl } from "@/shared/data/routes";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { childPath, type NavItem } from "../../model/nav";
import NavLink from "../atoms/NavLink";

type NavChildrenListProps = {
  item: NavItem;
  currentPath: string;
  lang: AppLang;
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
  variant,
  itemRole,
  onNavigate,
}: NavChildrenListProps) {
  const t = useT(lang);
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
    const Icon: LucideIcon | null = child.icon
      ? typeof child.icon === "string"
        ? resolveEntityIcon(child.icon)
        : child.icon
      : null;
    return (
      <NavLink
        key={child.slug}
        href={routeUrl(path, lang)}
        variant={variant}
        role={itemRole}
        active={childCurrent}
        current={childCurrent ? "page" : undefined}
        icon={Icon ? <Icon size={16} /> : undefined}
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
