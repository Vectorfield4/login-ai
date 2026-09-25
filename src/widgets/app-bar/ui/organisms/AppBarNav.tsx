import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { AppLang } from "@/shared/hooks/useT";
import type { TFunc } from "@/shared/i18n/t";
import { NAV_ITEMS } from "../../model/nav";
import NavLink from "../atoms/NavLink";
import NavDropdown from "../molecules/NavDropdown";

type AppBarNavProps = {
  currentPath: string;
  lang: AppLang;
  t: TFunc;
};

const styles = stylex.create({
  nav: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing05,
    marginLeft: tokens.spacing2,
  },
});

/** Desktop navigation of the app shell: sections with menus, plain links otherwise. */
export default function AppBarNav({ currentPath, lang, t }: AppBarNavProps) {
  return (
    <nav {...stylex.props(styles.nav)}>
      {NAV_ITEMS.map((item) =>
        item.children ? (
          <NavDropdown key={item.path} item={item} currentPath={currentPath} lang={lang} t={t} />
        ) : (
          <NavLink
            key={item.path}
            href={routeUrl(item.path, lang)}
            variant="bar"
            active={currentPath === item.path}
            current={currentPath === item.path ? "page" : undefined}
          >
            {t(item.titleKey)}
          </NavLink>
        ),
      )}
    </nav>
  );
}
