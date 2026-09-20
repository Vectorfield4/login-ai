import * as stylex from "@stylexjs/stylex";
import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getSolutions } from "@/shared/data/entities";
import { routeUrl } from "@/shared/data/routes";
import { darkThemeClassName } from "@/shared/design/theme";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useBreakpointDown } from "@/shared/hooks/useMatchMedia";
import { type AppLang, useT } from "@/shared/hooks/useT";
import IconButton from "@/shared/ui/atoms/IconButton";
import Drawer from "@/shared/ui/organisms/Drawer";

const NAV_ITEMS = ["home", "solutions", "services", "cases", "investors", "contacts"] as const;
type NavKey = Exclude<(typeof NAV_ITEMS)[number], "solutions">;

const NAV_PATHS: Record<NavKey, string> = {
  home: "/",
  services: "/services",
  cases: "/cases",
  investors: "/investors",
  contacts: "/contacts",
};

const SOLUTIONS = getSolutions();

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
  menu: { position: "relative" },
  menuButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    borderRadius: tokens.radiusBorder,
    backgroundColor: "transparent",
    border: "none",
    color: tokens.colorText,
    fontWeight: 600,
    fontSize: "inherit",
    fontFamily: "inherit",
    cursor: "pointer",
    transition: `background-color ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  chevron: {
    flexShrink: 0,
    transition: `transform ${tokens.durationShortest} ease`,
  },
  chevronOpen: { transform: "rotate(180deg)" },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    minWidth: 232,
    marginTop: tokens.spacing1,
    padding: `${tokens.spacing1} 0`,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurface,
    boxShadow: tokens.shadow8,
    zIndex: tokens.zAppbar,
  },
  dropdownItem: {
    display: "block",
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 500,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
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
  drawerGroup: { display: "flex", flexDirection: "column" },
  drawerButton: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: tokens.spacing05,
    backgroundColor: "transparent",
    border: "none",
    fontFamily: "inherit",
    textAlign: "left",
    cursor: "pointer",
  },
  drawerLink: {
    padding: `${tokens.spacing2} ${tokens.spacing2}`,
    borderRadius: tokens.radiusBorder,
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: tokens.sizeBody1,
  },
  drawerSub: { display: "flex", flexDirection: "column" },
  drawerSubLink: {
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    paddingInlineStart: tokens.spacing4,
    borderRadius: tokens.radiusBorder,
    color: tokens.colorTextSecondary,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: tokens.sizeBody2,
  },
});

export function AppBar({ lang }: { lang: AppLang }) {
  const t = useT(lang);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [drawerSolutionsOpen, setDrawerSolutionsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpointDown("md");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setTheme(current);
    }
  }, []);

  useEffect(() => {
    if (!solutionsOpen) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [solutionsOpen]);

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
          {NAV_ITEMS.map((key) =>
            key === "solutions" ? (
              <div key={key} ref={menuRef} {...stylex.props(styles.menu)}>
                <button
                  type="button"
                  onClick={() => setSolutionsOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={solutionsOpen}
                  {...stylex.props(styles.menuButton)}
                >
                  {t(`ui.menu.${key}`)}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    {...stylex.props(styles.chevron, solutionsOpen && styles.chevronOpen)}
                  />
                </button>
                {solutionsOpen && (
                  <div role="menu" {...stylex.props(styles.dropdown)}>
                    {SOLUTIONS.map((solution) => (
                      <a
                        key={solution.slug}
                        role="menuitem"
                        href={routeUrl(`/solutions/${solution.slug}`, lang)}
                        onClick={() => setSolutionsOpen(false)}
                        {...stylex.props(styles.dropdownItem)}
                      >
                        {t(solution.navTitle)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a key={key} href={routeUrl(NAV_PATHS[key], lang)} {...stylex.props(styles.navLink)}>
                {t(`ui.menu.${key}`)}
              </a>
            ),
          )}
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
          {NAV_ITEMS.map((key) =>
            key === "solutions" ? (
              <div key={key} {...stylex.props(styles.drawerGroup)}>
                <button
                  type="button"
                  onClick={() => setDrawerSolutionsOpen((v) => !v)}
                  aria-expanded={drawerSolutionsOpen}
                  {...stylex.props(styles.drawerLink, styles.drawerButton)}
                >
                  {t(`ui.menu.${key}`)}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    {...stylex.props(styles.chevron, drawerSolutionsOpen && styles.chevronOpen)}
                  />
                </button>
                {drawerSolutionsOpen && (
                  <div {...stylex.props(styles.drawerSub)}>
                    {SOLUTIONS.map((solution) => (
                      <a
                        key={solution.slug}
                        href={routeUrl(`/solutions/${solution.slug}`, lang)}
                        onClick={() => setDrawerOpen(false)}
                        {...stylex.props(styles.drawerSubLink)}
                      >
                        {t(solution.navTitle)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={key}
                href={routeUrl(NAV_PATHS[key], lang)}
                onClick={() => setDrawerOpen(false)}
                {...stylex.props(styles.drawerLink)}
              >
                {t(`ui.menu.${key}`)}
              </a>
            ),
          )}
        </nav>
      </Drawer>
    </header>
  );
}
