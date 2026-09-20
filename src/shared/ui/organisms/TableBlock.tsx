import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { TFunc } from "@/shared/i18n/t";
import type { TableRow } from "@/shared/types/investors";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { Typography } from "@/shared/ui/atoms/Typography";

const styles = stylex.create({
  scroll: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", whiteSpace: "nowrap" },
  header: {
    padding: tokens.spacing2,
    borderBottom: `1px solid ${tokens.colorDivider}`,
    fontWeight: 700,
    textAlign: "left",
  },
  cell: {
    padding: tokens.spacing2,
    borderBottom: `1px solid ${tokens.colorDivider}`,
  },
  name: { fontWeight: 700 },
  highlighted: { backgroundColor: tokens.colorPrimarySoft },
});

/**
 * Comparison table of competitors/products: columns + rows, the highlighted
 * row is «our product». All text fields are i18n keys (see shared/types/investors).
 */
export function TableBlock({
  columns,
  rows,
  ariaLabel,
  t,
}: {
  columns: string[];
  rows: TableRow[];
  ariaLabel?: string;
  t: TFunc;
}) {
  return (
    <Card>
      <CardContent>
        <div {...stylex.props(styles.scroll)}>
          <table {...stylex.props(styles.table)} aria-label={ariaLabel}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col" {...stylex.props(styles.header)}>
                    {t(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} {...stylex.props(row.highlight && styles.highlighted)}>
                  <th scope="row" {...stylex.props(styles.cell, row.highlight && styles.name)}>
                    <Typography variant="body2">{t(row.name)}</Typography>
                  </th>
                  {row.cells.map((cell) => (
                    <td key={cell} {...stylex.props(styles.cell, row.highlight && styles.name)}>
                      <Typography variant="body2">{t(cell)}</Typography>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
