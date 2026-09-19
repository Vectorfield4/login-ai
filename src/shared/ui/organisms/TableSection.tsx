import type { TFunc } from "@/shared/i18n/t";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { TableBlock } from "@/shared/ui/organisms/TableBlock";

export function TableSection({
  alt,
  title,
  eyebrow,
  items,
  t,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: { label: string; value: string }[];
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <TableBlock items={items} t={t} />
    </BlockSection>
  );
}
