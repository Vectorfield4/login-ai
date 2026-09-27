import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { FaqItem } from "@/shared/types/content";
import { Typography } from "@/shared/ui/atoms/Typography";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
  },
  item: {
    borderRadius: tokens.radiusBorder,
    border: `1px solid ${tokens.colorDivider}`,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    overflow: "hidden",
    // The open state lives on this <details>, so the rule hangs off it and
    // reaches the chevron of its own row: StyleX has no ancestor-conditional
    // style, and `summary > svg` is the only svg inside the row.
    "[open] summary > svg": { transform: "rotate(180deg)" },
  },
  summary: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing2,
    padding: `${tokens.spacing2} ${tokens.spacing3}`,
    listStyle: "none",
    cursor: "pointer",
    ":hover": { backgroundColor: tokens.colorActionHover },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: "-2px",
    },
  },
  question: { flexGrow: 1, minWidth: 0 },
  chevron: {
    flexShrink: 0,
    transition: `transform ${tokens.durationShort} ${tokens.easingInOut}`,
  },
  answer: {
    maxWidth: 720,
    padding: `0 ${tokens.spacing3} ${tokens.spacing2} ${tokens.spacing3}`,
  },
});

/**
 * FAQ accordion on native `<details>`/`<summary>`: toggling works without JS
 * and without hydration, and the answers stay in the HTML for crawlers. The
 * first question is expanded by default.
 */
export function FaqBlock({ items, lang }: { items: FaqItem[]; lang: AppLang }) {
  const t = useT(lang);
  return (
    <div {...stylex.props(styles.root)}>
      {items.map((item, index) => (
        <details key={item.question} open={index === 0} {...stylex.props(styles.item)}>
          <summary {...stylex.props(styles.summary)}>
            <Typography variant="h6" component="h3" style={styles.question}>
              {t(item.question)}
            </Typography>
            <ChevronDown size={20} aria-hidden="true" {...stylex.props(styles.chevron)} />
          </summary>
          <Typography variant="body2" color="textSecondary" style={styles.answer}>
            {t(item.answer)}
          </Typography>
        </details>
      ))}
    </div>
  );
}
