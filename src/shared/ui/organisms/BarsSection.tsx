import { useTranslation } from "react-i18next";
import type { BarsItem } from "@/shared/types/investors";
import { BarsBlock } from "@/shared/ui/organisms/BarsBlock";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";

/**
 * Percentage distribution section (fund allocation and similar).
 */
export function BarsSection({
  alt,
  title,
  items,
}: {
  alt?: boolean;
  /** i18n key of the section title. */
  title?: string;
  items: BarsItem[];
}) {
  const { t } = useTranslation();
  return (
    <BlockSection alt={alt} title={title ? t(title) : undefined}>
      <BarsBlock items={items} />
    </BlockSection>
  );
}
