import * as stylex from "@stylexjs/stylex";
import { resolveEntityIcon, type SvgIconComponent } from "@/shared/data/iconCatalog";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { IconCircle, Typography } from "@/shared/ui/atoms";

const styles = stylex.create({
  root: {
    position: "relative",
    display: "grid",
    borderRadius: tokens.radiusBorder,
    overflow: "hidden",
  },
  image: {
    gridArea: "1 / 1",
    width: "100%",
    height: "100%",
    minHeight: 240,
    objectFit: "cover",
    display: "block",
  },
  shade: {
    position: "absolute",
    inset: 0,
    backgroundImage: {
      default: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.78) 100%)",
      "@media (max-width: 699px)": "linear-gradient(180deg, rgba(0,0,0,0.66), rgba(0,0,0,0.84))",
    },
  },
  content: {
    position: "relative",
    gridArea: "1 / 1",
    alignSelf: "end",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
    padding: tokens.spacing3,
    color: "#ffffff",
  },
  heading: {
    display: "flex",
    flexDirection: { default: "row", "@media (max-width: 699px)": "column" },
    alignItems: { default: "center", "@media (max-width: 699px)": "flex-start" },
    gap: tokens.spacing2,
  },
  title: {
    fontSize: { default: tokens.sizeH2, "@media (max-width: 699px)": "1.875rem" },
    lineHeight: 1.2,
    textWrap: "balance",
  },
});

/** In-flow copy prevents long titles from being clipped by a short mobile image. */
export function ImageHero({
  image,
  title,
  description,
  icon,
  lang,
}: {
  image: { src: string; width: number; height: number };
  title: string;
  description: string;
  icon: SvgIconComponent;
  lang: AppLang;
}) {
  const t = useT(lang);
  const Icon = typeof icon === "string" ? resolveEntityIcon(icon) : icon;
  return (
    <div {...stylex.props(styles.root)}>
      <img {...image} alt="" loading="eager" {...stylex.props(styles.image)} />
      <div aria-hidden="true" {...stylex.props(styles.shade)} />
      <div {...stylex.props(styles.content)}>
        <div {...stylex.props(styles.heading)}>
          <IconCircle size={56} onImage>
            <Icon size={26} />
          </IconCircle>
          <Typography variant="h2" component="h1" itemProp="name" style={styles.title}>
            {t(title)}
          </Typography>
        </div>
        <Typography variant="body1" itemProp="description">
          {t(description)}
        </Typography>
      </div>
    </div>
  );
}
