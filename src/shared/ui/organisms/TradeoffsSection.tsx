import { type AppLang, useT } from "@/shared/hooks/useT";
import type { TradeoffItem } from "@/shared/types/content";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { TradeoffsBlock } from "@/shared/ui/organisms/TradeoffsBlock";

export function TradeoffsSection({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: TradeoffItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  const resolvedTitle = title ? t(title) : undefined;
  return (
    <BlockSection alt={alt} title={resolvedTitle} eyebrow={eyebrow ? t(eyebrow) : undefined}>
      <TradeoffsBlock lang={lang} items={items} ariaLabel={resolvedTitle} />
    </BlockSection>
  );
}

export default TradeoffsSection;
