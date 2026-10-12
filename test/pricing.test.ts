import { describe, expect, it } from "vitest";
import { getServices } from "@/entities/service";
import { getSolutions } from "@/entities/solution";
import { SCHEMA_TYPE } from "@/shared/data/schema";
import { resolveSchemaOrg } from "@/shared/data/seo";
import type { PriceUnit } from "@/shared/types/content";

const UNITS: PriceUnit[] = ["project", "program", "month", "language"];

/** Первый узел схемы с данным `@type`. */
function findByType(schemas: object[], type: string): Record<string, unknown> | undefined {
  return schemas.find((schema) => (schema as { "@type"?: string })["@type"] === type) as
    | Record<string, unknown>
    | undefined;
}

describe("pricing: порог у каждой услуги", () => {
  it("price задан, сумма положительна, единица из списка", () => {
    for (const service of getServices()) {
      const price = service.price;
      expect(price, `${service.slug}: нет price`).toBeDefined();
      if (!price) continue;
      expect(price.amount, `${service.slug}.price.amount`).toBeGreaterThan(0);
      expect(UNITS, `${service.slug}.price.unit`).toContain(price.unit);
    }
  });

  it("порог услуги отдаётся в JSON-LD как AggregateOffer в RUB", () => {
    const service = getServices()[0];
    const canonical = `https://loginai.ru/ru/services/${service.slug}/`;
    const schemas = resolveSchemaOrg("ru", `/services/${service.slug}`, canonical);
    const entity = findByType(schemas, SCHEMA_TYPE.service);
    const offer = entity?.offers as Record<string, unknown> | undefined;
    expect(offer?.["@type"]).toBe(SCHEMA_TYPE.aggregateOffer);
    expect(offer?.priceCurrency).toBe("RUB");
    expect(offer?.lowPrice).toBe(service.price?.amount);
  });
});

describe("pricing: порог и пакеты у каждого решения", () => {
  it("price задан, пакетов три, порог равен пакету «Внедрение»", () => {
    for (const solution of getSolutions()) {
      const price = solution.price;
      expect(price, `${solution.slug}: нет price`).toBeDefined();
      if (!price) continue;
      expect(price.amount).toBeGreaterThan(0);
      expect(UNITS).toContain(price.unit);

      const packages = solution.packages ?? [];
      expect(packages, `${solution.slug}: пакетов не три`).toHaveLength(3);
      const amounts = packages.map((pkg) => pkg.amount);
      for (const amount of amounts) expect(amount).toBeGreaterThan(0);
      // Порядок пакетов: Пилот, Внедрение, Платформа.
      expect(amounts[1], `${solution.slug}: порог ≠ пакету «Внедрение»`).toBe(price.amount);
      for (const pkg of packages) {
        expect(pkg.name, `${solution.slug}: имя пакета не ключ pricing`).toMatch(
          /^pricing\.packages\.\S+$/,
        );
      }
    }
  });

  it("диапазон пакетов отдаётся как AggregateOffer с lowPrice и highPrice", () => {
    const solution = getSolutions()[0];
    const canonical = `https://loginai.ru/ru/solutions/${solution.slug}/`;
    const schemas = resolveSchemaOrg("ru", `/solutions/${solution.slug}`, canonical);
    const entity = findByType(schemas, SCHEMA_TYPE.product);
    const offer = entity?.offers as Record<string, unknown> | undefined;
    const amounts = (solution.packages ?? []).map((pkg) => pkg.amount);
    expect(offer?.["@type"]).toBe(SCHEMA_TYPE.aggregateOffer);
    expect(offer?.lowPrice).toBe(Math.min(...amounts));
    expect(offer?.highPrice).toBe(Math.max(...amounts));
    expect(offer?.offerCount).toBe(3);
  });
});
