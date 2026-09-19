import type { TFunc } from "@/shared/i18n/t";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { AiVisualSlider } from "@/shared/ui/organisms/AiVisualSlider";

export function SliderSection({
  alt,
  title,
  eyebrow,
  t,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <AiVisualSlider t={t} />
    </BlockSection>
  );
}
