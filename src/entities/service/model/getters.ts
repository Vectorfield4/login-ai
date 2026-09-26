import { services } from "./fixtures";
import type { Service } from "./services";

/** All services in fixture order. */
export const getServices = (): Service[] => services;

/** One service by its natural key; `undefined` for an unknown slug. */
export const getServiceBySlug = (slug?: string): Service | undefined =>
  services.find((service) => service.slug === slug);
