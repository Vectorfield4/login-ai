import * as stylex from "@stylexjs/stylex";
import { Check, Clock } from "lucide-react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Typography } from "@/shared/ui/atoms/Typography";

interface ServiceTermListProps {
  /** i18n key of the block heading. */
  titleKey: string;
  /** i18n keys of the term lines. */
  items: string[];
  lang: AppLang;
}

const styles = stylex.create({
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    padding: tokens.spacing3,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    border: `1px solid ${tokens.colorDivider}`,
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
    color: tokens.colorPrimary,
    marginBottom: tokens.spacing1,
  },
  row: { display: "flex", alignItems: "center", gap: tokens.spacing1 },
  check: { color: tokens.colorSuccess, flexShrink: 0 },
});

/** Icon + text list of working terms (domain-bound molecule, data-driven). */
export function ServiceTermList({ titleKey, items, lang }: ServiceTermListProps) {
  const t = useT(lang);
  if (items.length === 0) return null;

  return (
    <div {...stylex.props(styles.panel)}>
      <div {...stylex.props(styles.head)}>
        <Clock size={18} aria-hidden="true" />
        <Typography variant="h6" component="h4">
          {t(titleKey)}
        </Typography>
      </div>
      {items.map((key) => (
        <div key={key} {...stylex.props(styles.row)}>
          <span {...stylex.props(styles.check)}>
            <Check size={16} aria-hidden="true" />
          </span>
          <Typography variant="body2" color="textSecondary">
            {t(key)}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default ServiceTermList;
