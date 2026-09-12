import { useTranslation } from "react-i18next";
import type { BarsItem } from "../../../types/investors";
import { BarsBlock } from "../../molecules/blocks/BarsBlock";
import { BlockSection } from "./BlockSection";

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
