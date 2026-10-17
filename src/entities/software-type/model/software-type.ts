/**
 * One kind of business software the calculator can treat as an add-on:
 * ERP, CRM, CMS, MES, WMS or a task tracker. Vendor products are listed on the
 * type, so `1С`, `SAP` and `Битрикс24` keep one home and the type stays stable.
 */
export interface SoftwareType {
  /** Stable catalog key: future calculator add-on reference. */
  slug: string;
  /** Vendor products implementing this type, shown as is. */
  products: string[];
}
