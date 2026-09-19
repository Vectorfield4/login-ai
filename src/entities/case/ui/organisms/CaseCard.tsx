import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { Case } from "@/entities/case/model/cases";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { Typography } from "@/shared/ui/atoms/Typography";

interface CaseCardProps {
  case: Case;
  t: TFunc;
  lang: "ru" | "en";
  hasOwnPage?: boolean;
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
  content: { flexGrow: 1, display: "flex", flexDirection: "column", gap: tokens.spacing1 },
});

export function CaseCard({ case: caseData, t, lang, style }: CaseCardProps) {
  const href = lang === "ru" ? `/cases/${caseData.slug}` : `/en/cases/${caseData.slug}`;
  return (
    <a href={href} {...stylex.props(styles.link, style)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <Typography variant="h6" component="h3">
            {t(caseData.title)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t(caseData.tagline)}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
