import { useTranslation } from "react-i18next";
import type { TextItem } from "../../../types/cases";
import { TileGrid } from "../../molecules/blocks/TileGrid";
import { BlockSection } from "./BlockSection";

/**
 * «заголовок + текст» card section: problem, solution, audiences.
 */
export function TileSection({
  alt,
  title,
  eyebrow,
  items,
}: {
  alt?: boolean;
  /** i18n key of the section title. */
  title?: string;
  /** i18n key of the eyebrow (e.g. «проблема»). */
  eyebrow?: string;
  items: TextItem[];
}) {
  const { t } = useTranslation();
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <TileGrid items={items} />
    </BlockSection>
  );
}
