import { describe, expect, it } from "vitest";
import { internalPath, shouldDropLink } from "./dropDraftLinks";

describe("internalPath", () => {
  it("нормализует локаль, origin и хвосты", () => {
    expect(internalPath("/ru/services/ai-crm-integration")).toBe("/services/ai-crm-integration");
    expect(internalPath("https://loginai.ru/en/cases/quality-vision-line/")).toBe(
      "/cases/quality-vision-line",
    );
    expect(internalPath("/ru/solutions/manufacturers#top")).toBe("/solutions/manufacturers");
    expect(internalPath("/en/services/nlp-systems?x=1")).toBe("/services/nlp-systems");
  });

  it("внешние и нелокальные ссылки не трогает", () => {
    expect(internalPath("https://example.com/ru/services/x")).toBeUndefined();
    expect(internalPath("/contacts")).toBeUndefined();
    expect(internalPath("mailto:sales@loginai.ru")).toBeUndefined();
  });
});

describe("shouldDropLink", () => {
  it("снимает ссылку на недоступную сущность", () => {
    expect(shouldDropLink("https://loginai.ru/ru/services/not-published", () => false)).toBe(true);
  });

  it("оставляет ссылку на опубликованную сущность", () => {
    expect(shouldDropLink("https://loginai.ru/ru/services/ai-crm-integration", () => true)).toBe(
      false,
    );
  });

  it("не трогает внешние ссылки", () => {
    expect(shouldDropLink("https://example.com/page", () => false)).toBe(false);
  });
});
