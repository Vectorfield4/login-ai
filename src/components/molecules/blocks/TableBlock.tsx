import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { TableRow as TableRowModel } from "../../../types/investors";

/**
 * Comparison table of competitors/products (columns + highlighted rows).
 * All text fields are i18n keys.
 */
export function TableBlock({
  columns,
  rows,
  ariaLabel,
}: {
  columns: string[];
  rows: TableRowModel[];
  ariaLabel?: string;
}) {
  const { t } = useTranslation();
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table size="small" aria-label={ariaLabel}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} sx={{ fontWeight: 700 }}>
                {t(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              selected={row.highlight}
              sx={row.highlight ? { "& .MuiTableCell-root": { fontWeight: 700 } } : undefined}
            >
              <TableCell component="th" scope="row">
                {t(row.name)}
              </TableCell>
              {row.cells.map((cell) => (
                <TableCell key={cell}>{t(cell)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
