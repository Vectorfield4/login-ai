import { useTranslation } from "react-i18next";
import type { FaqItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { FaqBlock } from "@/shared/ui/organisms/FaqBlock";

/**
 * FAQ section: accordion of question/answer pairs. Content arrives as i18n keys.
 */
export function FaqSection({
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
  items: FaqItem[];
}) {
  const { t } = useTranslation();
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <FaqBlock items={items} />
    </BlockSection>
  );
}
