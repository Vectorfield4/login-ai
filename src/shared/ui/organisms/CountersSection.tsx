import type { CounterItem } from "../../../../src/entities/case/model/cases";
import type { TFunc } from "../../i18n/t";
import { BlockSection } from "./BlockSection";
import { CountersBlock } from "./CountersBlock";

type CountersSectionProps = {
  alt?: boolean;
  items: CounterItem[];
  t: TFunc;
};

/**
 * «Цифры платформы» section: tiles with counters (no header).
 */
export function CountersSection({ alt, items, t }: CountersSectionProps) {
  return (
    <BlockSection alt={alt}>
      <CountersBlock items={items} t={t} />
    </BlockSection>
  );
}
