import type { TextItem } from "@/entities/case/model/cases";
import type { TFunc } from "@/shared/i18n/t";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { TileGrid } from "@/shared/ui/organisms/TileGrid";

export function TileSection({
  alt,
  title,
  eyebrow,
  items,
  t,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: TextItem[];
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <TileGrid items={items} t={t} />
    </BlockSection>
  );
}
