import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import { Fragment } from "react";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";
import { Typography } from "@/shared/ui/atoms/Typography";
import { groupServices } from "../../model/groupServices";
import type { Service } from "../../model/services";

interface ServiceTabListProps {
  services: Service[];
  activeSlug: string;
  onSelect: (slug: string) => void;
  lang: AppLang;
}

// Breakpoint transitions cannot tween the reflow itself (order/display/flex are
// not animatable), so each side of `md` fades its own copy in. Swapping the
// animation-name when the media query flips restarts the tween.
const listInFromSide = stylex.keyframes({
  from: { opacity: 0, transform: "translateX(-12px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});
const listInFromBottom = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    "@media (min-width: 900px) and (prefers-reduced-motion: no-preference)": {
      animationName: listInFromSide,
      animationDuration: tokens.durationStandard,
      animationTimingFunction: tokens.easingOut,
    },
    // Mobile: a horizontal icon-only strip that reads as a slider. `safe center`
    // centers the icons under the picture and falls back to start alignment when
    // the strip overflows, so the first icon stays reachable.
    "@media (max-width: 899px)": {
      flexDirection: "row",
      overflowX: "auto",
      justifyContent: "safe center",
      gap: tokens.spacing1,
      scrollSnapType: "x mandatory",
    },
    "@media (max-width: 899px) and (prefers-reduced-motion: no-preference)": {
      animationName: listInFromBottom,
      animationDuration: tokens.durationStandard,
      animationTimingFunction: tokens.easingOut,
    },
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    // Flatten so the mobile row lays services out across all groups.
    "@media (max-width: 899px)": { display: "contents" },
  },
  heading: {
    paddingInlineStart: tokens.spacing2,
    fontSize: tokens.sizeBody2,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: tokens.colorTextSecondary,
    "@media (max-width: 899px)": { display: "none" },
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing2,
    width: "100%",
    padding: tokens.spacing2,
    textAlign: "left",
    cursor: "pointer",
    borderRadius: tokens.radiusBorder,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "transparent",
    color: tokens.colorText,
    transitionProperty: "background-color, border-color, color, box-shadow",
    transitionDuration: tokens.durationShort,
    ":hover": { backgroundColor: tokens.colorActionHover },
    "@media (max-width: 899px)": {
      width: "auto",
      flexShrink: 0,
      scrollSnapAlign: "start",
      justifyContent: "center",
      padding: tokens.spacing1,
    },
  },
  // The current tab is unmistakable: the whole button is filled with primary,
  // the icon and label go white, and a thicker bottom border marks it. The
  // border shares the fill color, so it reads as a solid base rather than a line.
  active: {
    borderBottomWidth: 2,
    borderBottomColor: tokens.colorPrimary,
    backgroundColor: tokens.colorPrimary,
    color: tokens.colorPrimaryContrastText,
    ":hover": { backgroundColor: tokens.colorPrimaryDark },
  },
  // On the filled tab the soft icon circle would muddy the red: drop its fill
  // and let the white glyph sit on the primary background.
  activeIcon: {
    backgroundColor: "transparent",
    color: tokens.colorPrimaryContrastText,
  },
  // Decorative dotted divider between icons; mobile strip only.
  separator: {
    display: "none",
    "@media (max-width: 899px)": {
      display: "block",
      flexShrink: 0,
      alignSelf: "center",
      height: 24,
      borderLeftWidth: 1,
      borderLeftStyle: "dotted",
      borderLeftColor: tokens.colorDivider,
    },
  },
  // Long Russian words ("высоконагруженные") must not overflow the column.
  label: {
    flexGrow: 1,
    overflowWrap: "anywhere",
    textAlign: "left",
    "@media (max-width: 899px)": { display: "none" },
  },
});

/**
 * Service tabs, grouped by category. A stateless slice-bound molecule: it
 * renders one domain concept (the service catalog) and hands selection up via
 * `onSelect` — the active slug and the transition animation belong to the
 * widget that owns the interaction.
 */
export function ServiceTabList({ services, activeSlug, onSelect, lang }: ServiceTabListProps) {
  const t = useT(lang);
  // Running index across groups: the mobile strip flattens the groups, so the
  // dotted dividers have to span every icon, not just the ones inside a bucket.
  let flatIndex = 0;

  return (
    <nav aria-label={t("home.servicesTitle")} {...stylex.props(styles.list)}>
      {groupServices(services).map((bucket) => (
        <div key={bucket.group} {...stylex.props(styles.group)}>
          <span {...stylex.props(styles.heading)}>{t(`servicesGroups.${bucket.group}.label`)}</span>
          {bucket.services.map((service) => {
            const Icon: LucideIcon =
              typeof service.icon === "string" ? resolveEntityIcon(service.icon) : service.icon;
            const isActive = service.slug === activeSlug;
            const isFirst = flatIndex === 0;
            flatIndex += 1;
            return (
              <Fragment key={service.slug}>
                {isFirst ? null : <span aria-hidden="true" {...stylex.props(styles.separator)} />}
                <button
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  aria-label={t(service.navTitle)}
                  onClick={() => onSelect(service.slug)}
                  {...stylex.props(styles.tab, isActive && styles.active)}
                >
                  <IconCircle size={32} style={isActive ? styles.activeIcon : undefined}>
                    <Icon size={16} />
                  </IconCircle>
                  <Typography variant="h6" component="span" style={styles.label}>
                    {t(service.navTitle)}
                  </Typography>
                </button>
              </Fragment>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export default ServiceTabList;
