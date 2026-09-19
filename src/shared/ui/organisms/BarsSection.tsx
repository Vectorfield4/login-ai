import type { TFunc } from "@/shared/i18n/t";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { BarsBlock } from "@/shared/ui/organisms/BarsBlock";

export function BarsSection({
  alt,
  title,
  eyebrow,
  items,
  t,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: { label: string; value: number }[];
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <BarsBlock items={items} t={t} />
    </BlockSection>
  );
}
