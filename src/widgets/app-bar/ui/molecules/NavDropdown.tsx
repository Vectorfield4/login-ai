import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { AppLang } from "@/shared/hooks/useT";
import type { TFunc } from "@/shared/i18n/t";
import { isSectionActive, type NavItem } from "../../model/nav";
import NavLink from "../atoms/NavLink";
import NavChildrenList from "./NavChildrenList";

/**
 * Delay before the menu closes on mouse leave (ms). Must outlast the hover
 * transition, so that the cursor can travel from the trigger into the panel.
 */
const CLOSE_DELAY_MS = 250;

type NavDropdownProps = {
  item: NavItem;
  currentPath: string;
  lang: AppLang;
  t: TFunc;
};

const styles = stylex.create({
  root: { position: "relative" },
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
 * the panel with the "all entries" link and the section entries.
 */
export default function NavDropdown({ item, currentPath, lang, t }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const sectionActive = isSectionActive(currentPath, item.path);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleEnter = () => {
    cancelClose();
    setOpen(true);
  };

  const handleLeave = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover container
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} {...stylex.props(styles.root)}>
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
      {open ? (
        <div
          role="menu"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          {...stylex.props(styles.panel)}
        >
          <NavChildrenList
            item={item}
            currentPath={currentPath}
            lang={lang}
            t={t}
            variant="item"
            itemRole="menuitem"
            onNavigate={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
