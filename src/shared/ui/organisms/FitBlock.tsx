import * as stylex from "@stylexjs/stylex";
import { CircleCheck, CircleSlash } from "lucide-react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import type { FitItem } from "@/shared/types/content";
import { Typography } from "@/shared/ui/atoms/Typography";
import { FitRow } from "@/shared/ui/molecules/FitRow";

const styles = stylex.create({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: tokens.spacing4,
    "@media (min-width: 900px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: tokens.spacing4,
    },
  },
  // minmax(0, 1fr) в сетке не спасает от длинного слова: колонке нужен ещё и
  // min-width, иначе заголовок растягивает свою дорожку.
  column: { minWidth: 0 },
  // Разделитель живёт на второй колонке: при одной колонке (в данных бывает
  // только positive) рамки нет, при двух — вертикальная линия во всю высоту.
  columnSecondary: {
    "@media (min-width: 900px)": {
      borderLeft: `1px solid ${tokens.colorDivider}`,
      paddingLeft: tokens.spacing4,
    },
  },
  columnHead: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
    marginBottom: tokens.spacing2,
  },
  columnIcon: {
    width: 28,
    height: 28,
    flexShrink: 0,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  columnIconPositive: {
    backgroundColor: tokens.colorSuccessSoft,
    color: tokens.colorSuccess,
  },
  columnIconNegative: {
    backgroundColor: tokens.colorSurfaceSunken,
    color: tokens.colorTextSecondary,
  },
  list: { listStyle: "none", margin: 0, padding: 0 },
});

/**
 * Блок «кому подходит / кому не подходит»: две колонки, разделённые линией.
 * Массив `items` делится по `positive` здесь, а не в фикстурах, — порядок в
 * данных значения не имеет. Колонка без пунктов не рендерится.
 */
export function FitBlock({ items, t }: { items: FitItem[]; t: TFunc }) {
  const positive = items.filter((item) => item.positive);
  const negative = items.filter((item) => !item.positive);
  const columns = [
    { key: "fits", items: positive, positive: true, label: t("ui.fitFits") },
    { key: "not", items: negative, positive: false, label: t("ui.fitNot") },
  ].filter((column) => column.items.length > 0);

  return (
    <div {...stylex.props(styles.root)}>
      {columns.map((column, index) => {
        const ColumnIcon = column.positive ? CircleCheck : CircleSlash;
        return (
          <div
            key={column.key}
            {...stylex.props(styles.column, index > 0 && styles.columnSecondary)}
          >
            <div {...stylex.props(styles.columnHead)}>
              <span
                {...stylex.props(
                  styles.columnIcon,
                  column.positive ? styles.columnIconPositive : styles.columnIconNegative,
                )}
              >
                <ColumnIcon size={18} aria-hidden="true" />
              </span>
              <Typography variant="overline" component="h3" color="text">
                {column.label}
              </Typography>
            </div>
            <ul {...stylex.props(styles.list)}>
              {column.items.map((item) => (
                <li key={item.title}>
                  <FitRow title={item.title} text={item.text} positive={column.positive} t={t} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
