import { describe, expect, it } from "vitest";
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
import { getTechnologies, getTechnologyBySlug, technologies } from "@/entities/technology";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import { ADDON_TARGETS } from "./addonTargets";

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

  it("каждый тег решения резолвится в technology.nameKey", () => {
    const keys = new Set(
      getTechnologies()
        .map((technology) => technology.nameKey)
        .filter((key): key is string => Boolean(key)),
    );

    for (const solution of solutions) {
      for (const tag of solution.tags) {
        expect(keys.has(tag), `${solution.slug}: ${tag}`).toBe(true);
      }
    }
  });

  it("у каждого bundle.ref есть цель, и в карте нет мёртвых записей", () => {
    const refs = new Set<string>();
    for (const entity of [...services, ...solutions]) {
      for (const term of entity.calculator?.terms ?? []) {
        if (term.kind === "bundle") refs.add(term.ref);
      }
    }

    for (const ref of refs) {
      const target = ADDON_TARGETS[ref];
      if (!target) throw new Error(`bundle.ref без цели: ${ref}`);

      if (target.kind === "software-type") {
        expect(
          getSoftwareTypeBySlug(target.slug),
          `${ref} → software-type:${target.slug}`,
        ).toBeDefined();
      }
      if (target.kind === "service") {
        expect(getServiceBySlug(ref), `${ref} → service`).toBeDefined();
        if (target.capability) {
          expect(
            getTechnologyBySlug(target.capability),
            `${ref} → capability:${target.capability}`,
          ).toBeDefined();
        }
      }
    }

    for (const ref of Object.keys(ADDON_TARGETS)) {
      expect(refs.has(ref), `мёртвая запись в карте: ${ref}`).toBe(true);
    }
  });

  it("сервисы не попадают в каталоги technology и stack", () => {
    const catalogSlugs = new Set<string>([
      ...technologies.map((item) => item.slug),
      ...stack.map((item) => item.slug),
    ]);

    for (const service of services) {
      expect(catalogSlugs.has(service.slug), `сервис в каталоге: ${service.slug}`).toBe(false);
    }
  });

  it("slug'и уникальны между technology, stack, software-type и llm-model", () => {
    const slugs = [
      ...technologies.map((item) => item.slug),
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

    for (const softwareType of softwareTypes) {
      const key = `softwareTypes.${softwareType.slug}.name`;
      for (const lang of ["ru", "en"] as const) {
        expect(translators[lang](key), `${lang}: ${key}`).not.toBe(key);
      }
    }
  });
});
