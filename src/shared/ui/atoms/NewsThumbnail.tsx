import * as stylex from "@stylexjs/stylex";
import type { FC } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type NewsCategory, NewsPlaceholder } from "./NewsPlaceholder";

interface ThumbnailImage {
  src: string;
  width: number;
  height: number;
}

interface NewsThumbnailProps {
  image?: ThumbnailImage;
  category?: NewsCategory;
  alt?: string;
  priority?: boolean;
}

const styles = stylex.create({
  wrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: tokens.thumbAspectRatioHorizontal,
    borderRadius: tokens.thumbRadius,
    overflow: "hidden",
    backgroundColor: "var(--color-surface)",
  },
  img: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: `transform ${tokens.transitionNormal} ${tokens.easingOut}`,
    outline: tokens.thumbOutline,
  },
  placeholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export const NewsThumbnail: FC<NewsThumbnailProps> = ({
  image,
  category,
  alt = "",
  priority = false,
}) => {
  if (!image) {
    return (
      <div {...stylex.props(styles.wrapper)}>
        <div {...stylex.props(styles.placeholder)}>
          <NewsPlaceholder category={category} />
        </div>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.wrapper)}>
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...stylex.props(styles.img)}
      />
    </div>
  );
};
