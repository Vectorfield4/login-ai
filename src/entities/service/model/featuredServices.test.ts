import { describe, expect, it } from "vitest";
import { FEATURED_SERVICE_SLUGS } from "./featuredServices";
import { getFeaturedServices, getServices } from "./getters";

describe("featured services", () => {
  it("каждый закреплённый слаг есть среди опубликованных услуг", () => {
    const published = new Set(getServices().map((service) => service.slug));
    for (const slug of FEATURED_SERVICE_SLUGS) {
      expect(published.has(slug), `слаг "${slug}" не найден среди опубликованных услуг`).toBe(true);
    }
  });

  it("в наборе нет дублей, а геттер отдаёт его в заявленном порядке", () => {
    expect(new Set(FEATURED_SERVICE_SLUGS).size).toBe(FEATURED_SERVICE_SLUGS.length);
    expect(getFeaturedServices().map((service) => service.slug)).toEqual([
      ...FEATURED_SERVICE_SLUGS,
    ]);
  });
});
