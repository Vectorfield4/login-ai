import * as stylex from "@stylexjs/stylex";
import type { NewsItem } from "@/entities/news/model/news";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Chip, Typography } from "@/shared/ui/atoms";

interface NewsArticleHeaderProps {
  item: NewsItem;
  lang: AppLang;
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
export function NewsArticleHeader({ item, lang }: NewsArticleHeaderProps) {
  const t = useT(lang);
  return (
    <header
      itemScope
      itemProp="mainEntity"
      itemType={schemaIri(SCHEMA_TYPE.blogPosting)}
      {...stylex.props(styles.root)}
    >
      <Typography variant="h1" component="h1" itemProp="headline">
        {item.title}
      </Typography>
      <div {...stylex.props(styles.meta)}>
        <time dateTime={item.publishedIso} itemProp="datePublished">
          {item.publishedLabel}
        </time>
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
            <Chip key={tag} label={tag} itemProp="keywords" />
          ))}
        </div>
      ) : null}
    </header>
  );
}
