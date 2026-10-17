import * as stylex from "@stylexjs/stylex";
import { Check } from "lucide-react";
import { getCapabilityBySlug } from "@/entities/capability";
import { getServiceBySlug } from "@/entities/service";
import { getSoftwareTypeBySlug, getSoftwareTypeLabelKey } from "@/entities/software-type";
import { getSolutionBySlug } from "@/entities/solution";
import { getTechnologyBySlug } from "@/entities/technology";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { IncludedItem } from "@/shared/types/calculator";
import { Typography } from "@/shared/ui/atoms";
import type { CalculatorKind } from "../../model/resolveSpec";

type IncludedBlockProps = {
  kind: CalculatorKind;
  slug: string;
  items: IncludedItem[];
  lang: AppLang;
};

type Row = {
  key: string;
  label: string;
  note?: string;
};

type Group = {
  key: string;
  title: string;
  rows: Row[];
};

const styles = stylex.create({
  frame: {
    marginBottom: tokens.spacing3,
    padding: tokens.spacing2,
    border: `1px solid ${tokens.colorDivider}`,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurfaceSunken,
    boxSizing: "border-box",
  },
  title: {
    marginBottom: tokens.spacing15,
  },
  groups: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing2,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing05,
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacing1,
    minWidth: 0,
  },
  icon: {
    display: "flex",
    flexShrink: 0,
    marginTop: 2,
    color: tokens.colorPrimary,
  },
  label: {
    minWidth: 0,
  },
  note: {
    marginTop: 2,
  },
});

/**
 * The base basket: the offering itself plus the capabilities the estimate
 * already covers. Display-only; the price is in the result panel, not here.
 */
export function IncludedBlock({ kind, slug, items, lang }: IncludedBlockProps) {
  const t = useT(lang);
  const offering = kind === "service" ? getServiceBySlug(slug) : getSolutionBySlug(slug);

  const technologyRows: Row[] = [];
  const capabilityRows: Row[] = [];
  const serviceRows: Row[] = [];
  const softwareTypeRows: Row[] = [];

  for (const item of items) {
    if (item.kind === "technology") {
      const technology = getTechnologyBySlug(item.slug);
      if (!technology) continue;
      technologyRows.push({
        key: `technology:${item.slug}`,
        label: technology.nameKey ? t(technology.nameKey) : (technology.name ?? item.slug),
        note: item.noteKey ? t(item.noteKey) : undefined,
      });
    }
    if (item.kind === "capability") {
      const capability = getCapabilityBySlug(item.slug);
      if (!capability) continue;
      capabilityRows.push({
        key: `capability:${item.slug}`,
        label: t(capability.nameKey),
        note: item.noteKey ? t(item.noteKey) : undefined,
      });
    }
    if (item.kind === "service") {
      const service = getServiceBySlug(item.slug);
      if (!service) continue;
      serviceRows.push({ key: `service:${item.slug}`, label: t(service.title) });
    }
    if (item.kind === "software-type") {
      const softwareType = getSoftwareTypeBySlug(item.slug);
      const key = getSoftwareTypeLabelKey(item.slug);
      if (!softwareType || !key) continue;
      softwareTypeRows.push({ key: `software-type:${item.slug}`, label: t(key) });
    }
  }

  const groups: Group[] = [
    {
      key: "offering",
      title: t(kind === "service" ? "calculator.included.service" : "calculator.included.solution"),
      rows: offering ? [{ key: `${kind}:${slug}`, label: t(offering.title) }] : [],
    },
    {
      key: "service",
      title: t("calculator.included.service"),
      rows: serviceRows,
    },
    {
      key: "technology",
      title: t("calculator.included.technology"),
      rows: technologyRows,
    },
    {
      key: "capability",
      title: t("calculator.included.capability"),
      rows: capabilityRows,
    },
    {
      key: "software-type",
      title: t("calculator.included.softwareType"),
      rows: softwareTypeRows,
    },
  ].filter((group) => group.rows.length > 0);

  return (
    <div {...stylex.props(styles.frame)}>
      <Typography variant="h6" component="h3" style={styles.title}>
        {t("calculator.included.title")}
      </Typography>
      <div {...stylex.props(styles.groups)}>
        {groups.map((group) => (
          <div key={group.key} {...stylex.props(styles.group)}>
            <Typography variant="body2" color="textSecondary">
              {group.title}
            </Typography>
            {group.rows.map((row) => (
              <div key={row.key} {...stylex.props(styles.row)}>
                <span {...stylex.props(styles.icon)}>
                  <Check size={16} aria-hidden="true" />
                </span>
                <div>
                  <Typography variant="body1" style={styles.label}>
                    {row.label}
                  </Typography>
                  {row.note ? (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={[styles.label, styles.note]}
                    >
                      {row.note}
                    </Typography>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncludedBlock;
