import { type AppLang, useT } from "@/shared/hooks/useT";
import type { StatItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { StatGrid } from "@/shared/ui/organisms/StatGrid";

export function StatsSection({
  alt,
  title,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  items: StatItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  return (
    <BlockSection alt={alt} title={title ? t(title) : undefined}>
      <StatGrid lang={lang} items={items} />
    </BlockSection>
  );
}
