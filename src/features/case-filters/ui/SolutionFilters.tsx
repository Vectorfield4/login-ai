import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import Chip from "@/shared/ui/atoms/Chip";
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
  "technologies.video",
  "technologies.reputation",
  "technologies.llm",
];

interface SolutionFiltersProps {
  audience: string;
  technology: string;
  onAudienceChange: (value: string) => void;
  onTechnologyChange: (value: string) => void;
  t: TFunc;
  style?: StyleXStyles;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacing3,
    alignItems: "center",
  },
  group: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacing1,
  },
  label: {
    marginInlineEnd: tokens.spacing1,
    color: tokens.colorTextSecondary,
  },
  selected: {
    backgroundColor: tokens.colorPrimary,
    color: tokens.colorPrimaryContrastText,
    borderColor: tokens.colorPrimary,
  },
});

function FilterGroup({
  label,
  keys,
  value,
  onChange,
  t,
}: {
  label: string;
  keys: string[];
  value: string;
  onChange: (v: string) => void;
  t: TFunc;
}) {
  return (
    <div {...stylex.props(styles.group)}>
      <Typography variant="overline" style={styles.label}>
        {label}
      </Typography>
      {keys.map((key) => (
        <Chip
          key={key}
          onClick={() => onChange(key)}
          style={value === key ? styles.selected : undefined}
        >
          {t(key)}
        </Chip>
      ))}
    </div>
  );
}

export function SolutionFilters({
  audience,
  technology,
  onAudienceChange,
  onTechnologyChange,
  t,
  style,
}: SolutionFiltersProps) {
  return (
    <div {...stylex.props(styles.root, style)}>
      <FilterGroup
        label={t("home.filters.audienceLabel")}
        keys={AUDIENCE_KEYS}
        value={audience}
        onChange={onAudienceChange}
        t={t}
      />
      <FilterGroup
        label={t("home.filters.technologyLabel")}
        keys={TECHNOLOGY_KEYS}
        value={technology}
        onChange={onTechnologyChange}
        t={t}
      />
    </div>
  );
}
