import * as stylex from "@stylexjs/stylex";
import {
  Cog,
  Factory,
  FileText,
  ListChecks,
  type LucideIcon,
  Sparkles,
  Users,
  Warehouse,
} from "lucide-react";
import { getSoftwareTypeLabelKey, getSoftwareTypes } from "@/entities/software-type";
import { toggleSelection } from "@/features/calculator";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { CalculatorField } from "@/shared/types/calculator";
import { InfoHint } from "@/shared/ui/atoms";
import { FieldRow } from "./FieldRow";

type SoftwareTypesSpec = Extract<CalculatorField, { kind: "software-types" }>;

type SoftwareTypeFieldProps = {
  field: SoftwareTypesSpec;
  value: string[];
  onChange: (value: string[]) => void;
  lang: AppLang;
};

const ICONS: Record<string, LucideIcon> = {
  erp: Factory,
  crm: Users,
  cms: FileText,
  mes: Cog,
  wms: Warehouse,
  "task-tracker": ListChecks,
};

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: tokens.spacing1,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    padding: tokens.spacing15,
    borderRadius: tokens.radiusShape,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.colorDivider,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: `border-color ${tokens.durationShortest} ease, background-color ${tokens.durationShortest} ease`,
    ":hover": { backgroundColor: tokens.colorActionHover },
    ":focus-visible": { outline: `2px solid ${tokens.colorPrimary}`, outlineOffset: 2 },
  },
  cardOn: {
    borderColor: tokens.colorPrimary,
    backgroundColor: tokens.colorPrimarySoft,
    color: tokens.colorPrimary,
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
    fontSize: tokens.sizeBody2,
    fontWeight: 600,
  },
  meta: {
    fontSize: tokens.categoryLabelSize,
    color: tokens.colorTextSecondary,
    lineHeight: 1.35,
  },
});

/**
 * Integration block over the `software-type` catalog: every type arrives with
 * its own icon and vendor products, so the visitor picks a concrete system
 * rather than an abstract "integration".
 */
export function SoftwareTypeField({ field, value, onChange, lang }: SoftwareTypeFieldProps) {
  const t = useT(lang);
  const label = t(field.label);

  return (
    <FieldRow label={label} info={field.infoKey ? <InfoHint text={t(field.infoKey)} /> : undefined}>
      <div {...stylex.props(styles.grid)}>
        {getSoftwareTypes().map((softwareType) => {
          const selected = value.includes(softwareType.slug);
          const Icon = ICONS[softwareType.slug] ?? Sparkles;
          const nameKey = getSoftwareTypeLabelKey(softwareType.slug);
          const name = nameKey ? t(nameKey) : softwareType.slug;
          const meta = softwareType.products.length
            ? softwareType.products.join(" · ")
            : t(`softwareTypes.${softwareType.slug}.description`);
          return (
            <button
              key={softwareType.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                const next = toggleSelection(value, softwareType.slug);
                if (field.minSelected != null && next.length < field.minSelected) return;
                onChange(next);
              }}
              {...stylex.props(styles.card, selected && styles.cardOn)}
            >
              <span {...stylex.props(styles.head)}>
                <Icon size={18} aria-hidden />
                {name}
              </span>
              <span {...stylex.props(styles.meta)}>{meta}</span>
            </button>
          );
        })}
      </div>
    </FieldRow>
  );
}

export default SoftwareTypeField;
