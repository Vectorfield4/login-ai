import type { FitItem } from "@/shared/types/content";
import type { TFunc } from "@/shared/i18n/t";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { FitBlock } from "@/shared/ui/organisms/FitBlock";

export function FitSection({
  alt,
  title,
  eyebrow,
  items,
  t,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: FitItem[];
  t: TFunc;
}) {
  return (
    <BlockSection
      alt={alt}
      title={title ? t(title) : undefined}
      eyebrow={eyebrow ? t(eyebrow) : undefined}
    >
      <FitBlock items={items} t={t} />
    </BlockSection>
  );
}
