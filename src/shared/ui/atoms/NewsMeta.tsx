import * as stylex from "@stylexjs/stylex";
import { Calendar, Clock, User } from "lucide-react";
import type { FC } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { AppLang } from "@/shared/hooks/useT";
import type { NewsCategory } from "@/shared/types/content";
import { NewsCategoryLabel } from "./NewsCategoryLabel";

interface NewsMetaProps {
  date: string;
  isoDate: string;
  readingTime: number;
  lang: AppLang;
  author?: { name: string; avatar?: string; role?: string };
  category?: NewsCategory;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacing1,
    rowGap: tokens.spacing05,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: "var(--colorTextSecondary)",
    fontVariantNumeric: "tabular-nums",
  },
  // An entry owns its leading separator, so a wrap moves the "·" together with
  // the value it introduces instead of leaving a lone dot at a line edge.
  entry: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing1,
    whiteSpace: "nowrap",
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing05,
  },
  icon: {
    flexShrink: 0,
    width: "1em",
    height: "1em",
    opacity: 0.7,
  },
  separator: {
    opacity: 0.4,
  },
  authorAvatar: {
    width: "1.25em",
    height: "1.25em",
    borderRadius: "50%",
    objectFit: "cover",
  },
  authorName: {
    fontWeight: 500,
    color: "var(--colorText)",
  },
});

export const NewsMeta: FC<NewsMetaProps> = ({
  date,
  isoDate,
  readingTime,
  lang,
  author,
  category,
}) => {
  return (
    <div {...stylex.props(styles.root)}>
      <time {...stylex.props(styles.entry)} dateTime={isoDate}>
        <span {...stylex.props(styles.item)}>
          <Calendar {...stylex.props(styles.icon)} aria-hidden="true" />
          <span>{date}</span>
        </span>
      </time>
      <span {...stylex.props(styles.entry)}>
        <span {...stylex.props(styles.separator)} aria-hidden="true">
          ·
        </span>
        <span {...stylex.props(styles.item)}>
          <Clock {...stylex.props(styles.icon)} aria-hidden="true" />
          <span>{readingTime} мин</span>
        </span>
      </span>
      {category && (
        <span {...stylex.props(styles.entry)}>
          <span {...stylex.props(styles.separator)} aria-hidden="true">
            ·
          </span>
          <NewsCategoryLabel category={category} lang={lang} size="sm" />
        </span>
      )}
      {author && (
        <span {...stylex.props(styles.entry)}>
          <span {...stylex.props(styles.separator)} aria-hidden="true">
            ·
          </span>
          <span {...stylex.props(styles.item)}>
            <User {...stylex.props(styles.icon)} aria-hidden="true" />
            {author.avatar ? (
              <img
                src={author.avatar}
                alt=""
                {...stylex.props(styles.authorAvatar)}
                aria-hidden="true"
              />
            ) : null}
            <span {...stylex.props(styles.authorName)}>{author.name}</span>
          </span>
        </span>
      )}
    </div>
  );
};
