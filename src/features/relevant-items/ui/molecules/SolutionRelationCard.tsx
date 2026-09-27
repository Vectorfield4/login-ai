import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Card, CardContent, Chip, Typography } from "@/shared/ui/atoms";

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

interface SolutionRelationCardProps {
  titleKey: string;
  textKey: string;
  /** Путь от корня сайта, `routeUrl` добавит префикс языка. */
  href: string;
  lang: AppLang;
}

/**
 * Карточка решения внутри колонки «связанного»: бейдж типа, заголовок и
 * подпись. Заголовок — `h4`, потому что колонка уже заняла `h3` под `h2`
 * секции. Плотная колонка из трёх и более решений рендерится строками —
 * карточка остаётся для одного-двух пунктов, где она ещё читается как карточка.
 */
export function SolutionRelationCard({ titleKey, textKey, href, lang }: SolutionRelationCardProps) {
  const t = useT(lang);
  return (
    <a href={routeUrl(href, lang)} {...stylex.props(styles.link)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <Chip label={t("ui.ecosystem.badge.solution")} style={styles.badge} />
          <Typography variant="h6" component="h4">
            {t(titleKey)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t(textKey)}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
