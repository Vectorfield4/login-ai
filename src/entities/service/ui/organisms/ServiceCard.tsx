import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/entities/service/model/services";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";
import { Typography } from "@/shared/ui/atoms/Typography";

interface ServiceCardProps {
  service: Service;
  t: TFunc;
  lang: "ru" | "en";
  style?: StyleXStyles;
}

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
    height: "100%",
    boxSizing: "border-box",
    padding: tokens.layoutCard,
    borderRadius: tokens.radiusBorder,
    boxShadow: tokens.shadow1,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    textDecoration: "none",
    transition: `box-shadow ${tokens.durationShortest} ease, transform ${tokens.durationShortest} ease`,
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.shadow8,
    },
  },
  card: { flexGrow: 1, display: "flex", flexDirection: "column" },
  content: { flexGrow: 1, display: "flex", flexDirection: "column", gap: tokens.spacing1 },
});

export function ServiceCard({ service, t, lang, style }: ServiceCardProps) {
  const Icon = service.icon as unknown as LucideIcon;
  const href = routeUrl(`/services/${service.slug}`, lang);
  return (
    <a href={href} {...stylex.props(styles.link, style)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          {typeof Icon === "function" && (
            <IconCircle>
              <Icon size={22} />
            </IconCircle>
          )}
          <Typography variant="h6" component="h3">
            {t(service.navTitle)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t(service.tagline)}
          </Typography>
        </CardContent>
      </Card>
    </a>
  );
}
