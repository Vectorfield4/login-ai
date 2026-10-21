import type { Service, ServiceDirection, ServiceGroup } from "./services";

/** Group order in the menu, group pages and the home picker. */
export const SERVICE_GROUP_ORDER: readonly ServiceGroup[] = [
  "agentic",
  "conversational",
  "data",
  "models",
  "ml",
  "ai-infra",
  "security",
  "engineering",
  "ai-integrations",
  "content",
  "web-growth",
  "strategy",
  "governance",
  "training",
];

/** Direction order in the menu, direction pages and the `/services` hub. */
export const SERVICE_DIRECTION_ORDER: readonly ServiceDirection[] = [
  "agents",
  "data-models",
  "infra-security",
  "engineering",
  "content-growth",
  "strategy-governance",
];

/** Groups of each direction, in menu order. */
export const SERVICE_DIRECTION_GROUPS: Record<ServiceDirection, readonly ServiceGroup[]> = {
  agents: ["agentic", "conversational"],
  "data-models": ["data", "models", "ml"],
  "infra-security": ["ai-infra", "security"],
  engineering: ["engineering", "ai-integrations"],
  "content-growth": ["content", "web-growth"],
  "strategy-governance": ["strategy", "governance", "training"],
};

/** Direction that owns a group. The map is total, so every group has a parent. */
export const SERVICE_GROUP_DIRECTION: Record<ServiceGroup, ServiceDirection> = {
  agentic: "agents",
  conversational: "agents",
  data: "data-models",
  models: "data-models",
  ml: "data-models",
  "ai-infra": "infra-security",
  security: "infra-security",
  engineering: "engineering",
  "ai-integrations": "engineering",
  content: "content-growth",
  "web-growth": "content-growth",
  strategy: "strategy-governance",
  governance: "strategy-governance",
  training: "strategy-governance",
};

/** True for a known group slug, e.g. from a route param. */
export function isServiceGroup(value: string): value is ServiceGroup {
  return (SERVICE_GROUP_ORDER as readonly string[]).includes(value);
}

/** True for a known direction slug, e.g. from a route param. */
export function isServiceDirection(value: string): value is ServiceDirection {
  return (SERVICE_DIRECTION_ORDER as readonly string[]).includes(value);
}

/** Parent direction of a group. */
export function groupDirection(group: ServiceGroup): ServiceDirection {
  return SERVICE_GROUP_DIRECTION[group];
}

export interface ServiceGroupBucket {
  group: ServiceGroup;
  services: Service[];
}

export interface ServiceDirectionBucket {
  direction: ServiceDirection;
  groups: ServiceGroupBucket[];
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

/**
 * Splits a service list into ordered directions, keeping empty groups out of
 * each direction. The direction itself stays even when it has no services yet:
 * the hub and the direction routes render all six from the first wave.
 */
export function groupServicesByDirection(services: Service[]): ServiceDirectionBucket[] {
  const buckets = groupServices(services);
  return SERVICE_DIRECTION_ORDER.map((direction) => ({
    direction,
    groups: SERVICE_DIRECTION_GROUPS[direction].flatMap((group) =>
      buckets.filter((bucket) => bucket.group === group),
    ),
  }));
}
