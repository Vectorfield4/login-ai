import { Sparkles } from "lucide-react";
import { describe, expect, it } from "vitest";
import { groupServices, SERVICE_GROUP_ORDER } from "@/entities/service/model/groupServices";
import type { Service } from "@/entities/service/model/services";
import { ENTITY_ICONS, resolveEntityIcon } from "@/shared/data/iconCatalog";
import { astroDictEn, astroDictRu } from "@/shared/i18n/dict";

/**
 * Two small resolvers with silent fallbacks: an unknown icon key renders
 * `Sparkles` and an empty group disappears from the menu. Both behaviors were
 * only visible on screen before.
 */
describe("resolveEntityIcon", () => {
  it("известный ключ резолвится, неизвестный и пустой → Sparkles", () => {
    expect(resolveEntityIcon("code")).toBe(ENTITY_ICONS.code);
    expect(resolveEntityIcon("no-such-icon")).toBe(Sparkles);
    expect(resolveEntityIcon(undefined)).toBe(Sparkles);
  });
});

describe("groupServices", () => {
  it("порядок групп фиксирован, пустые выпадают", () => {
    const fake = [
      { slug: "b", group: "ml" },
      { slug: "a", group: "ai-integrations" },
    ] as unknown as Service[];
    const groups = groupServices(fake);
    expect(groups.map((bucket) => bucket.group)).toEqual(["ai-integrations", "ml"]);
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

describe("service group content", () => {
  it("группа content стоит перед training", () => {
    const content = SERVICE_GROUP_ORDER.indexOf("content");
    const training = SERVICE_GROUP_ORDER.indexOf("training");
    expect(content, "content отсутствует в SERVICE_GROUP_ORDER").toBeGreaterThanOrEqual(0);
    expect(content, "content должен идти перед training").toBeLessThan(training);
  });

  it("servicesGroups.content несёт label, title, subtitle в RU и EN", () => {
    for (const lang of ["ru", "en"] as const) {
      const dict = lang === "ru" ? astroDictRu : astroDictEn;
      const group = (dict as { servicesGroups: Record<string, Record<string, string>> })
        .servicesGroups.content;
      expect(group, `${lang}: servicesGroups.content отсутствует`).toBeDefined();
      for (const field of ["label", "title", "subtitle"] as const) {
        expect(group?.[field], `${lang}: servicesGroups.content.${field}`).toBeTruthy();
      }
    }
  });
});
