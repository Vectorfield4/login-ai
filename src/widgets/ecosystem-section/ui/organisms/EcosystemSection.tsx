import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useT } from "@/shared/hooks/useT";
import { Container, Section } from "@/shared/ui/atoms";
import { SectionHeader } from "@/shared/ui/molecules";
import {
  COLUMN_MATRIX,
  type ColumnConfig,
  type EcosystemSectionInput,
  type ResolvedItem,
  resolveItemsByType,
  SECTION_HEADINGS,
} from "../../model/ecosystem.types";
import { EcosystemColumn } from "../molecules/EcosystemColumn";

/**
 * Корневая раскладка секции.
 *
 * Одна колонка (мобильный): три блока идут сверху вниз, обычным потоком.
 * Три колонки в ряд (≥769px): услуги | решения | кейсы; `minmax(0, 1fr)`
 * обязателен, иначе длинный заголовок растягивает свою колонку и ломает общее
 * выравнивание. `alignItems: start` не даёт коротким колонкам дотянуться до
 * высоты самой длинной — иначе карточки «распухают».
 */
const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: tokens.spacing4,
    alignItems: "start",
    "@media (min-width: 769px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: tokens.spacing3,
    },
  },
  column: { minWidth: 0 },
});

interface EcosystemSectionProps extends EcosystemSectionInput {
  lang: "ru" | "en";
}

/** Секция «экосистема сущности»: заголовок + три колонки релевантных ссылок. */
export function EcosystemSection({ pageType, grouped, lang }: EcosystemSectionProps) {
  const t = useT(lang);

  const columns = COLUMN_MATRIX[pageType]
    .map((config: ColumnConfig) => ({
      config,
      items: resolveItemsByType(grouped[config.targetType] ?? [], config.targetType),
    }))
    .filter((column: { config: ColumnConfig; items: ResolvedItem[] }) => column.items.length > 0);

  if (!columns.length) return null;

  return (
    <Section label={t("ui.ecosystem.columns")}>
      <Container>
        <SectionHeader title={t(SECTION_HEADINGS[pageType].titleKey)} />
        <div {...stylex.props(styles.grid)}>
          {columns.map(({ config, items }) => (
            <div key={config.targetType} {...stylex.props(styles.column)}>
              <EcosystemColumn config={config} items={items} t={t} lang={lang} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
