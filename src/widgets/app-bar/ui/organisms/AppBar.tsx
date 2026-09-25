import * as stylex from "@stylexjs/stylex";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getCleanPath, routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useBreakpointDown } from "@/shared/hooks/useMatchMedia";
import { type AppLang, useT } from "@/shared/hooks/useT";
import IconButton from "@/shared/ui/atoms/IconButton";
import LanguageToggle from "@/shared/ui/molecules/LanguageToggle";
import ThemeToggle from "@/shared/ui/molecules/ThemeToggle";
import Drawer from "@/shared/ui/organisms/Drawer";
import Brand from "../atoms/Brand";
import AppBarDrawer from "./AppBarDrawer";
import AppBarNav from "./AppBarNav";

/** Current path without the locale prefix; empty before hydration. */
function useCurrentPathname(): string {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);
    updatePathname();
    window.addEventListener("popstate", updatePathname);
    return () => window.removeEventListener("popstate", updatePathname);
  }, []);

  return pathname;
}

const styles = stylex.create({
  bar: {
    position: "sticky",
    top: 0,
    zIndex: tokens.zAppbar,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing05,
    paddingBlock: tokens.spacing1,
    paddingInline: tokens.spacing2,
    backgroundColor: tokens.colorSurface,
    boxShadow: tokens.shadow1,
  },
  spacer: { flexGrow: 1 },
});

/** App shell header: brand, navigation, language and theme toggles, mobile drawer. */
export function AppBar({ lang }: { lang: AppLang }) {
  const t = useT(lang);
  const currentPath = getCleanPath(useCurrentPathname());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useBreakpointDown("md");

  return (
    <header {...stylex.props(styles.bar)}>
      {isMobile ? (
        <IconButton label={t("ui.menu.openMenu")} onClick={() => setDrawerOpen(true)}>
          <Menu size={20} />
        </IconButton>
      ) : null}
      <Brand href={routeUrl("/", lang)} />
      {isMobile ? null : <AppBarNav currentPath={currentPath} lang={lang} t={t} />}
      <div {...stylex.props(styles.spacer)} />
      <LanguageToggle lang={lang} />
      <ThemeToggle lang={lang} />
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} label={t("ui.menu.openMenu")}>
        <AppBarDrawer
          currentPath={currentPath}
          lang={lang}
          t={t}
          onNavigate={() => setDrawerOpen(false)}
        />
      </Drawer>
    </header>
  );
}
