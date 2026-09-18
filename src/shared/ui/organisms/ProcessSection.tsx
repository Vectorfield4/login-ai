import { useTranslation } from "react-i18next";
import type { ProcessItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { ProcessBlock } from "@/shared/ui/organisms/ProcessBlock";

/**
 * «Как мы работаем» — numbered process steps section.
 */
export function ProcessSection({
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
  items: ProcessItem[];
}) {
  const { t } = useTranslation();
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <ProcessBlock items={items} />
    </BlockSection>
  );
}
