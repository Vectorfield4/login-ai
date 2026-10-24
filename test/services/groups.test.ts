import { describe, expect, it } from "vitest";
import {
  groupDirection,
  groupServices,
  isServiceDirection,
  isServiceGroup,
  SERVICE_DIRECTION_GROUPS,
  SERVICE_DIRECTION_ORDER,
  SERVICE_GROUP_DIRECTION,
  SERVICE_GROUP_ORDER,
} from "@/entities/service/model/groupServices";
import type { Service } from "@/entities/service/model/services";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";

/**
 * Service grouping and its parent directions: `groupServices` drops empty
 * buckets and keeps `SERVICE_GROUP_ORDER`, every group has one direction, and
 * the menu copy for each group and direction exists in RU and EN.
 */
describe("groupServices", () => {
  it("порядок групп фиксирован, пустые выпадают", () => {
    const fake = [
      { slug: "b", group: "ml" },
      { slug: "a", group: "agentic" },
    ] as unknown as Service[];
    const groups = groupServices(fake);
    expect(groups.map((bucket) => bucket.group)).toEqual(["agentic", "ml"]);
    expect(groups[0].services.map((service) => service.slug)).toEqual(["a"]);
  });

  it("порядок совпадает с SERVICE_GROUP_ORDER", () => {
    const groups = groupServices([
      { slug: "t", group: "training" },
      { slug: "e", group: "engineering" },
    ] as unknown as Service[]);
    const expected = SERVICE_GROUP_ORDER.filter(
      (group) => group === "engineering" || group === "training",
    );
    expect(groups.map((bucket) => bucket.group)).toEqual(expected);
  });
});

describe("service directions", () => {
  it("шесть направлений и 15 групп покрыты картой", () => {
    expect(SERVICE_DIRECTION_ORDER).toHaveLength(6);

    const groups = SERVICE_DIRECTION_ORDER.flatMap(
      (direction) => SERVICE_DIRECTION_GROUPS[direction],
    );
    expect(groups.slice().sort()).toEqual(SERVICE_GROUP_ORDER.slice().sort());
    expect(new Set(groups).size).toBe(groups.length);
    expect(groups).toHaveLength(15);
  });

  it("каждая группа знает своё направление", () => {
    for (const group of SERVICE_GROUP_ORDER) {
      const direction = groupDirection(group);
      expect(SERVICE_DIRECTION_GROUPS[direction]).toContain(group);
      expect(SERVICE_GROUP_DIRECTION[group]).toBe(direction);
    }
  });

  it("слаги маршрутов валидируются", () => {
    expect(isServiceGroup("agentic")).toBe(true);
    expect(isServiceGroup("nope")).toBe(false);
    expect(isServiceDirection("agents")).toBe(true);
    expect(isServiceDirection("nope")).toBe(false);
  });
});

describe("service group and direction content", () => {
  it("группа content стоит перед training", () => {
    const content = SERVICE_GROUP_ORDER.indexOf("content");
    const training = SERVICE_GROUP_ORDER.indexOf("training");
    expect(content, "content отсутствует в SERVICE_GROUP_ORDER").toBeGreaterThanOrEqual(0);
    expect(content, "content должен идти перед training").toBeLessThan(training);
  });

  it("у каждой группы есть label, title, subtitle в RU и EN", () => {
    for (const lang of ["ru", "en"] as const) {
      const dict = lang === "ru" ? astroDictRu : astroDictEn;
      const groups = (dict as { servicesGroups: Record<string, Record<string, string>> })
        .servicesGroups;
      for (const group of SERVICE_GROUP_ORDER) {
        const entry = groups[group];
        expect(entry, `${lang}: servicesGroups.${group} отсутствует`).toBeDefined();
        for (const field of ["label", "title", "subtitle"] as const) {
          expect(entry?.[field], `${lang}: servicesGroups.${group}.${field}`).toBeTruthy();
        }
      }
    }
  });

  it("у каждого направления есть label, title, subtitle, text в RU и EN", () => {
    for (const lang of ["ru", "en"] as const) {
      const dict = lang === "ru" ? astroDictRu : astroDictEn;
      const directions = (dict as { servicesDirections: Record<string, Record<string, string>> })
        .servicesDirections;
      for (const direction of SERVICE_DIRECTION_ORDER) {
        const entry = directions[direction];
        expect(entry, `${lang}: servicesDirections.${direction} отсутствует`).toBeDefined();
        for (const field of ["label", "title", "subtitle", "text"] as const) {
          expect(entry?.[field], `${lang}: servicesDirections.${direction}.${field}`).toBeTruthy();
        }
      }
    }
  });
});
