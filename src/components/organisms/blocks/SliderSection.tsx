import { useTranslation } from "react-i18next";
import type { SliderLevel } from "../../../types/cases";
import { AiVisualSlider } from "../../molecules/blocks/AiVisualSlider";
import { BlockSection } from "./BlockSection";

interface SliderSectionProps {
  alt?: boolean;
  /** i18n key of the section title. */
  title?: string;
  min: number;
  max: number;
  /** Initial value (level) shown on load. */
  default: number;
  /** i18n key of the label for the minimum end of the scale. */
  fromLabel: string;
  /** i18n key of the label for the maximum end of the scale. */
  toLabel: string;
  /** Depth level descriptions (index = slider level). */
  levels: SliderLevel[];
}

/**
 * «Сюжеты ИИ» section: the analysis-depth slider.
 */
export function SliderSection({
  alt,
  title,
  min,
  max,
  default: defaultValue,
  fromLabel,
  toLabel,
  levels,
}: SliderSectionProps) {
  const { t } = useTranslation();
  return (
    <BlockSection alt={alt} title={title ? t(title) : undefined}>
      <AiVisualSlider
        min={min}
        max={max}
        default={defaultValue}
        fromLabel={fromLabel}
        toLabel={toLabel}
        levels={levels}
      />
    </BlockSection>
  );
}
