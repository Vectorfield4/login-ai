/** Row of a comparison table (TableSection). */
export interface TableRow {
  /** i18n key of the company/product name. */
  name: string;
  /** i18n keys of the cells (one per column). */
  cells: string[];
  /** Highlight the row (our product). */
  highlight?: boolean;
}

/** Item of a percentage distribution section (BarsSection). */
export interface BarsItem {
  /** i18n key of the label. */
  label: string;
  /** Fill percentage of the bar (0–100). */
  percent: number;
}
