import * as stylex from "@stylexjs/stylex";
import type { Breadcrumb } from "@/shared/data/breadcrumbs";
import { routeUrl } from "@/shared/data/routes";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Container } from "../atoms/Container";
import { ListItemPosition } from "../atoms/ListItemScope";
import { Section } from "../atoms/Section";

interface BreadcrumbsProps {
  items: Breadcrumb[];
  lang: AppLang;
}

const styles = stylex.create({
  band: {
    paddingBlock: tokens.spacing15,
    backgroundColor: tokens.colorSurface,
    borderBottom: `1px solid ${tokens.colorDivider}`,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing15,
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacing05,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing05,
    minWidth: 0,
  },
  link: {
    color: tokens.colorTextSecondary,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    textDecoration: "none",
    ":hover": { color: tokens.colorPrimary, textDecoration: "underline" },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: "2px",
    },
  },
  current: {
    color: tokens.colorText,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    fontWeight: 600,
  },
  separator: {
    color: tokens.colorDivider,
    fontSize: tokens.sizeBody2,
  },
});

/**
 * Breadcrumb band rendered as the first block of every page below the app bar:
 * the `nav > ol` trail with `aria-current="page"` on the last crumb. Static
 * markup, no hydration.
 */
export function Breadcrumbs({ items, lang }: BreadcrumbsProps) {
  const t = useT(lang);
  return (
    <Section style={styles.band}>
      <Container>
        <nav
          aria-label={t("ui.breadcrumbs.label")}
          itemScope
          itemType={schemaIri(SCHEMA_TYPE.breadcrumbList)}
          {...stylex.props(styles.nav)}
        >
          <ol {...stylex.props(styles.list)}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li
                  key={item.path ?? "current"}
                  itemScope
                  itemProp="itemListElement"
                  itemType={schemaIri(SCHEMA_TYPE.listItem)}
                  {...stylex.props(styles.item)}
                >
                  <ListItemPosition value={index + 1} />
                  {isLast || !item.path ? (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      itemProp="name"
                      {...stylex.props(styles.current)}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <a
                      href={routeUrl(item.path, lang)}
                      itemProp="item"
                      {...stylex.props(styles.link)}
                    >
                      <span itemProp="name">{item.label}</span>
                    </a>
                  )}
                  {isLast ? null : (
                    <span aria-hidden="true" {...stylex.props(styles.separator)}>
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </Section>
  );
}
