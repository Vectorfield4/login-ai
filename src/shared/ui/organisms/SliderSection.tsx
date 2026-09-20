import type { SliderLevel } from "@/entities/case/model/cases";
import { AiVisualSlider } from "@/shared/ui/organisms/AiVisualSlider";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";

interface SliderSectionProps {
  alt?: boolean;
  /** Translated section title. */
  title?: string;
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

/**
 * «Сюжеты ИИ» section: the analysis-depth slider. All props except `lang` are
 * i18n keys / plain data, so the section can be hydrated as an island
 * (`client:load`) — the function-less prop set survives serialization.
 */
export function SliderSection({
  alt,
  title,
  min,
  max,
  defaultValue,
  fromLabel,
  toLabel,
  levels,
  lang,
}: SliderSectionProps) {
  return (
    <BlockSection alt={alt} title={title}>
      <AiVisualSlider
        min={min}
        max={max}
        defaultValue={defaultValue}
        fromLabel={fromLabel}
        toLabel={toLabel}
        levels={levels}
        lang={lang}
      />
    </BlockSection>
  );
}
