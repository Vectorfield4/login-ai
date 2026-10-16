import { getServiceBySlug } from "@/entities/service";
import type { BundleResolver } from "./types";

/**
 * The sole cross-entity read of the calculator: a `bundle` term names a service
 * by slug, and its `price` supplies the amount. Prices are never duplicated in
 * a spec. Lives in `features`, never in `shared` (import rule 3).
 */
export const resolveBundle: BundleResolver = (ref) => getServiceBySlug(ref)?.price;
