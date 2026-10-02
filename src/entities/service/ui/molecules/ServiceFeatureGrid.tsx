import * as stylex from "@stylexjs/stylex";
import { Check } from "lucide-react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Typography } from "@/shared/ui/atoms/Typography";
import type { ServiceFeature } from "../../model/services";

interface ServiceFeatureGridProps {
  /** i18n key of the block heading. */
  titleKey: string;
  features: ServiceFeature[];
  lang: AppLang;
}

const styles = stylex.create({
  heading: { marginBottom: tokens.spacing2 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: tokens.spacing2,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing05,
    padding: tokens.spacing2,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurface,
    border: `1px solid ${tokens.colorDivider}`,
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
    color: tokens.colorPrimary,
  },
});

/**
 * Service benefits: a responsive grid of feature cards. Domain-bound molecule
 * of one service; the heading arrives as an i18n key and is translated here.
 */
export function ServiceFeatureGrid({ titleKey, features, lang }: ServiceFeatureGridProps) {
  const t = useT(lang);
  if (features.length === 0) return null;

  return (
    <div>
      <Typography variant="h6" component="h4" style={styles.heading}>
        {t(titleKey)}
      </Typography>
      <div {...stylex.props(styles.grid)}>
        {features.map((feature) => (
          <div key={feature.title} {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.head)}>
              <Check size={18} aria-hidden="true" />
              <Typography variant="h6" component="h5">
                {t(feature.title)}
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary">
              {t(feature.text)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceFeatureGrid;
