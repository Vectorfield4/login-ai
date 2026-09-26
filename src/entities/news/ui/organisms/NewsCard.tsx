import * as stylex from "@stylexjs/stylex";
import type { NewsItem } from "@/shared/data/news";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent, Chip, Typography } from "@/shared/ui/atoms";

interface NewsCardProps {
  item: NewsItem;
  t: TFunc;
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
  meta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacing1,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
  },
  dot: { color: tokens.colorDivider },
  tags: { display: "flex", flexWrap: "wrap", gap: tokens.spacing05 },
  readMore: {
    marginBlockStart: "auto",
    paddingBlockStart: tokens.spacing1,
    fontSize: tokens.sizeBody2,
    fontWeight: 700,
    color: tokens.colorPrimary,
  },
});

/**
 * Превью статьи в списке: дата, время чтения, теги, заголовок и лид.
 * Ссылка уже локализована в `item.href`, поэтому проп `lang` не нужен.
 */
export function NewsCard({ item, t }: NewsCardProps) {
  return (
    <a href={item.href} {...stylex.props(styles.link)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <div {...stylex.props(styles.meta)}>
            <time dateTime={item.publishedIso}>{item.publishedLabel}</time>
            <span {...stylex.props(styles.dot)} aria-hidden="true">
              ·
            </span>
            <span>{t("newsPage.readingTime", { minutes: item.readingTimeMin })}</span>
          </div>
          <Typography variant="h6" component="h3">
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.description}
          </Typography>
          {item.tags.length > 0 ? (
            <div {...stylex.props(styles.tags)}>
              {item.tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </div>
          ) : null}
          <span {...stylex.props(styles.readMore)}>{t("newsPage.readMore")}</span>
        </CardContent>
      </Card>
    </a>
  );
}
