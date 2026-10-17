import { getCapabilityBySlug } from "@/entities/capability";
import { getSoftwareTypeBySlug } from "@/entities/software-type";
import { getTechnologyBySlug } from "@/entities/technology";
import type { AddonPricing } from "@/shared/types/calculator";

/** Resolves an add-on slug to its catalog coefficients. */
export const resolveAddon = (ref: string): AddonPricing | undefined =>
  getTechnologyBySlug(ref)?.pricing ??
  getCapabilityBySlug(ref)?.pricing ??
  getSoftwareTypeBySlug(ref)?.pricing;
