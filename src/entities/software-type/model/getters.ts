import { softwareTypes } from "./fixtures";
import type { SoftwareType } from "./software-type";

/** The whole catalog in fixture order. */
export const getSoftwareTypes = (): SoftwareType[] => softwareTypes;

/** One software type by its stable slug. */
export const getSoftwareTypeBySlug = (slug?: string): SoftwareType | undefined =>
  softwareTypes.find((softwareType) => softwareType.slug === slug);

/** The software type a vendor product belongs to (`SAP` → `erp`). */
export const getSoftwareTypeByProduct = (product: string): SoftwareType | undefined => {
  const normalized = product.trim().toLowerCase();
  return softwareTypes.find((softwareType) =>
    softwareType.products.some((item) => item.trim().toLowerCase() === normalized),
  );
};

/** Label key of a type name; the dictionary owns the copy. */
export const getSoftwareTypeLabelKey = (slug: string): string | undefined =>
  getSoftwareTypeBySlug(slug) ? `softwareTypes.${slug}.name` : undefined;
