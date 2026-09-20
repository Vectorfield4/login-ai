import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";
import type { SliderLevel } from "@/entities/case/model/cases";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { Card, CardContent } from "../atoms/Card";
import Stack from "../atoms/Stack";
import { Typography } from "../atoms/Typography";

interface AiVisualSliderProps {
  min: number;
  max: number;
  /** Initial value (level) shown on load. */
  defaultValue: number;
  /** i18n key of the label for the minimum end of the scale. */
  fromLabel: string;
  /** i18n key of the label for the maximum end of the scale. */
  toLabel: string;
  /** Depth level descriptions (index = slider level). */
  levels: SliderLevel[];
  lang: "ru" | "en";
}

const styles = stylex.create({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: tokens.spacing1,
    marginBlockEnd: tokens.spacing1,
  },
  levelTitle: { color: tokens.colorPrimary },
  range: {
    width: "100%",
    display: "block",
    marginBlock: tokens.spacing2,
    accentColor: tokens.colorPrimary,
    cursor: "pointer",
  },
  text: { maxWidth: 720 },
});

/**
 * Interactive «глубины анализа» slider: switch between levels, from the big
 * picture to a detailed breakdown. The value maps to the matching level
 * description from the data; every level is translated in both languages.
 *
 * Island component (client:load): `t` is not a prop (functions do not survive
 * the client serialization boundary) — the dictionary is built inside via
 * `createT(lang, astroDicts)`. Until hydrate runs the slider renders the full
 * list of levels as cards, so the no-JS/SSG output is never empty.
 */
export function AiVisualSlider({
  min,
  max,
  defaultValue,
  fromLabel,
  toLabel,
  levels,
  lang,
}: AiVisualSliderProps) {
  const t = createT(lang, astroDicts);
  const [value, setValue] = useState(defaultValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const levelIndex = Math.min(Math.max(value - min, 0), levels.length - 1);
  const level = levels[levelIndex];

  if (!hydrated) {
    return (
      <Stack gap={2}>
        {levels.map((item) => (
          <Card key={item.title}>
            <CardContent>
              <Typography variant="h6">{t(item.title)}</Typography>
              <Typography variant="body2" color="textSecondary">
                {t(item.text)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <div>
      <div {...stylex.props(styles.header)}>
        <Typography variant="h5" style={styles.levelTitle}>
          {t(level.title)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {min}–{max} · {t(fromLabel)} → {t(toLabel)}
        </Typography>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => setValue(Number(event.currentTarget.value))}
        aria-label={t(fromLabel)}
        {...stylex.props(styles.range)}
      />

      <Typography variant="body1" color="textSecondary" style={styles.text}>
        {t(level.text)}
      </Typography>
    </div>
  );
}
