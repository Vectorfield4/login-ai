import * as stylex from "@stylexjs/stylex";
import { getSolutionBySlug } from "@/shared/data/entities";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent, Chip, Typography } from "@/shared/ui/atoms";
import type { ResolvedItem } from "../../model/ecosystem.types";

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: tokens.radiusBorder,
    border: `1px solid ${tokens.colorDivider}`,
    backgroundColor: tokens.colorSurface,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacing1,
    padding: tokens.layoutCard,
  },
  badge: {
    fontSize: tokens.sizeBody2,
    fontWeight: 500,
    color: tokens.colorPrimary,
    backgroundColor: tokens.colorPrimarySoft,
    padding: `${tokens.spacing05} ${tokens.spacing2}`,
    borderRadius: tokens.radiusShape,
  },
});

/**
 * Карточка решения. Плотная колонка из трёх и более решений рендерится
 * строками (`CompactRowEco`) — карточка остаётся только для одного-двух
 * пунктов, где она ещё читается как карточка.
 */
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
          <Chip label={t("ui.ecosystem.badge.solution")} style={styles.badge} />
          <Typography variant="h6" component="h4">
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
