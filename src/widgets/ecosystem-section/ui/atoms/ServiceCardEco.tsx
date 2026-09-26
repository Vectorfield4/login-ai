import * as stylex from "@stylexjs/stylex";
import { getServiceBySlug } from "@/shared/data/entities";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent, Chip, IconCircle, Typography } from "@/shared/ui/atoms";
import type { ResolvedItem } from "../../model/ecosystem.types";

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: tokens.radiusBorder,
    border: `1px solid ${tokens.colorDivider}`,
    boxShadow: "none",
    backgroundColor: tokens.colorSurface,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    padding: tokens.layoutCard,
  },
  header: { display: "flex", alignItems: "center", gap: tokens.spacing15 },
  badge: {
    fontSize: tokens.sizeBody2,
    fontWeight: 500,
    color: tokens.colorPrimary,
    backgroundColor: tokens.colorPrimarySoft,
    padding: `${tokens.spacing05} ${tokens.spacing2}`,
    borderRadius: tokens.radiusShape,
  },
});

export function ServiceCardEco({
  item,
  t,
  lang,
}: {
  item: ResolvedItem;
  t: TFunc;
  lang: "ru" | "en";
}) {
  const service = getServiceBySlug(item.slug);
  if (!service) return null;
  const Icon = typeof service.icon === "string" ? resolveEntityIcon(service.icon) : service.icon;
  return (
    <a href={routeUrl(item.href, lang)} {...stylex.props(styles.link)}>
      <Card style={styles.card}>
        <CardContent style={styles.content}>
          <div {...stylex.props(styles.header)}>
            <IconCircle size={32}>
              <Icon size={18} />
            </IconCircle>
            <Chip label={t("ui.ecosystem.badge.service")} style={styles.badge} />
          </div>
          <Typography variant="h6" component="h4">
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
