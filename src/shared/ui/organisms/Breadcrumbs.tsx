import * as stylex from "@stylexjs/stylex";
import { ArrowLeft } from "lucide-react";
import type { Breadcrumb } from "@/shared/data/breadcrumbs";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Container } from "../atoms/Container";
import { Section } from "../atoms/Section";

interface BreadcrumbsProps {
  items: Breadcrumb[];
  /** Parent page for the icon back link; omitted on section index pages. */
  backTo?: string;
  t: TFunc;
  lang: "ru" | "en";
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
  back: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    padding: tokens.spacing05,
    borderRadius: tokens.radiusShape,
    color: tokens.colorTextSecondary,
    textDecoration: "none",
    ":hover": { color: tokens.colorPrimary, backgroundColor: tokens.colorActionHover },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: "2px",
    },
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
 * an optional icon back link to the parent section plus the `nav > ol` trail
 * with `aria-current="page"` on the last crumb. Static markup, no hydration.
 */
export function Breadcrumbs({ items, backTo, t, lang }: BreadcrumbsProps) {
  return (
    <Section style={styles.band}>
      <Container>
        <nav aria-label={t("ui.breadcrumbs.label")} {...stylex.props(styles.nav)}>
          {backTo ? (
            <a
              href={routeUrl(backTo, lang)}
              aria-label={t("ui.breadcrumbs.back")}
              {...stylex.props(styles.back)}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </a>
          ) : null}
          <ol {...stylex.props(styles.list)}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={item.path ?? "current"} {...stylex.props(styles.item)}>
                  {isLast || !item.path ? (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      {...stylex.props(styles.current)}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <a href={routeUrl(item.path, lang)} {...stylex.props(styles.link)}>
                      {item.label}
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
