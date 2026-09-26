import * as stylex from "@stylexjs/stylex";
import { getSolutionBySlug } from "@/shared/data/entities";
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
    borderRadius: tokens.radiusShape,
    boxShadow: tokens.shadow1,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    padding: tokens.layoutCard,
  },
});

export function SolutionCardEco({
  item,
  t,
  lang,
}: {
  item: ResolvedItem;
  t: TFunc;
  lang: "ru" | "en";
}) {
  const solution = getSolutionBySlug(item.slug);
  if (!solution) return null;
  return (
    <a href={routeUrl(item.href, lang)} {...stylex.props(styles.link)}>
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
