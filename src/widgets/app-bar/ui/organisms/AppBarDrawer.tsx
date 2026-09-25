import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { AppLang } from "@/shared/hooks/useT";
import type { TFunc } from "@/shared/i18n/t";
import { isSectionActive, NAV_ITEMS } from "../../model/nav";
import Brand from "../atoms/Brand";
import NavLink from "../atoms/NavLink";
import NavChildrenList from "../molecules/NavChildrenList";
import NavDisclosure from "../molecules/NavDisclosure";

type AppBarDrawerProps = {
  currentPath: string;
  lang: AppLang;
  t: TFunc;
  /** Closes the drawer after any navigation. */
  onNavigate: () => void;
};

const styles = stylex.create({
  brand: { marginBottom: tokens.spacing2 },
  nav: {
    display: "flex",
    flexDirection: "column",
    marginTop: tokens.spacing2,
  },
});

/** Drawer content of the app shell: brand, sections folded into disclosures, plain links. */
export default function AppBarDrawer({ currentPath, lang, t, onNavigate }: AppBarDrawerProps) {
  const [openPaths, setOpenPaths] = useState<string[]>([]);

  const toggleSection = (path: string) => {
    setOpenPaths((open) =>
      open.includes(path) ? open.filter((item) => item !== path) : [...open, path],
    );
  };

  return (
    <>
      <Brand href={routeUrl("/", lang)} onNavigate={onNavigate} style={styles.brand} />
      <nav {...stylex.props(styles.nav)}>
        {NAV_ITEMS.map((item) => {
          if (!item.children) {
            return (
              <NavLink
                key={item.path}
                href={routeUrl(item.path, lang)}
                variant="drawer"
                active={currentPath === item.path}
                current={currentPath === item.path ? "page" : undefined}
                onNavigate={onNavigate}
              >
                {t(item.titleKey)}
              </NavLink>
            );
          }

          return (
            <NavDisclosure
              key={item.path}
              label={t(item.titleKey)}
              active={isSectionActive(currentPath, item.path)}
              open={openPaths.includes(item.path)}
              onToggle={() => toggleSection(item.path)}
            >
              <NavChildrenList
                item={item}
                currentPath={currentPath}
                lang={lang}
                t={t}
                variant="subItem"
                onNavigate={onNavigate}
              />
            </NavDisclosure>
          );
        })}
      </nav>
    </>
  );
}
