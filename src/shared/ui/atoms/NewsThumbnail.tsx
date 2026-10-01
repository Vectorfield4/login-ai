import * as stylex from "@stylexjs/stylex";
import type { FC } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { NewsCategory } from "@/shared/types/content";
import { NewsPlaceholder } from "./NewsPlaceholder";

interface ThumbnailImage {
  src: string;
  width: number;
  height: number;
  srcSet?: string;
}

interface NewsThumbnailProps {
  image?: ThumbnailImage;
  category?: NewsCategory;
  alt?: string;
}

/** Превью занимает 40% ширины карточки; сетка — контейнерные запросы, 1–4 колонки. */
const thumbSizes =
  "(max-width: 600px) 42vw, (max-width: 900px) 22vw, (max-width: 1200px) 15vw, 11vw";

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

export const NewsThumbnail: FC<NewsThumbnailProps> = ({ image, category, alt = "" }) => {
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
        srcSet={image.srcSet}
        sizes={image.srcSet ? thumbSizes : undefined}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...stylex.props(styles.img)}
      />
    </div>
  );
};
