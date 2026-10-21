import * as stylex from "@stylexjs/stylex";
import { routeUrl } from "@/shared/data/routes";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { Typography } from "@/shared/ui/atoms/Typography";
import type { Service, ServiceGroup } from "../../model/services";

interface ServiceGroupCardProps {
  group: ServiceGroup;
  services: Service[];
  lang: AppLang;
  /** The group has a page: its title links there. Empty groups stay plain text. */
  hasPage?: boolean;
}

const styles = stylex.create({
  card: { height: "100%" },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
    height: "100%",
  },
  titleLink: {
    color: "inherit",
    textDecoration: "none",
    ":hover": { color: tokens.colorPrimary },
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing05,
    margin: 0,
    marginBlockStart: tokens.spacing05,
    padding: 0,
    listStyle: "none",
  },
  serviceLink: {
    color: tokens.colorTextSecondary,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    textDecoration: "none",
    ":hover": { color: tokens.colorPrimary, textDecoration: "underline" },
  },
});

/**
 * Catalog group card: the group label, its description, the service count and
 * the services it currently carries. Used by the `/services` hub and the
 * direction pages; an empty group renders the same card without a link.
 */
export function ServiceGroupCard({
  group,
  services,
  lang,
  hasPage = false,
}: ServiceGroupCardProps) {
  const t = useT(lang);
  const label = t(`servicesGroups.${group}.label`);
  const href = routeUrl(`/services/group/${group}`, lang);

  return (
    <Card style={styles.card}>
      <CardContent style={styles.content}>
        <Typography variant="caption" color="textSecondary">
          {`${t("servicesPage.countLabel")}: ${services.length}`}
        </Typography>
        <Typography variant="h6" component="h3">
          {hasPage ? (
            <a href={href} {...stylex.props(styles.titleLink)}>
              {label}
            </a>
          ) : (
            label
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t(`servicesGroups.${group}.subtitle`)}
        </Typography>
        {services.length ? (
          <ul {...stylex.props(styles.list)}>
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={routeUrl(`/services/${service.slug}`, lang)}
                  {...stylex.props(styles.serviceLink)}
                >
                  {t(service.navTitle)}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
