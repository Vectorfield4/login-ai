import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { type Service, ServiceSpotlight, ServiceTabList } from "@/entities/service";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useBreakpointDown } from "@/shared/hooks/useMatchMedia";
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

/** Every candidate URL of a cover: all `srcSet` entries, else the single `src`. */
function coverCandidates(image: ImageSource): string[] {
  if (!image.srcSet) return [image.src];
  return image.srcSet
    .split(",")
    .map((entry) => entry.trim().split(" ")[0])
    .filter((src) => src.length > 0);
}

const styles = stylex.create({
  // Desktop left column; on mobile the picker moves into the spotlight.
  tabs: {
    position: "sticky",
    top: tokens.spacing4,
    alignSelf: "flex-start",
  },
  // Keep vertical scrolling while capturing horizontal swipes on mobile.
  swipeArea: {
    touchAction: "pan-y",
  },
  // Overlaid on the hero image, so the arrows read as part of the picture.
  arrow: {
    pointerEvents: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderWidth: 0,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    color: "#FFFFFF",
    cursor: "pointer",
    ":hover": { backgroundColor: "rgba(0, 0, 0, 0.65)" },
    ":disabled": { opacity: 0.35, cursor: "default" },
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
  const isMobile = useBreakpointDown("md");
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

  // Warm every cover once the island is on screen so a tab switch swaps the
  // picture from cache. Without this the previous frame lingers while the next
  // file downloads, which reads as the visual "hanging" on the old image.
  useEffect(() => {
    if (typeof window === "undefined" || !images) return;
    const sources = new Set(Object.values(images).flatMap(coverCandidates));
    const preload = () => {
      for (const src of sources) {
        const image = new Image();
        image.src = src;
      }
    };
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(preload);
      return () => window.cancelIdleCallback(handle);
    }
    const timer = window.setTimeout(preload, 200);
    return () => window.clearTimeout(timer);
  }, [images]);

  const handleSelect = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  if (!activeService) return null;

  const tabList = (
    <ServiceTabList
      services={services}
      activeSlug={activeSlug}
      onSelect={handleSelect}
      lang={lang}
    />
  );

  // Mobile: the arrows sit on the picture, the strip drops between the picture
  // and the benefits. Desktop keeps the vertical list in its own column.
  const arrows = (
    <>
      <button
        type="button"
        aria-label={t("home.servicesPrev")}
        disabled={atStart}
        onClick={() => step(-1)}
        {...stylex.props(styles.arrow)}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={t("home.servicesNext")}
        disabled={atEnd}
        onClick={() => step(1)}
        {...stylex.props(styles.arrow)}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </>
  );

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
        {/* spacing 4 (32px) makes the 11 column gaps 352px, wider than a 320px
            phone's content box: the tracks collapse and the 12-span item spills. */}
        <Grid container spacing={3}>
          {isMobile ? null : (
            <Grid item size={12} md={3}>
              <div ref={tabsRef} {...stylex.props(styles.tabs)}>
                {tabList}
              </div>
            </Grid>
          )}
          <Grid item size={12} md={9}>
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
                overlayControls={isMobile ? arrows : undefined}
                afterVisual={isMobile ? tabList : undefined}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default ServiceTabsSection;
