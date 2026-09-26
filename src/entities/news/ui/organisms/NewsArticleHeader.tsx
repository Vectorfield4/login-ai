import * as stylex from "@stylexjs/stylex";
import type { NewsItem } from "@/shared/data/news";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Chip, Typography } from "@/shared/ui/atoms";

interface NewsArticleHeaderProps {
  item: NewsItem;
  t: TFunc;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacing2,
    maxWidth: "72ch",
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
  updated: { fontStyle: "italic" },
  tags: { display: "flex", flexWrap: "wrap", gap: tokens.spacing05 },
});

/** Шапка статьи: H1, дата, время чтения, дата обновления и теги. */
export function NewsArticleHeader({ item, t }: NewsArticleHeaderProps) {
  return (
    <header {...stylex.props(styles.root)}>
      <Typography variant="h1" component="h1">
        {item.title}
      </Typography>
      <div {...stylex.props(styles.meta)}>
        <time dateTime={item.publishedIso}>{item.publishedLabel}</time>
        <span {...stylex.props(styles.dot)} aria-hidden="true">
          ·
        </span>
        <span>{t("newsPage.readingTime", { minutes: item.readingTimeMin })}</span>
        {item.updatedAt ? (
          <>
            <span {...stylex.props(styles.dot)} aria-hidden="true">
              ·
            </span>
            <span {...stylex.props(styles.updated)}>{t("newsPage.updatedAt")}</span>
          </>
        ) : null}
      </div>
      {item.tags.length > 0 ? (
        <div {...stylex.props(styles.tags)}>
          {item.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      ) : null}
    </header>
  );
}
