import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { isItemActive, type NavItem } from "../../model/nav";
import NavLink, { activeNavLink } from "../atoms/NavLink";
import NavChildrenList from "./NavChildrenList";

type NavDropdownProps = {
  item: NavItem;
  currentPath: string;
  lang: AppLang;
  /** Whether this section's panel is open; owned by the nav for exclusivity. */
  open: boolean;
  /** Opens this section at once, closing any other that was open. */
  onEnter: () => void;
  /** Schedules closing after the cursor leaves the trigger and panel. */
  onLeave: () => void;
  /** Navigates away: closes the panel at once. */
  onNavigate: () => void;
};

const styles = stylex.create({
  root: { position: "relative" },
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    backgroundColor: "transparent",
    border: "1px solid transparent",
    borderRadius: "0px",
    color: tokens.colorText,
    fontWeight: 600,
    fontSize: "inherit",
    fontFamily: "inherit",
    cursor: "pointer",
    transition: `background-color ${tokens.durationShortest} ease, border-radius ${tokens.durationShortest} ease, border-color ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
      borderRadius: tokens.radiusBorder,
      borderColor: tokens.colorDivider,
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: "2px",
    },
  },
  chevron: {
    flexShrink: 0,
    verticalAlign: "middle",
    transition: `transform ${tokens.durationShortest} ease`,
  },
  chevronOpen: { transform: "rotate(180deg)" },
  panel: {
    position: "absolute",
    top: "100%",
    left: 0,
    minWidth: 232,
    marginTop: tokens.spacing05,
    padding: `${tokens.spacing1} 0`,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurface,
    boxShadow: tokens.shadow8,
    zIndex: tokens.zAppbar,
  },
});

/**
 * Bar entry that opens a menu of its section on hover: the trigger link plus
 * the panel with the "all entries" link and the section entries. The open state
 * is controlled by the nav, so opening another section closes this one at once.
 */
export default function NavDropdown({
  item,
  currentPath,
  lang,
  open,
  onEnter,
  onLeave,
  onNavigate,
}: NavDropdownProps) {
  const t = useT(lang);
  const sectionActive = isItemActive(currentPath, item);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover container
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} {...stylex.props(styles.root)}>
      {item.path ? (
        <NavLink
          href={routeUrl(item.path, lang)}
          variant="barTrigger"
          active={sectionActive}
          current={sectionActive ? (currentPath === item.path ? "page" : "true") : undefined}
        >
          {t(item.titleKey)}
          <ChevronDown
            size={14}
            aria-hidden="true"
            {...stylex.props(styles.chevron, open && styles.chevronOpen)}
          />
        </NavLink>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          {...stylex.props(styles.trigger, sectionActive && activeNavLink)}
        >
          {t(item.titleKey)}
          <ChevronDown
            size={14}
            aria-hidden="true"
            {...stylex.props(styles.chevron, open && styles.chevronOpen)}
          />
        </button>
      )}
      {open ? (
        <div
          role="menu"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          {...stylex.props(styles.panel)}
        >
          <NavChildrenList
            item={item}
            currentPath={currentPath}
            lang={lang}
            variant="item"
            itemRole="menuitem"
            onNavigate={onNavigate}
          />
        </div>
      ) : null}
    </div>
  );
}
