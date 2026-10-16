import { describe, expect, it } from "vitest";
import { getCleanPath, routeUrl } from "../src/shared/data/routes";

describe("getCleanPath", () => {
  it("убирает локаль и хвостовой слэш", () => {
    expect(getCleanPath("/ru/solutions/customer-experience/")).toBe(
      "/solutions/customer-experience",
    );
    expect(getCleanPath("/en/services/ai-consulting/")).toBe("/services/ai-consulting");
    expect(getCleanPath("/ru/cases")).toBe("/cases");
  });

  it("схлопывает корень с локалью", () => {
    expect(getCleanPath("/")).toBe("/");
    expect(getCleanPath("/en")).toBe("/");
    expect(getCleanPath("/ru/")).toBe("/");
  });

  it("возвращает пустую строку до гидратации", () => {
    expect(getCleanPath("")).toBe("");
  });
});

describe("routeUrl", () => {
  it("локализует пути", () => {
    expect(routeUrl("/", "ru")).toBe("/");
    expect(routeUrl("/", "en")).toBe("/en");
    expect(routeUrl("/cases", "ru")).toBe("/ru/cases");
    expect(routeUrl("/cases", "en")).toBe("/en/cases");
  });

  it("добавляет фрагмент для глубокой ссылки", () => {
    expect(routeUrl("/services/content-generation", "ru", "calculator")).toBe(
      "/ru/services/content-generation#calculator",
    );
    expect(routeUrl("/services/content-generation", "en", "calculator")).toBe(
      "/en/services/content-generation#calculator",
    );
  });
});
