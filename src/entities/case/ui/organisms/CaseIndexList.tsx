import * as stylex from "@stylexjs/stylex";
import type { LucideIcon } from "lucide-react";
import { resolveEntityIcon } from "@/shared/data/iconCatalog";
import { routeUrl } from "@/shared/data/routes";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Chip, IconCircle, ListItemScope, Typography } from "@/shared/ui/atoms";
import type { Case } from "../../model/cases";

interface CaseIndexListProps {
  cases: Case[];
  lang: AppLang;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBlockStart: tokens.spacing2,
    borderTop: `1px solid ${tokens.colorDivider}`,
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacing3,
    paddingBlock: tokens.spacing2,
    paddingInline: tokens.spacing1,
    borderBottom: `1px solid ${tokens.colorDivider}`,
    textDecoration: "none",
    color: tokens.colorText,
    borderRadius: tokens.radiusBorder,
    transition: `background-color ${tokens.durationShortest} ease`,
    ":hover": { backgroundColor: tokens.colorActionHover },
    "@media (max-width: 899px)": { flexWrap: "wrap", gap: tokens.spacing2 },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacing05,
    flexGrow: 1,
    minWidth: 0,
  },
  metric: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    minWidth: 200,
    "@media (max-width: 899px)": { width: "100%", alignItems: "flex-start" },
  },
  metricValue: {
    display: "block",
    fontSize: tokens.sizeH5,
    fontWeight: 700,
    lineHeight: tokens.lineH5,
    color: tokens.colorPrimary,
    fontVariantNumeric: "tabular-nums",
  },
  metricLabel: {
    marginBlockStart: tokens.spacing05,
    fontSize: tokens.sizeBody2,
    lineHeight: tokens.lineBody2,
    color: tokens.colorTextSecondary,
    maxWidth: 260,
  },
});

/** Индекс портфолио: компактные строки всех кейсов с ключевой метрикой. */
export function CaseIndexList({ cases, lang }: CaseIndexListProps) {
  const t = useT(lang);
  return (
    <div itemScope itemType={schemaIri(SCHEMA_TYPE.itemList)} {...stylex.props(styles.root)}>
      {cases.map((caseItem, index) => {
        const Icon: LucideIcon =
          typeof caseItem.icon === "string" ? resolveEntityIcon(caseItem.icon) : caseItem.icon;
        const href = routeUrl(`/cases/${caseItem.slug}`, lang);
        const metric = caseItem.metrics[0];
        return (
          <a
            key={caseItem.slug}
            href={href}
            itemScope
            itemProp="itemListElement"
            itemType={schemaIri(SCHEMA_TYPE.listItem)}
            {...stylex.props(styles.row)}
          >
            <ListItemScope position={index + 1} type={SCHEMA_TYPE.creativeWork}>
              <IconCircle size={44}>
                <Icon size={20} />
              </IconCircle>
              <div {...stylex.props(styles.content)}>
                <Chip label={t(caseItem.industryKey)} itemProp="genre" />
                <Typography variant="h6" component="h3" itemProp="name">
                  {t(caseItem.title)}
                </Typography>
                <Typography variant="body2" color="textSecondary" itemProp="description">
                  {t(caseItem.tagline)}
                </Typography>
              </div>
              <div {...stylex.props(styles.metric)}>
                <span {...stylex.props(styles.metricValue)}>{t(metric.value)}</span>
                <span {...stylex.props(styles.metricLabel)}>{t(metric.label)}</span>
              </div>
            </ListItemScope>
          </a>
        );
      })}
    </div>
  );
}
