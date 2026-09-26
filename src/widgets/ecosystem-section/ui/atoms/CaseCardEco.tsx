import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent, Typography } from "@/shared/ui/atoms";
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

/**
 * Карточка кейса: заголовок + примечание. Метрика вынесена в шапку колонки
 * (`EcosystemColumn`), чтобы акцент был один, а не в каждой карточке.
 */
export function CaseCardEco({
  item,
  t,
  lang,
}: {
  item: ResolvedItem;
  t: TFunc;
  lang: "ru" | "en";
}) {
  return (
    <a href={routeUrl(item.href, lang)} {...stylex.props(styles.link)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <Typography variant="h6" component="h4" style={styles.title}>
            {t(item.titleKey)}
          </Typography>
          {item.noteKey ? (
            <Typography variant="body2" color="textSecondary">
              {t(item.noteKey)}
            </Typography>
          ) : null}
        </CardContent>
      </Card>
    </a>
  );
}
