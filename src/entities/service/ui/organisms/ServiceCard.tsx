import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { routeUrl } from "@/shared/data/routes";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { IconCircle } from "@/shared/ui/atoms/IconCircle";
import { ListItemScope } from "@/shared/ui/atoms/ListItemScope";
import { Typography } from "@/shared/ui/atoms/Typography";
import type { Service } from "../../model/services";

interface ServiceCardProps {
  service: Service;
  lang: AppLang;
  /** Ordinal in the enclosing `ItemList`, mirrored into microdata. */
  position: number;
  style?: StyleXStyles;
}

const styles = stylex.create({
  link: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
  },
  card: { flexGrow: 1, display: "flex", flexDirection: "column" },
  content: { flexGrow: 1, display: "flex", flexDirection: "column", gap: tokens.spacing1 },
});

export function ServiceCard({ service, lang, position, style }: ServiceCardProps) {
  const t = useT(lang);
  const Icon: LucideIcon =
    typeof service.icon === "string" ? resolveEntityIcon(service.icon) : service.icon;
  const href = routeUrl(`/services/${service.slug}`, lang);
  return (
    <a
      href={href}
      itemScope
      itemProp="itemListElement"
      itemType={schemaIri(SCHEMA_TYPE.listItem)}
      {...stylex.props(styles.link, style)}
    >
      <ListItemScope position={position} type={SCHEMA_TYPE.service}>
        <Card style={styles.card}>
          <CardContent style={styles.content}>
            <IconCircle>
              <Icon size={22} />
            </IconCircle>
            <Typography variant="h6" component="h3" itemProp="name">
              {t(service.navTitle)}
            </Typography>
            <Typography variant="body2" color="textSecondary" itemProp="description">
              {t(service.tagline)}
            </Typography>
          </CardContent>
        </Card>
      </ListItemScope>
    </a>
  );
}
