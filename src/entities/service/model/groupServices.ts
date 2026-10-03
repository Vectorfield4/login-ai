import type { Service, ServiceGroup } from "./services";

/** Group order in the menu, group pages and the home picker. */
export const SERVICE_GROUP_ORDER: readonly ServiceGroup[] = [
  "ai-integrations",
  "ai-infra",
  "ml",
  "engineering",
  "web-growth",
  "training",
];

export interface ServiceGroupBucket {
  group: ServiceGroup;
  services: Service[];
}

/**
 * Splits a service list into ordered groups. Empty groups are dropped, so a
 * category with no services yet does not leave a blank heading.
 */
export function groupServices(services: Service[]): ServiceGroupBucket[] {
  return SERVICE_GROUP_ORDER.map((group) => ({
    group,
    services: services.filter((service) => service.group === group),
  })).filter((bucket) => bucket.services.length > 0);
}
