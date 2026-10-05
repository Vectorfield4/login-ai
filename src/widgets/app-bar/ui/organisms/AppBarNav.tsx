import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState } from "react";
import { routeUrl } from "@/shared/data/routes";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { NAV_ITEMS } from "../../model/nav";
import NavLink from "../atoms/NavLink";
import NavDropdown from "../molecules/NavDropdown";

type AppBarNavProps = {
  currentPath: string;
  lang: AppLang;
};

/**
 * Delay before the open section closes on mouse leave (ms). It only covers the
 * gap between the trigger and its panel; hovering another section or a plain
 * link closes the current one at once.
 */
const CLOSE_DELAY_MS = 250;

const styles = stylex.create({
  nav: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing05,
    marginLeft: tokens.spacing2,
  },
});

/**
 * Desktop navigation of the app shell: sections with menus, plain links
 * otherwise. The open section lives here, so opening one section — or hovering
 * a plain link — closes the others without the old delay lingering.
 */
export default function AppBarNav({ currentPath, lang }: AppBarNavProps) {
  const t = useT(lang);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openSection = (key: string) => {
    cancelClose();
    setOpenKey(key);
  };

  const closeNow = () => {
    cancelClose();
    setOpenKey(null);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => setOpenKey(null), CLOSE_DELAY_MS);
  };

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  return (
    <nav
      itemScope
      itemType={schemaIri(SCHEMA_TYPE.siteNavigationElement)}
      {...stylex.props(styles.nav)}
    >
      {NAV_ITEMS.map((item) =>
        item.children ? (
          <NavDropdown
            key={item.titleKey}
            item={item}
            currentPath={currentPath}
            lang={lang}
            open={openKey === item.titleKey}
            onEnter={() => openSection(item.titleKey)}
            onLeave={scheduleClose}
            onNavigate={closeNow}
          />
        ) : (
          <NavLink
            key={item.titleKey}
            href={routeUrl(item.path ?? "/", lang)}
            variant="bar"
            active={currentPath === item.path}
            current={currentPath === item.path ? "page" : undefined}
            onMouseEnter={closeNow}
          >
            {t(item.titleKey)}
          </NavLink>
        ),
      )}
    </nav>
  );
}
