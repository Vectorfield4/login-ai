import * as stylex from "@stylexjs/stylex";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { routeUrl } from "@/shared/data/routes";
import { darkThemeClassName } from "@/shared/design/theme";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useBreakpointDown } from "@/shared/hooks/useMatchMedia";
import { type AppLang, useT } from "@/shared/hooks/useT";
import IconButton from "@/shared/ui/atoms/IconButton";
import Drawer from "@/shared/ui/organisms/Drawer";

const NAV_ITEMS = ["home", "solutions", "services", "cases", "investors", "contacts"] as const;

const NAV_PATHS: Record<(typeof NAV_ITEMS)[number], string> = {
  home: "/",
  solutions: "/solutions",
  services: "/services",
  cases: "/cases",
  investors: "/investors",
  contacts: "/contacts",
};

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
  brand: {
    fontWeight: 700,
    fontSize: tokens.sizeH6,
    color: tokens.colorText,
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing05,
    marginLeft: tokens.spacing2,
  },
  navLink: {
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    borderRadius: tokens.radiusBorder,
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 600,
    transition: `background-color ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  spacer: {
    flexGrow: 1,
  },
  drawerNav: {
    display: "flex",
    flexDirection: "column",
    marginTop: tokens.spacing2,
  },
  drawerLink: {
    padding: `${tokens.spacing2} ${tokens.spacing2}`,
    borderRadius: tokens.radiusBorder,
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: tokens.sizeBody1,
  },
});

export function AppBar({ lang }: { lang: AppLang }) {
  const t = useT(lang);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useBreakpointDown("md");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setTheme(current);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    for (const cls of darkThemeClassName.split(/\s+/)) {
      document.documentElement.classList.toggle(cls, next === "dark");
    }
    localStorage.setItem("theme", next);
  };

  return (
    <header {...stylex.props(styles.bar)}>
      {isMobile && (
        <IconButton label={t("ui.menu.openMenu")} onClick={() => setDrawerOpen(true)}>
          <Menu size={20} />
        </IconButton>
      )}
      <a href={routeUrl("/", lang)} {...stylex.props(styles.brand)}>
        Login AI
      </a>
      {!isMobile && (
        <nav {...stylex.props(styles.nav)}>
          {NAV_ITEMS.map((key) => (
            <a key={key} href={routeUrl(NAV_PATHS[key], lang)} {...stylex.props(styles.navLink)}>
              {t(`ui.menu.${key}`)}
            </a>
          ))}
        </nav>
      )}
      <div {...stylex.props(styles.spacer)} />
      <a
        href={routeUrl("/", lang === "ru" ? "en" : "ru")}
        title={t("ui.lang.switchTo")}
        {...stylex.props(styles.navLink)}
      >
        {lang === "ru" ? "EN" : "RU"}
      </a>
      <IconButton
        label={theme === "light" ? t("ui.theme.toggleDark") : t("ui.theme.toggleLight")}
        onClick={toggleTheme}
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </IconButton>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} label={t("ui.menu.openMenu")}>
        <nav {...stylex.props(styles.drawerNav)}>
          {NAV_ITEMS.map((key) => (
            <a
              key={key}
              href={routeUrl(NAV_PATHS[key], lang)}
              onClick={() => setDrawerOpen(false)}
              {...stylex.props(styles.drawerLink)}
            >
              {t(`ui.menu.${key}`)}
            </a>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
