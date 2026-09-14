import { useTranslation } from "react-i18next";
import type { StatItem } from "@/entities/case/model/cases";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { StatGrid } from "@/shared/ui/organisms/StatGrid";

/**
 * KPI stats section (product dashboard, deal terms).
 */
export function StatsSection({
  alt,
  title,
  items,
}: {
  alt?: boolean;
  /** i18n key of the section title. */
  title?: string;
  items: StatItem[];
}) {
  const { t } = useTranslation();
  return (
    <BlockSection alt={alt} title={title ? t(title) : undefined}>
      <StatGrid items={items} />
    </BlockSection>
  );
}
