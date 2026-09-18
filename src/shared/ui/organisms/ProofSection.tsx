import { useTranslation } from "react-i18next";
import type { ProofItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { ProofBlock } from "@/shared/ui/organisms/ProofBlock";

/**
 * Кейс-доказательство с метрикой: baseline → действие → результат.
 */
export function ProofSection({
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
  items: ProofItem[];
}) {
  const { t } = useTranslation();
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <ProofBlock items={items} />
    </BlockSection>
  );
}
