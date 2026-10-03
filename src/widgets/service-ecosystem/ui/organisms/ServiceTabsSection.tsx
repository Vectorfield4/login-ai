import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type TouchEvent, useCallback, useEffect, useRef, useState } from "react";
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

/** Minimum horizontal travel (px) that counts as a service switch. */
const SWIPE_THRESHOLD = 48;

const controlsIn = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const styles = stylex.create({
  tabs: {
    position: "sticky",
    top: tokens.spacing4,
    alignSelf: "flex-start",
  },
  // Mobile: the picture leads, the icon picker follows under it.
  tabsItem: {
    minWidth: 0,
    "@media (max-width: 899px)": { order: 2 },
  },
  contentItem: {
    minWidth: 0,
    "@media (max-width: 899px)": { order: 1 },
  },
  // Keep vertical scrolling while capturing horizontal swipes on mobile.
  swipeArea: {
    touchAction: "pan-y",
  },
  // Slider controls: only below `md`, where the strip scrolls horizontally.
  controls: {
    display: "none",
    "@media (max-width: 899px)": {
      display: "flex",
      justifyContent: "center",
      gap: tokens.spacing1,
      marginBottom: tokens.spacing2,
    },
    "@media (max-width: 899px) and (prefers-reduced-motion: no-preference)": {
      animationName: controlsIn,
      animationDuration: tokens.durationStandard,
      animationTimingFunction: tokens.easingOut,
    },
  },
  arrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: tokens.colorDivider,
    borderRadius: tokens.radiusShape,
    backgroundColor: "transparent",
    color: tokens.colorText,
    cursor: "pointer",
    ":disabled": { opacity: 0.4, cursor: "default" },
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
  const swipeStartX = useRef<number | null>(null);

  const activeService = services.find((service) => service.slug === activeSlug) ?? services[0];
  const activeIndex = services.findIndex((service) => service.slug === activeSlug);
  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= services.length - 1;

  // Move by one service; used by the mobile swipe (left = next, right = previous).
  const step = (offset: number) => {
    const index = services.findIndex((service) => service.slug === activeSlug);
    const next = index + offset;
    if (next < 0 || next >= services.length) return;
    setActiveSlug(services[next].slug);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    swipeStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStartX.current;
    swipeStartX.current = null;
    if (start == null) return;
    const end = event.changedTouches[0]?.clientX ?? start;
    const delta = end - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    step(delta < 0 ? 1 : -1);
  };

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
          <Grid item size={12} md={3} style={styles.tabsItem}>
            <div ref={tabsRef} {...stylex.props(styles.tabs)}>
              <div {...stylex.props(styles.controls)}>
                <button
                  type="button"
                  aria-label={t("home.servicesPrev")}
                  disabled={atStart}
                  onClick={() => step(-1)}
                  {...stylex.props(styles.arrow)}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={t("home.servicesNext")}
                  disabled={atEnd}
                  onClick={() => step(1)}
                  {...stylex.props(styles.arrow)}
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
              <ServiceTabList
                services={services}
                activeSlug={activeSlug}
                onSelect={handleSelect}
                lang={lang}
              />
            </div>
          </Grid>
          <Grid item size={12} md={9} style={styles.contentItem}>
            <div
              ref={contentRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              {...stylex.props(styles.swipeArea)}
            >
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
