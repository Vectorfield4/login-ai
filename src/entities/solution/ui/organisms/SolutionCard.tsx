import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { Solution } from "@/entities/solution/model/solutions";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { Typography } from "@/shared/ui/atoms/Typography";

interface SolutionCardProps {
  solution: Solution;
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
  content: { flexGrow: 1, display: "flex", flexDirection: "column", gap: tokens.spacing1 },
});

export function SolutionCard({ solution, t, lang, style }: SolutionCardProps) {
  const href = lang === "ru" ? `/solutions/${solution.slug}` : `/en/solutions/${solution.slug}`;
  return (
    <a href={href} {...stylex.props(styles.link, style)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <Typography variant="h6" component="h3">
            {t(solution.navTitle)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t(solution.tagline)}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
