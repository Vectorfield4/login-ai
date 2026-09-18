import { useTranslation } from "react-i18next";
import type { FitItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { FitBlock } from "@/shared/ui/organisms/FitBlock";

/**
 * «Кому подходит / кому НЕ подходит» section.
 */
export function FitSection({
  alt,
  title,
  eyebrow,
  items,
}: {
  alt?: boolean;
  /** i18n key of the section title. */
  title?: string;
  /** i18n key of the eyebrow. */
  eyebrow?: string;
  items: FitItem[];
}) {
  const { t } = useTranslation();
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <FitBlock items={items} />
    </BlockSection>
  );
}
