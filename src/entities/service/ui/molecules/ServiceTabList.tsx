import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";
import { Typography } from "@/shared/ui/atoms/Typography";
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
    transitionProperty: "background-color, border-color, color",
    transitionDuration: tokens.durationShort,
    ":hover": { backgroundColor: tokens.colorActionHover },
  },
  active: {
    borderColor: tokens.colorPrimary,
    backgroundColor: tokens.colorSurface,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing05,
  },
  tagline: {
    display: "none",
    "@media (min-width: 900px)": { display: "block" },
  },
});

/**
 * Vertical list of service tabs. A stateless slice-bound molecule: it renders
 * one domain concept (the service catalog) and hands selection up via
 * `onSelect` — the active slug and the transition animation belong to the
 * widget that owns the interaction.
 */
export function ServiceTabList({ services, activeSlug, onSelect, lang }: ServiceTabListProps) {
  const t = useT(lang);

  return (
    <nav aria-label={t("home.servicesTitle")} {...stylex.props(styles.list)}>
      {services.map((service) => {
        const Icon: LucideIcon =
          typeof service.icon === "string" ? resolveEntityIcon(service.icon) : service.icon;
        const isActive = service.slug === activeSlug;
        return (
          <button
            key={service.slug}
            type="button"
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect(service.slug)}
            {...stylex.props(styles.tab, isActive && styles.active)}
          >
            <IconCircle size={40}>
              <Icon size={20} />
            </IconCircle>
            <span {...stylex.props(styles.body)}>
              <Typography variant="h6" component="span">
                {t(service.navTitle)}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                style={styles.tagline}
              >
                {t(service.tagline)}
              </Typography>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default ServiceTabList;
