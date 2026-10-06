import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { Typography } from "@/shared/ui/atoms/Typography";

const AUDIENCE_KEYS = [
  "audiences.all",
  "audiences.manufacturers",
  "audiences.clinics",
  "audiences.adAgencies",
  "audiences.businessOwners",
];

const TECHNOLOGY_KEYS = [
  "technologies.any",
  "technologies.computerVision",
  "technologies.agentic",
  "technologies.content",
  "technologies.reputation",
  "technologies.llm",
];

interface SolutionFiltersProps {
  audience: string;
  technology: string;
  onAudienceChange: (value: string) => void;
  onTechnologyChange: (value: string) => void;
  lang: AppLang;
  style?: StyleXStyles;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacing3,
    alignItems: "center",
  },
  field: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacing1,
  },
  label: {
    color: tokens.colorTextSecondary,
    whiteSpace: "nowrap",
  },
  control: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },
  select: {
    appearance: "none",
    fontFamily: "inherit",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.4,
    color: tokens.colorText,
    backgroundColor: tokens.colorSurface,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.colorDivider,
    borderRadius: tokens.radiusShape,
    paddingBlock: tokens.spacing1,
    paddingInlineStart: tokens.spacing2,
    paddingInlineEnd: tokens.spacing5,
    minWidth: 180,
    cursor: "pointer",
    transition: `border-color ${tokens.durationShortest} ease`,
    ":hover": { borderColor: tokens.colorPrimary },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorPrimary}`,
      outlineOffset: 2,
    },
  },
  chevron: {
    position: "absolute",
    insetInlineEnd: tokens.spacing15,
    pointerEvents: "none",
    color: tokens.colorTextSecondary,
  },
});

function FilterSelect({
  label,
  keys,
  value,
  onChange,
  lang,
}: {
  label: string;
  keys: string[];
  value: string;
  onChange: (v: string) => void;
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <label {...stylex.props(styles.field)}>
      <Typography variant="overline" style={styles.label}>
        {label}
      </Typography>
      <span {...stylex.props(styles.control)}>
        <select
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          {...stylex.props(styles.select)}
        >
          {keys.map((key) => (
            <option key={key} value={key}>
              {t(key)}
            </option>
          ))}
        </select>
        <ChevronDown size={16} aria-hidden="true" {...stylex.props(styles.chevron)} />
      </span>
    </label>
  );
}

export function SolutionFilters({
  audience,
  technology,
  onAudienceChange,
  onTechnologyChange,
  lang,
  style,
}: SolutionFiltersProps) {
  const t = useT(lang);
  return (
    <div {...stylex.props(styles.root, style)}>
      <FilterSelect
        lang={lang}
        label={t("home.filters.audienceLabel")}
        keys={AUDIENCE_KEYS}
        value={audience}
        onChange={onAudienceChange}
      />
      <FilterSelect
        lang={lang}
        label={t("home.filters.technologyLabel")}
        keys={TECHNOLOGY_KEYS}
        value={technology}
        onChange={onTechnologyChange}
      />
    </div>
  );
}
