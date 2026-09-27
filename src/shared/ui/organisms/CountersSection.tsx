import type { AppLang } from "@/shared/hooks/useT";
import type { CounterItem } from "@/shared/types/content";
import { BlockSection } from "./BlockSection";
import { CountersBlock } from "./CountersBlock";

type CountersSectionProps = {
  alt?: boolean;
  items: CounterItem[];
  lang: AppLang;
};

/**
 * «Цифры платформы» section: tiles with counters (no header).
 */
export function CountersSection({ alt, items, lang }: CountersSectionProps) {
  return (
    <BlockSection alt={alt}>
      <CountersBlock lang={lang} items={items} />
    </BlockSection>
  );
}
