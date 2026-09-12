import type { CounterItem } from "../../../types/cases";
import { CountersBlock } from "../../molecules/blocks/CountersBlock";
import { BlockSection } from "./BlockSection";

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
