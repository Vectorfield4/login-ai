import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import type { Case } from "@/entities/case/model/cases";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import Chip from "@/shared/ui/atoms/Chip";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";
import { Typography } from "@/shared/ui/atoms/Typography";

interface CaseCardProps {
  case: Case;
  t: TFunc;
  lang: "ru" | "en";
  style?: StyleXStyles;
}

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
  },
  card: { flexGrow: 1, display: "flex", flexDirection: "column" },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacing1,
  },
  topRow: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  metricWrap: {
    marginBlockStart: "auto",
    paddingBlockStart: tokens.spacing1,
    borderTop: `1px solid ${tokens.colorDivider}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing05,
  },
  metricValue: {
    fontSize: tokens.sizeH6,
    fontWeight: 700,
    lineHeight: tokens.lineH6,
    color: tokens.colorPrimary,
    fontVariantNumeric: "tabular-nums",
  },
  metricLabel: {
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
  },
});

export function CaseCard({ case: caseData, t, lang, style }: CaseCardProps) {
  const Icon: LucideIcon =
    typeof caseData.icon === "string" ? resolveEntityIcon(caseData.icon) : caseData.icon;
  const href = routeUrl(`/cases/${caseData.slug}`, lang);
  const metric = caseData.metrics[0];
  return (
    <a href={href} {...stylex.props(styles.link, style)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <div {...stylex.props(styles.topRow)}>
            <IconCircle size={44}>
              <Icon size={20} />
            </IconCircle>
            <Chip label={t(caseData.industryKey)} />
          </div>
          <Typography variant="h6" component="h3">
            {t(caseData.title)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t(caseData.tagline)}
          </Typography>
          <div {...stylex.props(styles.metricWrap)}>
            <span {...stylex.props(styles.metricValue)}>{t(metric.value)}</span>
            <span {...stylex.props(styles.metricLabel)}>{t(metric.label)}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
