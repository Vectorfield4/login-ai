import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { isItemActive, NAV_ITEMS } from "../../model/nav";
import Brand from "../atoms/Brand";
import NavLink from "../atoms/NavLink";
import NavChildrenList from "../molecules/NavChildrenList";
import NavDisclosure from "../molecules/NavDisclosure";

type AppBarDrawerProps = {
  currentPath: string;
  lang: AppLang;
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
export default function AppBarDrawer({ currentPath, lang, onNavigate }: AppBarDrawerProps) {
  const t = useT(lang);
  const [openPaths, setOpenPaths] = useState<string[]>([]);

  const toggleSection = (key: string) => {
    setOpenPaths((open) =>
      open.includes(key) ? open.filter((item) => item !== key) : [...open, key],
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
                key={item.titleKey}
                href={routeUrl(item.path ?? "/", lang)}
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
              key={item.titleKey}
              label={t(item.titleKey)}
              active={isItemActive(currentPath, item)}
              open={openPaths.includes(item.titleKey)}
              onToggle={() => toggleSection(item.titleKey)}
            >
              <NavChildrenList
                item={item}
                currentPath={currentPath}
                lang={lang}
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
