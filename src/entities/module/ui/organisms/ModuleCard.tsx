import * as stylex from "@stylexjs/stylex";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import Chip from "@/shared/ui/atoms/Chip";
import { Typography } from "@/shared/ui/atoms/Typography";
import type { Module } from "../../model/modules";

interface ModuleCardProps {
  module: Pick<
    Module,
    "slug" | "icon" | "title" | "tagline" | "description" | "features" | "providers"
  >;
  lang: AppLang;
}

const styles = stylex.create({
  card: { height: "100%", display: "flex", flexDirection: "column" },
  content: { display: "flex", flexDirection: "column", gap: tokens.spacing2, height: "100%" },
  head: { display: "flex", alignItems: "center", gap: tokens.spacing2 },
  icon: { color: tokens.colorPrimary, flexShrink: 0 },
  text: { display: "flex", flexDirection: "column", gap: tokens.spacing05 },
  features: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
  },
  feature: { display: "flex", flexDirection: "column", gap: tokens.spacing05 },
  providers: {
    marginTop: "auto",
    paddingTop: tokens.spacing2,
    borderTop: `1px solid ${tokens.colorDivider}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing1,
  },
  chips: { display: "flex", flexWrap: "wrap", gap: tokens.spacing1 },
  defaultChip: { borderColor: tokens.colorPrimary, color: tokens.colorPrimary },
});

export function ModuleCard({ module, lang }: ModuleCardProps) {
  const t = useT(lang);
  const Icon = resolveEntityIcon(typeof module.icon === "string" ? module.icon : undefined);

  return (
    <Card style={styles.card}>
      <CardContent style={styles.content}>
        <div {...stylex.props(styles.head)}>
          <Icon size={24} {...stylex.props(styles.icon)} aria-hidden="true" />
          <div {...stylex.props(styles.text)}>
            <Typography variant="h6" component="h3">
              {t(module.title)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {t(module.tagline)}
            </Typography>
          </div>
        </div>

        <Typography variant="body2" color="textSecondary">
          {t(module.description)}
        </Typography>

        <ul {...stylex.props(styles.features)}>
          {module.features.map((feature) => (
            <li key={feature.title} {...stylex.props(styles.feature)}>
              <Typography variant="body2" component="span">
                {t(feature.title)}
              </Typography>
              <Typography variant="caption" component="span" color="textSecondary">
                {t(feature.text)}
              </Typography>
            </li>
          ))}
        </ul>

        <div {...stylex.props(styles.providers)}>
          <Typography variant="caption" color="textSecondary">
            {t("modules.common.providersTitle")}
          </Typography>
          <div {...stylex.props(styles.chips)}>
            {module.providers.map((provider) => (
              <Chip
                key={provider.id}
                style={provider.isDefault ? styles.defaultChip : undefined}
                label={
                  provider.isDefault
                    ? `${provider.name} · ${t("modules.common.defaultBadge")}`
                    : provider.name
                }
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
