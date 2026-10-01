import * as stylex from "@stylexjs/stylex";
import type { HomeNewsItem } from "@/features/home-news/model/homeNews";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { NewsThumbnail } from "@/shared/ui/atoms";

interface HomeNewsCardProps {
  item: HomeNewsItem;
}

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: tokens.radiusBorder,
    overflow: "hidden",
    textDecoration: "none",
    color: "inherit",
    boxShadow: tokens.cardShadowRaised,
    transition: `transform ${tokens.transitionNormal} ${tokens.easingOut}, box-shadow ${tokens.transitionNormal} ${tokens.easingOut}`,
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.cardShadowRaisedHover,
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
    padding: tokens.spacing3,
    flex: 1,
  },
  title: {
    fontSize: tokens.sizeH6,
    fontWeight: tokens.weightH6,
    lineHeight: tokens.lineH6,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacing2,
    flexWrap: "wrap",
  },
  date: {
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: "var(--color-text-secondary)",
    fontVariantNumeric: "tabular-nums",
  },
  tags: {
    display: "flex",
    gap: tokens.spacing1,
    flexWrap: "wrap",
  },
  tag: {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: 1.4,
    color: tokens.colorPrimary,
    backgroundColor: tokens.colorPrimarySoft,
    borderRadius: tokens.radiusShape,
    padding: "2px 8px",
  },
});

/**
 * Компактная карточка новости для главной: обложка сверху, заголовок,
 * отрывок, дата и теги. Вся карточка кликабельна.
 */
export function HomeNewsCard({ item }: HomeNewsCardProps) {
  return (
    <article>
      <a
        href={item.href}
        {...stylex.props(styles.card)}
        aria-labelledby={`home-news-title-${item.slug}`}
      >
        <NewsThumbnail image={item.ogImage} category={item.category} alt="" />
        <div {...stylex.props(styles.content)}>
          <h3 id={`home-news-title-${item.slug}`} {...stylex.props(styles.title)}>
            {item.title}
          </h3>
          <p {...stylex.props(styles.excerpt)}>{item.excerpt}</p>
          <div {...stylex.props(styles.footer)}>
            <time {...stylex.props(styles.date)} dateTime={item.publishedIso}>
              {item.publishedLabel}
            </time>
            <div {...stylex.props(styles.tags)}>
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} {...stylex.props(styles.tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
