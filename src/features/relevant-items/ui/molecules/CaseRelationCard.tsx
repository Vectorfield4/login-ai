import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent, Typography } from "@/shared/ui/atoms";

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
    borderTop: `4px solid ${tokens.colorPrimary}`,
    boxShadow: tokens.shadow2,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing05,
    padding: tokens.layoutCard,
  },
  title: {
    fontSize: tokens.sizeH6,
    fontWeight: tokens.weightH6,
    lineHeight: tokens.lineH6,
    color: tokens.colorText,
  },
});

interface CaseRelationCardProps {
  titleKey: string;
  noteKey?: string;
  /** Путь от корня сайта, `routeUrl` добавит префикс языка. */
  href: string;
  t: TFunc;
  lang: "ru" | "en";
}

/**
 * Карточка кейса внутри колонки «связанного»: заголовок и примечание.
 * Метрика по умолчанию живёт в шапке колонки (`CaseColumn`), чтобы акцент
 * был один, а не в каждой карточке.
 */
export function CaseRelationCard({ titleKey, noteKey, href, t, lang }: CaseRelationCardProps) {
  return (
    <a href={routeUrl(href, lang)} {...stylex.props(styles.link)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <Typography variant="h6" component="h4" style={styles.title}>
            {t(titleKey)}
          </Typography>
          {noteKey ? (
            <Typography variant="body2" color="textSecondary">
              {t(noteKey)}
            </Typography>
          ) : null}
        </CardContent>
      </Card>
    </a>
  );
}
