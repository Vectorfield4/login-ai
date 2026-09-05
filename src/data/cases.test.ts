import { describe, expect, it } from "vitest";
import { cases } from "./cases";
import { getSolution } from "./solutions";

// В отличие от solutions.test.ts, image здесь НЕ обязателен: у демо-кейсов нет
// обложек (поле-расширение появится вместе с реальным портфолио).
describe("cases data", () => {
  it("slug кейсов уникальны", () => {
    const slugs = cases.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("каждый кейс имеет иконку и industryKey из пространства audiences", () => {
    for (const caseStudy of cases) {
      expect(caseStudy.icon, `кейс "${caseStudy.slug}" должен иметь icon`).toBeTruthy();
      expect(
        caseStudy.industryKey.startsWith("audiences."),
        `industryKey кейса "${caseStudy.slug}" должен начинаться с "audiences."`,
      ).toBe(true);
    }
  });

  it("текстовые поля — непустые i18n-ключи пространства cases", () => {
    for (const caseStudy of cases) {
      for (const field of [caseStudy.title, caseStudy.tagline, caseStudy.description]) {
        expect(field, `поле кейса "${caseStudy.slug}"`).toMatch(
          /^cases\.\S+\.(title|tagline|description)$/,
        );
      }
      expect(caseStudy.metrics).toHaveLength(3);
      for (const [index, metric] of caseStudy.metrics.entries()) {
        expect(
          metric.label,
          `label метрики ${index} кейса "${caseStudy.slug}" должен быть ключом cases.*`,
        ).toMatch(/^cases\.\S+\.metrics\.\d+\.label$/);
        expect(
          metric.value,
          `value метрики ${index} кейса "${caseStudy.slug}" должен быть ключом cases.*`,
        ).toMatch(/^cases\.\S+\.metrics\.\d+\.value$/);
      }
    }
  });

  it("каждый relatedSolution (когда задан) ссылается на существующее решение", () => {
    for (const caseStudy of cases) {
      if (caseStudy.relatedSolution) {
        expect(
          getSolution(caseStudy.relatedSolution),
          `relatedSolution кейса "${caseStudy.slug}" должен быть известным slug решения`,
        ).toBeDefined();
      }
    }
  });
});
