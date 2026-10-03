import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { ImageSource } from "@/shared/types/content";
import { Button } from "@/shared/ui/atoms/Button";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";
import { Typography } from "@/shared/ui/atoms/Typography";
import type { Service } from "../../model/services";
import { ServiceFeatureGrid } from "../molecules/ServiceFeatureGrid";
import { ServiceProcessTimeline } from "../molecules/ServiceProcessTimeline";
import { ServiceTermList } from "../molecules/ServiceTermList";

interface ServiceSpotlightProps {
  service: Service;
  lang: AppLang;
  /**
   * Render-ready source produced by Astro's optimizer and mapped in
   * `app/data/*`. Optional: without it the block falls back to the entity icon,
   * so entities stay free of `astro`/`ImageMetadata`. When present, the title
   * and description are laid over the image behind a scrim.
   */
  image?: ImageSource;
}

/** Copy longer than this on the slide collapses behind "Читать далее". */
const MAX_DESCRIPTION = 220;

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing4,
    height: "100%",
  },
  lead: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    // Pin the service name to the top of the screen on mobile.
    "@media (max-width: 899px)": {
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: tokens.colorSurface,
      paddingBlock: tokens.spacing1,
    },
  },
  visual: {
    position: "relative",
    overflow: "hidden",
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 240,
    aspectRatio: "16 / 9",
  },
  img: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  // Keeps the overlaid copy readable on any backdrop.
  scrim: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.78) 100%)",
  },
  overlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    padding: tokens.spacing4,
    color: "#FFFFFF",
  },
  overlayText: { color: "rgba(255, 255, 255, 0.85)" },
  readMore: {
    alignSelf: "flex-start",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorSuccess,
    fontWeight: 600,
    font: "inherit",
    cursor: "pointer",
  },
  readMoreOverlay: { color: "#81C784" },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacing2,
    marginTop: "auto",
  },
});

/**
 * Detailed view of one service: lead, visual, benefits, process, terms and the
 * two calls to action. An entity organism — it renders a single domain concept
 * and stays image-agnostic. The home section supplies the optimized `image`.
 *
 * With a backdrop the title and description sit on the image behind a bottom
 * scrim; without one the block falls back to plain copy plus the entity icon.
 * Copy longer than `MAX_DESCRIPTION` collapses behind a "Читать далее" toggle.
 */
export function ServiceSpotlight({ service, lang, image }: ServiceSpotlightProps) {
  const t = useT(lang);
  const [expanded, setExpanded] = useState(false);
  const Icon: LucideIcon =
    typeof service.icon === "string" ? resolveEntityIcon(service.icon) : service.icon;

  const description = t(service.description);
  const isLong = description.length > MAX_DESCRIPTION;
  const shown =
    isLong && !expanded ? `${description.slice(0, MAX_DESCRIPTION).trimEnd()}…` : description;

  const toggle = isLong ? (
    <button
      type="button"
      onClick={() => setExpanded((open) => !open)}
      {...stylex.props(styles.readMore, image && styles.readMoreOverlay)}
    >
      {t(expanded ? "home.servicesShowLess" : "home.servicesReadMore")}
    </button>
  ) : null;

  return (
    <article {...stylex.props(styles.root)}>
      {image ? (
        <div {...stylex.props(styles.visual)}>
          <img
            src={image.src}
            alt={image.alt ?? ""}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.img)}
          />
          <div {...stylex.props(styles.scrim)} aria-hidden="true" />
          <div {...stylex.props(styles.overlay)}>
            <Typography variant="h3" component="h3">
              {t(service.title)}
            </Typography>
            <Typography variant="body1" style={styles.overlayText}>
              {shown}
            </Typography>
            {toggle}
          </div>
        </div>
      ) : (
        <>
          <div {...stylex.props(styles.lead)}>
            <Typography variant="h3" component="h3">
              {t(service.title)}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {shown}
            </Typography>
            {toggle}
          </div>
          <div {...stylex.props(styles.visual)}>
            <IconCircle size={64}>
              <Icon size={32} />
            </IconCircle>
          </div>
        </>
      )}

      <ServiceFeatureGrid
        titleKey="home.servicesBenefitsTitle"
        features={service.features.slice(0, 3)}
        lang={lang}
      />
      <ServiceProcessTimeline
        titleKey="home.servicesProcessTitle"
        steps={service.processSteps ?? []}
        lang={lang}
      />
      <ServiceTermList
        titleKey="home.servicesTermsTitle"
        items={["home.servicesTermsScope", "home.servicesTermsSupport"]}
        lang={lang}
      />

      <div {...stylex.props(styles.actions)}>
        <Button variant="contained" size="large" href={routeUrl(`/services/${service.slug}`, lang)}>
          {t("home.servicesDetailCta")}
        </Button>
        <Button variant="outlined" size="large" href={routeUrl("/contacts", lang)}>
          {t("home.servicesOrderCta")}
        </Button>
      </div>
    </article>
  );
}

export default ServiceSpotlight;
