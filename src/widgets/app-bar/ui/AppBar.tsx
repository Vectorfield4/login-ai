import * as stylex from "@stylexjs/stylex";
import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getServices, getSolutions } from "@/shared/data/entities";
import { getCleanPath, routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useBreakpointDown } from "@/shared/hooks/useMatchMedia";
import { type AppLang, useT } from "@/shared/hooks/useT";
import IconButton from "@/shared/ui/atoms/IconButton";
import LanguageToggle from "@/shared/ui/molecules/LanguageToggle";
import ThemeToggle from "@/shared/ui/molecules/ThemeToggle";
import Drawer from "@/shared/ui/organisms/Drawer";

const NAV_ITEMS = ["home", "solutions", "services", "cases", "investors", "contacts"] as const;

const LOGO_SRC = "/loginai-mark.png";

const SOLUTIONS = getSolutions();
const SERVICES = getServices();

function isSectionActive(currentPath: string, section: string): boolean {
  return currentPath === section || currentPath.startsWith(`${section}/`);
}

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
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    fontWeight: 700,
    fontSize: tokens.sizeH6,
    color: tokens.colorText,
    textDecoration: "none",
    whiteSpace: "nowrap",
    padding: `${tokens.spacing1} ${tokens.spacing15}`,
  },
  brandMark: {
    width: 32,
    height: 32,
    objectFit: "contain",
    flexShrink: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing05,
    marginLeft: tokens.spacing2,
  },
  navLink: {
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    borderRadius: "0px",
    backgroundColor: "transparent",
    border: "1px solid transparent",
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 600,
    outline: "none",
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
  menu: { position: "relative" },
  menuButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    borderRadius: "0px",
    backgroundColor: "transparent",
    border: "1px solid transparent",
    color: tokens.colorText,
    fontWeight: 600,
    fontSize: "inherit",
    fontFamily: "inherit",
    cursor: "pointer",
    outline: "none",
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
  activeLink: {
    backgroundColor: tokens.colorPrimarySoft,
    color: tokens.colorPrimary,
    fontWeight: 700,
    boxShadow: `inset 0 -2px 0 ${tokens.colorPrimary}`,
  },
  chevron: {
    flexShrink: 0,
    verticalAlign: "middle",
    transition: `transform ${tokens.durationShortest} ease`,
  },
  chevronOpen: { transform: "rotate(180deg)" },
  dropdown: {
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
  dropdownItem: {
    display: "block",
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: tokens.sizeBody2,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
    },
  },
  dropdownAll: {
    marginTop: tokens.spacing05,
    borderTop: `1px solid ${tokens.colorDivider}`,
    color: tokens.colorPrimary,
    fontWeight: 600,
  },
  spacer: {
    flexGrow: 1,
  },
  drawerNav: {
    display: "flex",
    flexDirection: "column",
    marginTop: tokens.spacing2,
  },
  drawerBrand: {
    marginBottom: tokens.spacing2,
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
  drawerAll: {
    fontWeight: 600,
    color: tokens.colorPrimary,
  },
});

export function AppBar({ lang }: { lang: AppLang }) {
  const t = useT(lang);
  const currentPath = getCleanPath(useCurrentPathname());
  const solutionsActive = isSectionActive(currentPath, "/solutions");
  const servicesActive = isSectionActive(currentPath, "/services");
  const solutionsIndexActive = currentPath === "/solutions";
  const servicesIndexActive = currentPath === "/services";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerSolutionsOpen, setDrawerSolutionsOpen] = useState(false);
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false);
  const isMobile = useBreakpointDown("md");

  const solutionsTimerRef = useRef<number | null>(null);
  const servicesTimerRef = useRef<number | null>(null);

  const handleSolutionsEnter = () => {
    if (solutionsTimerRef.current) {
      clearTimeout(solutionsTimerRef.current);
      solutionsTimerRef.current = null;
    }
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsTimerRef.current = window.setTimeout(() => {
      setSolutionsOpen(false);
    }, 250);
  };

  const handleServicesEnter = () => {
    if (servicesTimerRef.current) {
      clearTimeout(servicesTimerRef.current);
      servicesTimerRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 250);
  };

  return (
    <header {...stylex.props(styles.bar)}>
      {isMobile && (
        <IconButton label={t("ui.menu.openMenu")} onClick={() => setDrawerOpen(true)}>
          <Menu size={20} />
        </IconButton>
      )}
      <a href={routeUrl("/", lang)} {...stylex.props(styles.brand)}>
        <img src={LOGO_SRC} alt="" width={32} height={32} {...stylex.props(styles.brandMark)} />
        Login AI
      </a>
      {!isMobile && (
        <nav {...stylex.props(styles.nav)}>
          {NAV_ITEMS.map((key) => {
            if (key === "solutions") {
              return (
                // biome-ignore lint/a11y/noStaticElementInteractions: hover container
                <div
                  key={key}
                  onMouseEnter={handleSolutionsEnter}
                  onMouseLeave={handleSolutionsLeave}
                  {...stylex.props(styles.menu)}
                >
                  <a
                    href={routeUrl("/solutions", lang)}
                    aria-current={
                      solutionsIndexActive ? "page" : solutionsActive ? "true" : undefined
                    }
                    {...stylex.props(styles.menuButton, solutionsActive && styles.activeLink)}
                  >
                    {t(`ui.menu.${key}`)}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      {...stylex.props(styles.chevron, solutionsOpen && styles.chevronOpen)}
                    />
                  </a>
                  {solutionsOpen && (
                    <div
                      role="menu"
                      onMouseEnter={handleSolutionsEnter}
                      onMouseLeave={handleSolutionsLeave}
                      {...stylex.props(styles.dropdown)}
                    >
                      {SOLUTIONS.map((solution) => {
                        const isActive = currentPath === `/solutions/${solution.slug}`;
                        return (
                          <a
                            key={solution.slug}
                            role="menuitem"
                            href={routeUrl(`/solutions/${solution.slug}`, lang)}
                            onClick={() => setSolutionsOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                            {...stylex.props(styles.dropdownItem, isActive && styles.activeLink)}
                          >
                            {t(solution.navTitle)}
                          </a>
                        );
                      })}
                      <a
                        role="menuitem"
                        href={routeUrl("/solutions", lang)}
                        onClick={() => setSolutionsOpen(false)}
                        {...stylex.props(styles.dropdownItem, styles.dropdownAll)}
                      >
                        {t("ui.menu.allSolutions")}
                      </a>
                    </div>
                  )}
                </div>
              );
            }
            if (key === "services") {
              return (
                // biome-ignore lint/a11y/noStaticElementInteractions: hover container
                <div
                  key={key}
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                  {...stylex.props(styles.menu)}
                >
                  <a
                    href={routeUrl("/services", lang)}
                    aria-current={
                      servicesIndexActive ? "page" : servicesActive ? "true" : undefined
                    }
                    {...stylex.props(styles.menuButton, servicesActive && styles.activeLink)}
                  >
                    {t(`ui.menu.${key}`)}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      {...stylex.props(styles.chevron, servicesOpen && styles.chevronOpen)}
                    />
                  </a>
                  {servicesOpen && (
                    <div
                      role="menu"
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                      {...stylex.props(styles.dropdown)}
                    >
                      {SERVICES.map((service) => {
                        const isActive = currentPath === `/services/${service.slug}`;
                        return (
                          <a
                            key={service.slug}
                            role="menuitem"
                            href={routeUrl(`/services/${service.slug}`, lang)}
                            onClick={() => setServicesOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                            {...stylex.props(styles.dropdownItem, isActive && styles.activeLink)}
                          >
                            {t(service.navTitle)}
                          </a>
                        );
                      })}
                      <a
                        role="menuitem"
                        href={routeUrl("/services", lang)}
                        onClick={() => setServicesOpen(false)}
                        {...stylex.props(styles.dropdownItem, styles.dropdownAll)}
                      >
                        {t("ui.menu.allServices")}
                      </a>
                    </div>
                  )}
                </div>
              );
            }
            const paths: Record<string, string> = {
              home: "/",
              cases: "/cases",
              investors: "/investors",
              contacts: "/contacts",
            };
            const path = paths[key] || "/";
            const isActive = currentPath === path;
            return (
              <a
                key={key}
                href={routeUrl(path, lang)}
                aria-current={isActive ? "page" : undefined}
                {...stylex.props(styles.navLink, isActive && styles.activeLink)}
              >
                {t(`ui.menu.${key}`)}
              </a>
            );
          })}
        </nav>
      )}
      <div {...stylex.props(styles.spacer)} />
      <LanguageToggle lang={lang} />
      <ThemeToggle lang={lang} />
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} label={t("ui.menu.openMenu")}>
        <a
          href={routeUrl("/", lang)}
          onClick={() => setDrawerOpen(false)}
          {...stylex.props(styles.brand, styles.drawerBrand)}
        >
          <img src={LOGO_SRC} alt="" width={32} height={32} {...stylex.props(styles.brandMark)} />
          Login AI
        </a>
        <nav {...stylex.props(styles.drawerNav)}>
          {NAV_ITEMS.map((key) => {
            if (key === "solutions") {
              return (
                <div key={key} {...stylex.props(styles.drawerGroup)}>
                  <button
                    type="button"
                    onClick={() => setDrawerSolutionsOpen((v) => !v)}
                    aria-expanded={drawerSolutionsOpen}
                    aria-current={solutionsActive ? "true" : undefined}
                    {...stylex.props(
                      styles.drawerLink,
                      styles.drawerButton,
                      solutionsActive && styles.activeLink,
                    )}
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
                      {SOLUTIONS.map((solution) => {
                        const isActive = currentPath === `/solutions/${solution.slug}`;
                        return (
                          <a
                            key={solution.slug}
                            href={routeUrl(`/solutions/${solution.slug}`, lang)}
                            onClick={() => setDrawerOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                            {...stylex.props(styles.drawerSubLink, isActive && styles.activeLink)}
                          >
                            {t(solution.navTitle)}
                          </a>
                        );
                      })}
                      <a
                        href={routeUrl("/solutions", lang)}
                        onClick={() => setDrawerOpen(false)}
                        {...stylex.props(styles.drawerSubLink, styles.drawerAll)}
                      >
                        {t("ui.menu.allSolutions")}
                      </a>
                    </div>
                  )}
                </div>
              );
            }
            if (key === "services") {
              return (
                <div key={key} {...stylex.props(styles.drawerGroup)}>
                  <button
                    type="button"
                    onClick={() => setDrawerServicesOpen((v) => !v)}
                    aria-expanded={drawerServicesOpen}
                    aria-current={servicesActive ? "true" : undefined}
                    {...stylex.props(
                      styles.drawerLink,
                      styles.drawerButton,
                      servicesActive && styles.activeLink,
                    )}
                  >
                    {t(`ui.menu.${key}`)}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      {...stylex.props(styles.chevron, drawerServicesOpen && styles.chevronOpen)}
                    />
                  </button>
                  {drawerServicesOpen && (
                    <div {...stylex.props(styles.drawerSub)}>
                      {SERVICES.map((service) => {
                        const isActive = currentPath === `/services/${service.slug}`;
                        return (
                          <a
                            key={service.slug}
                            href={routeUrl(`/services/${service.slug}`, lang)}
                            onClick={() => setDrawerOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                            {...stylex.props(styles.drawerSubLink, isActive && styles.activeLink)}
                          >
                            {t(service.navTitle)}
                          </a>
                        );
                      })}
                      <a
                        href={routeUrl("/services", lang)}
                        onClick={() => setDrawerOpen(false)}
                        {...stylex.props(styles.drawerSubLink, styles.drawerAll)}
                      >
                        {t("ui.menu.allServices")}
                      </a>
                    </div>
                  )}
                </div>
              );
            }
            const paths: Record<string, string> = {
              home: "/",
              cases: "/cases",
              investors: "/investors",
              contacts: "/contacts",
            };
            const path = paths[key] || "/";
            const isActive = currentPath === path;
            return (
              <a
                key={key}
                href={routeUrl(path, lang)}
                onClick={() => setDrawerOpen(false)}
                aria-current={isActive ? "page" : undefined}
                {...stylex.props(styles.drawerLink, isActive && styles.activeLink)}
              >
                {t(`ui.menu.${key}`)}
              </a>
            );
          })}
        </nav>
      </Drawer>
    </header>
  );
}
