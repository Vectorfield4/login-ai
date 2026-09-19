import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "../../data/routes";
import { tokens } from "../../design/tokens.stylex.ts";

type BackLinkProps = {
  /** Clean path without the lang prefix (e.g. "/cases"). */
  to: string;
  /** Already-translated label. */
  label: string;
  lang: "ru" | "en";
};

const styles = stylex.create({
  root: {
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
    textDecoration: "none",
    ":hover": { color: tokens.colorPrimary, textDecoration: "underline" },
  },
});

/** «← назад» link at the top of detail pages (case, service, solution). */
export function BackLink({ to, label, lang }: BackLinkProps) {
  return (
    <a href={routeUrl(to, lang)} {...stylex.props(styles.root)}>
      {label}
    </a>
  );
}
