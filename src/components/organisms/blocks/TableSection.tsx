import { useTranslation } from "react-i18next";
import type { TableRow as TableRowModel } from "../../../types/investors";
import { TableBlock } from "../../molecules/blocks/TableBlock";
import { BlockSection } from "./BlockSection";

/**
 * Comparison table section (competitors, products).
 */
export function TableSection({
  alt,
  title,
  columns,
  rows,
}: {
  alt?: boolean;
  /** i18n key of the section title. */
  title?: string;
  /** i18n keys of the column headers. */
  columns: string[];
  rows: TableRowModel[];
}) {
  const { t } = useTranslation();
  return (
    <BlockSection alt={alt} title={title ? t(title) : undefined}>
      <TableBlock columns={columns} rows={rows} ariaLabel={title ? t(title) : undefined} />
    </BlockSection>
  );
}
