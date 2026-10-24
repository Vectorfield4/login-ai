import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Typography } from "@/shared/ui/atoms";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";

interface Example {
  asset: string;
  title: string;
  text: string;
  alt: string;
  layout: "plan" | "landscape" | "portrait" | "wide";
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: tokens.spacing4,
    "@media (min-width: 700px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
  figure: { margin: 0, minWidth: 0 },
  wide: { gridColumn: "1 / -1" },
  portrait: { "@media (min-width: 700px)": { gridRow: "span 2" } },
  link: {
    display: "block",
    borderRadius: tokens.radiusBorder,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    outlineOffset: 4,
    ":focus-visible": { outline: `2px solid ${tokens.colorPrimary}` },
  },
  image: { display: "block", width: "100%", height: "auto" },
  plan: {
    height: { default: 520, "@media (max-width: 699px)": 480 },
    objectFit: "contain",
    padding: tokens.spacing3,
    boxSizing: "border-box",
  },
  caption: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    paddingTop: tokens.spacing2,
  },
});

/** Static portfolio images with captions; no viewer is implied by the gallery. */
export function ProjectExamplesSection({
  id = "examples",
  alt = false,
  title,
  text,
  items,
  lang,
}: {
  id?: string;
  alt?: boolean;
  title: string;
  text: string;
  items: Example[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection id={id} alt={alt} title={t(title)} subtitle={t(text)}>
      <div {...stylex.props(styles.grid)}>
        {items.map((item) => (
          <figure
            key={item.asset}
            {...stylex.props(
              styles.figure,
              item.layout === "wide" && styles.wide,
              item.layout === "portrait" && styles.portrait,
            )}
          >
            <a href={item.src} {...stylex.props(styles.link)} aria-label={t(item.alt)}>
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes={
                  item.layout === "wide"
                    ? "(min-width: 1200px) 1120px, 100vw"
                    : "(min-width: 700px) 550px, 100vw"
                }
                width={item.width}
                height={item.height}
                alt={t(item.alt)}
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.image, item.layout === "plan" && styles.plan)}
              />
            </a>
            <figcaption {...stylex.props(styles.caption)}>
              <Typography variant="h6" component="h3">
                {t(item.title)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t(item.text)}
              </Typography>
            </figcaption>
          </figure>
        ))}
      </div>
    </BlockSection>
  );
}
