import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import Chip from "@/shared/ui/atoms/Chip";

interface SolutionFiltersProps {
  t: TFunc;
  audiences: string[];
  selectedAudience?: string;
  onSelectAudience: (aud: string | undefined) => void;
  style?: StyleXStyles;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacing1,
  },
  selected: {
    backgroundColor: tokens.colorPrimary,
    color: tokens.colorPrimaryContrastText,
    borderColor: tokens.colorPrimary,
  },
});

export function SolutionFilters({
  t,
  audiences,
  selectedAudience,
  onSelectAudience,
  style,
}: SolutionFiltersProps) {
  return (
    <div {...stylex.props(styles.root, style)}>
      <Chip
        onClick={() => onSelectAudience(undefined)}
        style={selectedAudience === undefined ? styles.selected : undefined}
      >
        {t("ui.filters.all") || "Все"}
      </Chip>
      {audiences.map((aud) => (
        <Chip
          key={aud}
          onClick={() => onSelectAudience(aud)}
          style={selectedAudience === aud ? styles.selected : undefined}
        >
          {t(aud)}
        </Chip>
      ))}
    </div>
  );
}
