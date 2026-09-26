import * as stylex from "@stylexjs/stylex";
import type { FC } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";

const shimmerStyle = {
  background: `linear-gradient(90deg, var(--color-surface-variant) 25%, var(--color-surface) 50%, var(--color-surface-variant) 75%)`,
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite linear",
} as const;

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: tokens.spacing3,
    padding: tokens.densityDefault,
    borderRadius: tokens.radiusBorder,
    backgroundColor: "var(--color-surface)",
    border: `1px solid var(--color-divider)`,
  },
  content: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  thumbnail: {
    width: "40%",
    aspectRatio: tokens.thumbAspectRatioHorizontal,
    flexShrink: 0,
    borderRadius: tokens.thumbRadius,
  },
  title: {
    height: "2.5rem",
    borderRadius: tokens.spacing05,
  },
  excerpt: {
    height: "2.25rem",
    borderRadius: tokens.spacing05,
  },
  meta: {
    display: "flex",
    gap: tokens.spacing2,
    marginTop: tokens.spacing2,
  },
  metaItem: {
    height: "1rem",
    borderRadius: tokens.spacing05,
  },
  metaItemShort: {
    width: "6rem",
  },
  metaItemLong: {
    width: "10rem",
  },
});

export const NewsSkeleton: FC = () => (
  <article {...stylex.props(styles.card)}>
    <div {...stylex.props(styles.content)}>
      <div {...stylex.props(styles.title)} style={shimmerStyle} />
      <div {...stylex.props(styles.excerpt)} style={shimmerStyle} />
      <div {...stylex.props(styles.meta)}>
        <div {...stylex.props(styles.metaItem, styles.metaItemShort)} style={shimmerStyle} />
        <div {...stylex.props(styles.metaItem, styles.metaItemShort)} style={shimmerStyle} />
        <div {...stylex.props(styles.metaItem, styles.metaItemLong)} style={shimmerStyle} />
      </div>
    </div>
    <div {...stylex.props(styles.thumbnail)} style={shimmerStyle} aria-hidden="true" />
  </article>
);
