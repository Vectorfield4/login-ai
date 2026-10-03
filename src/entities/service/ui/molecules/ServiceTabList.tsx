import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
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

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    // Mobile: a horizontal icon-only strip that reads as a slider.
    "@media (max-width: 899px)": {
      flexDirection: "row",
      overflowX: "auto",
      gap: tokens.spacing1,
      scrollSnapType: "x mandatory",
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
  // The current tab has to be unmistakable: accent border, soft accent fill,
  // accent text and a left accent bar.
  active: {
    borderColor: tokens.colorAccent,
    backgroundColor: tokens.colorAccentSoft,
    color: tokens.colorAccent,
    boxShadow: `inset 3px 0 0 ${tokens.colorAccent}`,
    ":hover": { backgroundColor: tokens.colorAccentSoftHover },
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

  return (
    <nav aria-label={t("home.servicesTitle")} {...stylex.props(styles.list)}>
      {groupServices(services).map((bucket) => (
        <div key={bucket.group} {...stylex.props(styles.group)}>
          <span {...stylex.props(styles.heading)}>{t(`servicesGroups.${bucket.group}.label`)}</span>
          {bucket.services.map((service) => {
            const Icon: LucideIcon =
              typeof service.icon === "string" ? resolveEntityIcon(service.icon) : service.icon;
            const isActive = service.slug === activeSlug;
            return (
              <button
                key={service.slug}
                type="button"
                aria-current={isActive ? "true" : undefined}
                aria-label={t(service.navTitle)}
                onClick={() => onSelect(service.slug)}
                {...stylex.props(styles.tab, isActive && styles.active)}
              >
                <IconCircle size={32}>
                  <Icon size={16} />
                </IconCircle>
                <Typography variant="h6" component="span" style={styles.label}>
                  {t(service.navTitle)}
                </Typography>
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export default ServiceTabList;
