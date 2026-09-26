import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent, Typography } from "@/shared/ui/atoms";
import type { ResolvedItem } from "../model/ecosystem.types";

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: tokens.radiusBorder,
    borderTop: `4px solid ${tokens.colorPrimary}`,
    boxShadow: tokens.shadow2,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    padding: tokens.layoutCard,
  },
  metricValue: {
    fontSize: tokens.sizeH3,
    fontWeight: tokens.weightH3,
    color: tokens.colorPrimary,
    lineHeight: tokens.lineH3,
  },
  metricLabel: { fontSize: tokens.sizeBody2, color: tokens.colorTextSecondary },
  fallbackTitle: {
    fontSize: tokens.sizeH6,
    fontWeight: tokens.weightH6,
    color: tokens.colorPrimary,
  },
});

export function CaseCardEco({
  item,
  t,
  lang,
}: {
  item: ResolvedItem;
  t: TFunc;
  lang: "ru" | "en";
}) {
  const hasMetric = item.primaryMetric && /[\d%]/.test(t(item.primaryMetric.valueKey));

  return (
    <a href={routeUrl(item.href, lang)} {...stylex.props(styles.link)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          {hasMetric && item.primaryMetric ? (
            <>
              <Typography variant="h3" component="div" style={styles.metricValue}>
                {t(item.primaryMetric.valueKey)}
              </Typography>
              <Typography variant="body2" style={styles.metricLabel}>
                {t(item.primaryMetric.labelKey)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" component="h3" style={styles.fallbackTitle}>
              {t(item.titleKey)}
            </Typography>
          )}
          {item.noteKey && (
            <Typography variant="body2" color="textSecondary">
              {t(item.noteKey)}
            </Typography>
          )}
        </CardContent>
      </Card>
    </a>
  );
}
