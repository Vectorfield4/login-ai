import { useTranslation } from "react-i18next";
import type { TextItem } from "@/entities/case/model/cases";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { TileGrid } from "@/shared/ui/organisms/TileGrid";

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
