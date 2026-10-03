import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { childPath, type NavChild, type NavItem, resolveChildPath } from "../../model/nav";
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

const styles = stylex.create({
  groupRow: { display: "flex", alignItems: "center" },
  groupLink: { flexGrow: 1 },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorTextSecondary,
    cursor: "pointer",
    borderRadius: tokens.radiusShape,
    ":hover": { backgroundColor: tokens.colorActionHover },
  },
  chevron: { transition: `transform ${tokens.durationShortest} ease` },
  chevronOpen: { transform: "rotate(180deg)" },
  nested: { display: "flex", flexDirection: "column" },
  nestedItem: { paddingInlineStart: tokens.spacing4 },
});

function toIcon(icon: NavChild["icon"]) {
  if (!icon) return undefined;
  return typeof icon === "string" ? resolveEntityIcon(icon) : icon;
}

/** "All entries" link, then the flat or grouped entry list of a nav section. */
export default function NavChildrenList({
  item,
  currentPath,
  lang,
  variant,
  itemRole,
  onNavigate,
}: NavChildrenListProps) {
  const t = useT(lang);
  const sectionCurrent = item.path !== undefined && currentPath === item.path;
  const isCurrent = (path: string) => currentPath === path;

  const [openGroup, setOpenGroup] = useState<string | null>(
    () =>
      item.children?.find((child) =>
        child.children?.some((service) => isCurrent(resolveChildPath(child.path, service))),
      )?.slug ?? null,
  );

  const allLink =
    item.allKey && item.path ? (
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
    ) : null;

  const childLinks = (item.children ?? []).map((child) => {
    if (child.children) {
      const groupCurrent = isCurrent(resolveChildPath(item.path, child));
      const open = openGroup === child.slug;
      return (
        <div key={child.slug}>
          <div {...stylex.props(styles.groupRow)}>
            <NavLink
              href={routeUrl(resolveChildPath(item.path, child), lang)}
              variant={variant}
              role={itemRole}
              active={groupCurrent}
              current={groupCurrent ? "page" : undefined}
              style={styles.groupLink}
              onNavigate={onNavigate}
            >
              {t(child.titleKey)}
            </NavLink>
            <button
              type="button"
              aria-expanded={open}
              aria-label={t(child.titleKey)}
              onClick={() => setOpenGroup(open ? null : child.slug)}
              {...stylex.props(styles.toggle)}
            >
              <ChevronDown
                size={16}
                aria-hidden="true"
                {...stylex.props(styles.chevron, open && styles.chevronOpen)}
              />
            </button>
          </div>
          {open ? (
            <div {...stylex.props(styles.nested)}>
              {child.children.map((service) => {
                const path = resolveChildPath(child.path, service);
                const current = isCurrent(path);
                return (
                  <NavLink
                    key={service.slug}
                    href={routeUrl(path, lang)}
                    variant={variant}
                    role={itemRole}
                    active={current}
                    current={current ? "page" : undefined}
                    style={styles.nestedItem}
                    onNavigate={onNavigate}
                  >
                    {t(service.titleKey)}
                  </NavLink>
                );
              })}
            </div>
          ) : null}
        </div>
      );
    }

    const Icon = toIcon(child.icon);
    const path = childPath(item, child);
    const childCurrent = isCurrent(path);
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
