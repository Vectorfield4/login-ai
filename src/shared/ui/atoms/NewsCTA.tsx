import * as stylex from "@stylexjs/stylex";
import { ArrowRight } from "lucide-react";
import type { FC } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";

interface NewsCTAProps {
  t: TFunc;
}

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
    fontSize: tokens.sizeBody2,
    fontWeight: 600,
    color: "var(--colorPrimary)",
    textDecoration: "none",
    transition: `color ${tokens.transitionFast} ${tokens.easingOut}`,
    ":hover": {
      color: "var(--colorPrimaryDark)",
    },
    ":focus-visible": {
      outline: `2px solid var(--colorPrimary)`,
      outlineOffset: "2px",
      borderRadius: "2px",
    },
  },
  icon: {
    flexShrink: 0,
    width: "1em",
    height: "1em",
    transition: `transform ${tokens.transitionFast} ${tokens.easingOut}`,
  },
  iconHover: {
    transform: "translateX(2px)",
  },
});

export const NewsCTA: FC<NewsCTAProps> = ({ t }) => (
  <span {...stylex.props(styles.root)}>
    {t("newsPage.readMore")}
    <ArrowRight {...stylex.props(styles.icon)} aria-hidden="true" />
  </span>
);
