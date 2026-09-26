import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";

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
});

interface ColumnGridProps {
  children: ReactNode;
}

/**
 * Сетка колонок «связанного»: одна колонка (мобильный) — блоки идут сверху
 * вниз, обычным потоком; три колонки в ряд (≥769px).
 *
 * `minmax(0, 1fr)` обязателен, иначе длинный заголовок растягивает свою
 * колонку и ломает общее выравнивание. `alignItems: start` не даёт коротким
 * колонкам дотянуться до высоты самой длинной — иначе карточки «распухают».
 */
export function ColumnGrid({ children }: ColumnGridProps) {
  return <div {...stylex.props(styles.grid)}>{children}</div>;
}
