import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
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
   * so entities stay free of `astro`/`ImageMetadata`.
   */
  image?: ImageSource;
}

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
  },
  visual: {
    width: "100%",
    overflow: "hidden",
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  img: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
  },
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
 */
export function ServiceSpotlight({ service, lang, image }: ServiceSpotlightProps) {
  const t = useT(lang);
  const Icon: LucideIcon =
    typeof service.icon === "string" ? resolveEntityIcon(service.icon) : service.icon;

  return (
    <article {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.lead)}>
        <Typography variant="h3" component="h3">
          {t(service.title)}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {t(service.description)}
        </Typography>
      </div>

      <div {...stylex.props(styles.visual)}>
        {image ? (
          <img
            src={image.src}
            alt={image.alt ?? t(service.title)}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.img)}
          />
        ) : (
          <IconCircle size={64}>
            <Icon size={32} />
          </IconCircle>
        )}
      </div>

      <ServiceFeatureGrid
        titleKey="home.servicesBenefitsTitle"
        features={service.features}
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
