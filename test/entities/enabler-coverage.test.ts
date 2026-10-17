import { describe, expect, it } from "vitest";
import { capabilities, getCapabilityBySlug } from "@/entities/capability";
import { getLlmModelByName, llmModels } from "@/entities/llm-model";
import { modules } from "@/entities/module";
import { getServiceBySlug, services } from "@/entities/service";
import {
  getSoftwareTypeByProduct,
  getSoftwareTypeBySlug,
  softwareTypes,
} from "@/entities/software-type";
import { solutions } from "@/entities/solution";
import { getStackItemByName, STACK_CATEGORIES, STACK_KINDS, stack } from "@/entities/stack";
import {
  getTechnologies,
  getTechnologyBySlug,
  getTechnologyChildren,
  getTechnologyFamilyNameKey,
  TECHNOLOGY_FAMILIES,
  technologies,
} from "@/entities/technology";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";

const translators = {
  ru: createT("ru", astroDicts),
  en: createT("en", astroDicts),
};

describe("technology / stack / software-type enabler", () => {
  it("каждое имя из service.techStack и module.providers резолвится в stack или продукт", () => {
    const names = new Set<string>();
    for (const service of services) {
      for (const group of service.techStack ?? []) {
        for (const item of group.technologies) names.add(item.name);
      }
    }
    for (const module of modules) {
      for (const provider of module.providers) names.add(provider.name);
    }

    for (const name of names) {
      const target =
        getStackItemByName(name) ?? getSoftwareTypeByProduct(name) ?? getLlmModelByName(name);
      expect(target, `неизвестное имя: ${name}`).toBeDefined();
    }
  });

  it("каждый тег решения резолвится в technology или capability nameKey", () => {
    const keys = new Set([
      ...getTechnologies()
        .map((technology) => technology.nameKey)
        .filter((key): key is string => Boolean(key)),
      ...capabilities.map((capability) => capability.nameKey),
      ...TECHNOLOGY_FAMILIES.map(getTechnologyFamilyNameKey),
    ]);

    for (const solution of solutions) {
      for (const tag of solution.tags) {
        expect(keys.has(tag), `${solution.slug}: ${tag}`).toBe(true);
      }
    }
  });

  it("bundle остаётся только для отдельного сервиса, не для capability", () => {
    for (const entity of [...services, ...solutions]) {
      for (const term of entity.calculator?.terms ?? []) {
        if (term.kind !== "bundle") continue;
        expect(getServiceBySlug(term.ref), `${entity.slug}: ${term.ref}`).toBeDefined();
      }
    }
  });

  it("у каждого addon-терма есть pricing в каталоге, included-ссылки резолвятся", () => {
    for (const entity of [...services, ...solutions]) {
      for (const term of entity.calculator?.terms ?? []) {
        if (term.kind !== "addon") continue;
        const pricing =
          getTechnologyBySlug(term.ref)?.pricing ??
          getCapabilityBySlug(term.ref)?.pricing ??
          getSoftwareTypeBySlug(term.ref)?.pricing;
        expect(pricing, `${entity.slug}: addon ${term.ref}`).toBeDefined();
      }

      for (const item of entity.calculator?.included ?? []) {
        const target =
          item.kind === "technology"
            ? getTechnologyBySlug(item.slug)
            : item.kind === "capability"
              ? getCapabilityBySlug(item.slug)
              : item.kind === "service"
                ? getServiceBySlug(item.slug)
                : getSoftwareTypeBySlug(item.slug);
        expect(target, `${entity.slug}: included ${item.kind}:${item.slug}`).toBeDefined();
      }
    }
  });

  it("сервисы не попадают в каталоги technology и stack", () => {
    const catalogSlugs = new Set<string>([
      ...technologies.map((item) => item.slug),
      ...capabilities.map((item) => item.slug),
      ...stack.map((item) => item.slug),
    ]);

    for (const service of services) {
      expect(catalogSlugs.has(service.slug), `сервис в каталоге: ${service.slug}`).toBe(false);
    }
  });

  it("slug'и уникальны между technology, capability, stack, software-type и llm-model", () => {
    const slugs = [
      ...technologies.map((item) => item.slug),
      ...capabilities.map((item) => item.slug),
      ...stack.map((item) => item.slug),
      ...softwareTypes.map((item) => item.slug),
      ...llmModels.map((item) => item.slug),
    ];
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("у технологии ровно одно имя — name или nameKey", () => {
    for (const technology of technologies) {
      expect(Boolean(technology.name) !== Boolean(technology.nameKey), technology.slug).toBe(true);
    }
  });

  it("каждый family входит в известный набор", () => {
    for (const technology of technologies) {
      if (!technology.family) continue;
      expect(TECHNOLOGY_FAMILIES.includes(technology.family), technology.slug).toBe(true);
      expect(technology.family, technology.slug).not.toBe(technology.slug);
    }
  });

  it("video разложен на модальности", () => {
    const slugs = getTechnologyChildren("video").map((technology) => technology.slug);
    expect(slugs).toEqual(
      expect.arrayContaining(["text-to-video", "image-to-video", "video-to-video"]),
    );
  });

  it("имена stack-элементов и LLM-моделей уникальны", () => {
    const names = [...stack.map((item) => item.name), ...llmModels.map((item) => item.name)];
    expect(new Set(names).size).toBe(names.length);
  });

  it("stack: kind и category из допустимых наборов", () => {
    for (const item of stack) {
      expect(STACK_KINDS.includes(item.kind), `${item.slug}: kind ${item.kind}`).toBe(true);
      expect(
        STACK_CATEGORIES.includes(item.category),
        `${item.slug}: category ${item.category}`,
      ).toBe(true);
    }
  });

  it("kind и category не дублируют друг друга", () => {
    for (const item of stack) {
      expect(item.kind, item.slug).not.toBe(item.category);
    }
  });

  it("pgvector — extension в области database, а не data", () => {
    const item = stack.find((entry) => entry.slug === "pgvector");
    expect(item).toMatchObject({ kind: "extension", category: "database" });
  });

  it("продукты видов ПО не дублируются", () => {
    const products = softwareTypes.flatMap((softwareType) => softwareType.products);
    expect(new Set(products).size).toBe(products.length);
  });

  it("каждый nameKey и имя вида ПО есть в RU и EN", () => {
    for (const technology of technologies) {
      if (!technology.nameKey) continue;
      for (const lang of ["ru", "en"] as const) {
        expect(translators[lang](technology.nameKey), `${lang}: ${technology.nameKey}`).not.toBe(
          technology.nameKey,
        );
      }
    }

    for (const capability of capabilities) {
      for (const lang of ["ru", "en"] as const) {
        expect(translators[lang](capability.nameKey), `${lang}: ${capability.nameKey}`).not.toBe(
          capability.nameKey,
        );
      }
    }

    for (const softwareType of softwareTypes) {
      const key = `softwareTypes.${softwareType.slug}.name`;
      for (const lang of ["ru", "en"] as const) {
        expect(translators[lang](key), `${lang}: ${key}`).not.toBe(key);
      }
    }
  });
});
