import type { StatItem } from "@/entities/case/model/cases";
import type { TFunc } from "@/shared/i18n/t";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { StatGrid } from "@/shared/ui/organisms/StatGrid";

export function StatsSection({
  alt,
  title,
  items,
  t,
}: {
  alt?: boolean;
  title?: string;
  items: StatItem[];
  t: TFunc;
}) {
  return (
    <BlockSection alt={alt} title={title ? t(title) : undefined}>
      <StatGrid items={items} t={t} />
    </BlockSection>
  );
}
