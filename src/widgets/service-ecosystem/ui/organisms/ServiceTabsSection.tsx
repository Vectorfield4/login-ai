import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Service, ServiceSpotlight, ServiceTabList } from "@/entities/service";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { ImageSource } from "@/shared/types/content";
import { Container } from "@/shared/ui/atoms/Container";
import { Grid } from "@/shared/ui/atoms/Grid";
import { Section } from "@/shared/ui/atoms/Section";
import { SectionHeader } from "@/shared/ui/molecules/SectionHeader";

interface ServiceTabsSectionProps {
  services: Service[];
  lang: AppLang;
  /** Optional optimized cover per service slug, mapped by the page in `app/data`. */
  images?: Record<string, ImageSource>;
  /** Section background alternation and anchor, owned by the page. */
  alt?: boolean;
  id?: string;
}

const styles = stylex.create({
  tabs: {
    position: "sticky",
    top: tokens.spacing4,
    alignSelf: "flex-start",
  },
});

/**
 * Home services section: a tab list on the left and the selected service on the
 * right. The section owns the interaction — active slug plus the GSAP
 * transition — while the pieces live in the entity slice (`ServiceTabList`,
 * `ServiceSpotlight`). Mounted as an island (`client:visible`).
 */
export function ServiceTabsSection({ services, lang, images, alt, id }: ServiceTabsSectionProps) {
  const t = useT(lang);
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug ?? "");
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeService = services.find((service) => service.slug === activeSlug) ?? services[0];

  // Re-runs on purpose when the active slug changes: the two panels replay
  // their entrance tween. The body touches only refs, so Biome cannot see the
  // dependency — hence the ignore.
  // biome-ignore lint/correctness/useExhaustiveDependencies: replay on tab change
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = gsap.timeline();
    if (tabsRef.current) {
      timeline.fromTo(
        tabsRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" },
        0,
      );
    }
    if (contentRef.current) {
      timeline.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.05,
      );
    }
    return () => {
      timeline.kill();
    };
  }, [activeSlug]);

  const handleSelect = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  if (!activeService) return null;

  return (
    <Section alt={alt} id={id}>
      <Container>
        <SectionHeader
          eyebrow={t("home.servicesEyebrow")}
          title={t("home.servicesTitle")}
          subtitle={t("home.servicesSubtitle")}
          action={{
            label: t("home.servicesAll"),
            href: routeUrl("/services", lang),
            variant: "soft",
          }}
        />
        <Grid container spacing={4}>
          <Grid item size={12} md={3}>
            <div ref={tabsRef} {...stylex.props(styles.tabs)}>
              <ServiceTabList
                services={services}
                activeSlug={activeSlug}
                onSelect={handleSelect}
                lang={lang}
              />
            </div>
          </Grid>
          <Grid item size={12} md={9}>
            <div ref={contentRef}>
              <ServiceSpotlight
                service={activeService}
                lang={lang}
                image={images?.[activeService.slug]}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default ServiceTabsSection;
