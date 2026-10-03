import { isPublished } from "@/shared/data/publishable";
import { services } from "./fixtures";
import type { Service } from "./services";

/** Published services in fixture order; drafts are not generated. */
export const getServices = (): Service[] => services.filter(isPublished);

/** One published service by its natural key; `undefined` for a draft or unknown slug. */
export const getServiceBySlug = (slug?: string): Service | undefined =>
  services.find((service) => service.slug === slug && isPublished(service));
