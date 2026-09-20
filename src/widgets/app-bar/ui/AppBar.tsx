import * as stylex from "@stylexjs/stylex";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { getServices, getSolutions } from "@/shared/data/entities";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useBreakpointDown } from "@/shared/hooks/useMatchMedia";
import { type AppLang, useT } from "@/shared/hooks/useT";
import IconButton from "@/shared/ui/atoms/IconButton";
import LanguageToggle from "@/shared/ui/molecules/LanguageToggle";
import ThemeToggle from "@/shared/ui/molecules/ThemeToggle";
import Drawer from "@/shared/ui/organisms/Drawer";

const NAV_ITEMS = ["home", "solutions", "services", "cases", "investors", "contacts"] as const;

const SOLUTIONS = getSolutions();
const SERVICES = getServices();

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
    padding: `${tokens.spacing1} ${tokens.spacing15}`,
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
    color: tokens.colorText,
    textDecoration: "none",
    fontWeight: 600,
    transition: `background-color ${tokens.durationShortest} ease, border-radius ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
      borderRadius: tokens.radiusBorder,
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
    border: "none",
    color: tokens.colorText,
    fontWeight: 600,
    fontSize: "inherit",
    fontFamily: "inherit",
    cursor: "pointer",
    transition: `background-color ${tokens.durationShortest} ease, border-radius ${tokens.durationShortest} ease`,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
      borderRadius: tokens.radiusBorder,
    },
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerSolutionsOpen, setDrawerSolutionsOpen] = useState(false);
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false);
  const isMobile = useBreakpointDown("md");

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
          {NAV_ITEMS.map((key) => {
            if (key === "solutions") {
              return (
                <div
                  key={key}
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                  {...stylex.props(styles.menu)}
                >
                  <a
                    href={routeUrl("/solutions/agentic-systems", lang)}
                    {...stylex.props(styles.menuButton)}
                  >
                    {t(`ui.menu.${key}`)}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      {...stylex.props(styles.chevron, solutionsOpen && styles.chevronOpen)}
                    />
                  </a>
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
              );
            }
            if (key === "services") {
              return (
                <div
                  key={key}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  {...stylex.props(styles.menu)}
                >
                  <a
                    href={routeUrl("/services", lang)}
                    {...stylex.props(styles.menuButton)}
                  >
                    {t(`ui.menu.${key}`)}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      {...stylex.props(styles.chevron, servicesOpen && styles.chevronOpen)}
                    />
                  </a>
                  {servicesOpen && (
                    <div role="menu" {...stylex.props(styles.dropdown)}>
                      {SERVICES.map((service) => (
                        <a
                          key={service.slug}
                          role="menuitem"
                          href={routeUrl(`/services/${service.slug}`, lang)}
                          onClick={() => setServicesOpen(false)}
                          {...stylex.props(styles.dropdownItem)}
                        >
                          {t(service.navTitle)}
                        </a>
                      ))}
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
            return (
              <a
                key={key}
                href={routeUrl(paths[key] || "/", lang)}
                {...stylex.props(styles.navLink)}
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
        <nav {...stylex.props(styles.drawerNav)}>
          {NAV_ITEMS.map((key) => {
            if (key === "solutions") {
              return (
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
              );
            }
            if (key === "services") {
              return (
                <div key={key} {...stylex.props(styles.drawerGroup)}>
                  <button
                    type="button"
                    onClick={() => setDrawerServicesOpen((v) => !v)}
                    aria-expanded={drawerServicesOpen}
                    {...stylex.props(styles.drawerLink, styles.drawerButton)}
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
                      {SERVICES.map((service) => (
                        <a
                          key={service.slug}
                          href={routeUrl(`/services/${service.slug}`, lang)}
                          onClick={() => setDrawerOpen(false)}
                          {...stylex.props(styles.drawerSubLink)}
                        >
                          {t(service.navTitle)}
                        </a>
                      ))}
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
            return (
              <a
                key={key}
                href={routeUrl(paths[key] || "/", lang)}
                onClick={() => setDrawerOpen(false)}
                {...stylex.props(styles.drawerLink)}
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
