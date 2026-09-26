import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useT } from "@/shared/hooks/useT";
import { Container, Section } from "@/shared/ui/atoms";
import {
  COLUMN_MATRIX,
  type ColumnConfig,
  type EcosystemSectionInput,
  type ResolvedItem,
  resolveItemsByType,
} from "../../model/ecosystem.types";
import { EcosystemColumn } from "../molecules/EcosystemColumn";

/**
 * Корневая раскладка секции.
 *
 * Десктоп (≥769px): три колонки в ряд — услуги | решения | кейсы;
 * `minmax(0, 1fr)` обязателен, иначе длинный заголовок растягивает свою
 * колонку и ломает общее выравнивание. `alignItems: start` не даёт коротким
 * колонкам дотянуться до высоты самой длинной — иначе карточки «распухают».
 *
 * Мобильный (≤768px): те же три колонки едут по горизонтали со снапом
 * вместо вертикальной колбасы карточек; подписи карточек на этой ширине
 * скрыты (см. карточки), поэтому колонка остаётся невысокой.
 */
const styles = stylex.create({
  grid: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "78%",
    gap: tokens.spacing2,
    alignItems: "start",
    overflowX: "auto",
    scrollSnapType: "x proximity",
    "@media (min-width: 769px)": {
      gridAutoFlow: "row",
      gridAutoColumns: "auto",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: tokens.spacing3,
      overflowX: "visible",
      scrollSnapType: "none",
    },
  },
  column: { minWidth: 0, scrollSnapAlign: "start" },
});

interface EcosystemSectionProps extends EcosystemSectionInput {
  lang: "ru" | "en";
}

/** Секция «экосистема сущности»: три параллельные колонки релевантных ссылок. */
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
