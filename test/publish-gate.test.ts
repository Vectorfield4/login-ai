import { describe, expect, it } from "vitest";
import { getCaseBySlug, getCases } from "@/entities/case";
import { getServiceBySlug, getServices } from "@/entities/service";
import { services } from "@/entities/service/model/fixtures";
import { getSolutionBySlug, getSolutions } from "@/entities/solution";
import { solutions } from "@/entities/solution/model/fixtures";
import { isPublished } from "@/shared/data/publishable";

/**
 * The draft gate (`shared/data/publishable.ts`) decides what reaches routes,
 * the menu and the sitemap. Getters filter drafts; a leak only showed up at
 * build time before. These tests pin the behavior directly.
 */
describe("publication gate", () => {
  it("isPublished отсекает только draft === true", () => {
    expect(isPublished({ draft: true })).toBe(false);
    expect(isPublished({ draft: false })).toBe(true);
    expect(isPublished({})).toBe(true);
  });

  it("getters отдают только опубликованные сущности", () => {
    for (const list of [getServices(), getSolutions(), getCases()]) {
      expect(list.every((entity) => entity.draft !== true)).toBe(true);
    }
  });

  it("getServiceBySlug / getSolutionBySlug не находят драфт", () => {
    for (const service of services.filter((item) => item.draft === true)) {
      expect(getServiceBySlug(service.slug), `драфт ${service.slug} утёк`).toBeUndefined();
    }
    for (const solution of solutions.filter((item) => item.draft === true)) {
      expect(getSolutionBySlug(solution.slug), `драфт ${solution.slug} утёк`).toBeUndefined();
    }
  });

  it("неизвестный слаг → undefined", () => {
    expect(getServiceBySlug("no-such-service")).toBeUndefined();
    expect(getSolutionBySlug("no-such-solution")).toBeUndefined();
    expect(getCaseBySlug("no-such-case")).toBeUndefined();
  });
});
