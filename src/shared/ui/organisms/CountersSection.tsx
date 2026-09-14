import type { CounterItem } from "@/entities/case/model/cases";
import { BlockSection } from "@/shared/ui/organisms/BlockSection";
import { CountersBlock } from "@/shared/ui/organisms/CountersBlock";

/**
 * «Цифры платформы» section: tiles with animated counters (no header).
 */
export function CountersSection({ alt, items }: { alt?: boolean; items: CounterItem[] }) {
  return (
    <BlockSection alt={alt}>
      <CountersBlock items={items} />
    </BlockSection>
  );
}
