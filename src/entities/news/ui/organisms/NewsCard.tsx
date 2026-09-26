import * as stylex from "@stylexjs/stylex";
import type { NewsItem } from "@/entities/news/model/news";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { NewsCTA, NewsMeta, NewsThumbnail } from "@/shared/ui/atoms";

interface NewsCardProps {
  item: NewsItem;
  t: TFunc;
  elevation?: "flat" | "raised" | "outlined";
}

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
    borderRadius: tokens.radiusBorder,
    transition: `transform ${tokens.transitionNormal} ${tokens.easingOut}, box-shadow ${tokens.transitionNormal} ${tokens.easingOut}`,
  },
  linkRaised: {
    boxShadow: tokens.cardShadowRaised,
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.cardShadowRaisedHover,
    },
  },
  linkFlat: {
    boxShadow: tokens.cardShadowFlat,
    ":hover": {
      backgroundColor: tokens.colorActionHover,
    },
  },
  linkOutlined: {
    boxShadow: tokens.cardShadowOutlined,
    ":hover": {
      boxShadow: tokens.cardShadowRaisedHover,
    },
  },
  content: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: tokens.densityDefault,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
  },
  title: {
    fontSize: tokens.sizeH5,
    fontWeight: tokens.weightH5,
    lineHeight: tokens.lineH5,
    letterSpacing: tokens.lsH1,
    textWrap: "balance",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    margin: 0,
  },
  excerpt: {
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: "var(--color-text-secondary)",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    margin: 0,
    flex: 1,
  },
  footer: {
    marginTop: tokens.spacing2,
    paddingTop: tokens.spacing2,
    borderTop: `1px solid var(--color-divider)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacing2,
    flexWrap: "wrap",
  },
  thumbnail: {
    width: "40%",
    aspectRatio: tokens.thumbAspectRatioHorizontal,
    flexShrink: 0,
  },
});

/**
 * Превью статьи в списке: горизонтальная карточка (текст слева, изображение справа).
 * Заголовок — сверху, отрывок — посередине, мета — внизу.
 * Вся карточка кликабельна.
 */
export function NewsCard({ item, t, elevation = "raised" }: NewsCardProps) {
  const elevationStyles = {
    flat: styles.linkFlat,
    raised: styles.linkRaised,
    outlined: styles.linkOutlined,
  };

  return (
    <article>
      <a
        href={item.href}
        {...stylex.props(styles.link, elevationStyles[elevation])}
        aria-labelledby={`news-title-${item.slug}`}
      >
        <div {...stylex.props(styles.content)}>
          <header {...stylex.props(styles.header)}>
            <h2 id={`news-title-${item.slug}`} {...stylex.props(styles.title)}>
              {item.title}
            </h2>
            <p {...stylex.props(styles.excerpt)}>{item.excerpt ?? item.description}</p>
          </header>
          <footer {...stylex.props(styles.footer)}>
            <NewsMeta
              date={item.publishedLabel}
              isoDate={item.publishedIso}
              readingTime={item.readingTimeMin}
              author={item.author}
              category={item.category}
            />
            <NewsCTA t={t} />
          </footer>
        </div>
        <div {...stylex.props(styles.thumbnail)}>
          <NewsThumbnail
            image={
              item.ogImage
                ? { src: item.ogImage.src, width: item.ogImage.width, height: item.ogImage.height }
                : undefined
            }
            category={item.category}
            alt=""
          />
        </div>
      </a>
    </article>
  );
}
