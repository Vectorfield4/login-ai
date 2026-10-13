import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  type ContentPlanEntry,
  type ContentPlanFile,
  type ContentPlanIndex,
  PLAN_FUNNELS,
  PLAN_GENRES,
  PLAN_PERSONA_FILES,
  PLAN_PERSONAS,
  PLAN_STRUCTURES,
} from "../content/plan/contract";

/**
 * The content plan is data, not prose: `content/plan/*.json` is the calendar
 * and `contract.ts` the contract. This suite keeps the files honest — enum
 * values, unique slugs, the Tuesday/Thursday rule, and index parity. Volume,
 * lexicon and covers stay in `articles.test.ts`.
 */

const PLAN_DIR = join(process.cwd(), "content/plan");

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(join(PLAN_DIR, file), "utf8")) as T;
}

const ENTRIES: ContentPlanEntry[] = [];
for (const [persona, file] of Object.entries(PLAN_PERSONA_FILES)) {
  const plan = readJson<ContentPlanFile>(file);
  expect(plan.persona, `${file}: persona должна совпадать с именем файла`).toBe(persona);
  ENTRIES.push(...plan.entries);
}

const INDEX = readJson<ContentPlanIndex>("index.json");

/** Tuesday (2) and Thursday (4), UTC. */
function weekday(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

describe("content plan: shape", () => {
  it("у каждой записи значение из контракта", () => {
    const bad = ENTRIES.filter(
      (entry) =>
        !PLAN_GENRES.includes(entry.genre) ||
        !PLAN_STRUCTURES.includes(entry.structure) ||
        !PLAN_FUNNELS.includes(entry.funnel) ||
        !PLAN_PERSONAS.includes(entry.persona) ||
        typeof entry.number !== "number" ||
        entry.slug.trim() === "" ||
        entry.query.trim() === "",
    ).map((entry) => entry.slug);
    expect(bad, "запись несёт genre/structure/funnel/persona из contract.ts").toEqual([]);
  });

  it("slug и номер уникальны", () => {
    const slugs = ENTRIES.map((entry) => entry.slug);
    const numbers = ENTRIES.map((entry) => entry.number);
    expect(new Set(slugs).size, "повтор slug").toBe(slugs.length);
    expect(new Set(numbers).size, "повтор number").toBe(numbers.length);
  });

  it("дата — вторник или четверг", () => {
    const bad = ENTRIES.filter(
      (entry) =>
        !/^\d{4}-\d{2}-\d{2}$/.test(entry.pubDate) || ![2, 4].includes(weekday(entry.pubDate)),
    ).map((entry) => `${entry.slug}: ${entry.pubDate}`);
    expect(bad, "даты — вторники и четверга").toEqual([]);
  });

  it("linkMatrix и ctaRoute согласованы", () => {
    const bad = ENTRIES.filter((entry) => {
      const matrix =
        entry.linkMatrix === "" || /^(service|solution|case):[a-z0-9-]+$/.test(entry.linkMatrix);
      const route = entry.ctaRoute === "" || entry.ctaRoute.startsWith("/");
      return !matrix || !route;
    }).map((entry) => entry.slug);
    expect(bad, "linkMatrix — kind:slug, ctaRoute — путь от корня").toEqual([]);
  });
});

describe("content plan: index parity", () => {
  it("index.json повторяет календарь и отсортирован по pubDate", () => {
    const fromEntries = [...ENTRIES]
      .sort((a, b) => a.pubDate.localeCompare(b.pubDate) || a.number - b.number)
      .map((entry) => `${entry.pubDate}\t${entry.slug}\t${entry.persona}\t${entry.funnel}`);
    const fromIndex = INDEX.entries.map(
      (entry) => `${entry.pubDate}\t${entry.slug}\t${entry.persona}\t${entry.funnel}`,
    );
    expect(fromIndex, "index.json должен повторять пару persona-файлов").toEqual(fromEntries);
    const sorted = [...INDEX.entries].every(
      (entry, i) => i === 0 || INDEX.entries[i - 1].pubDate <= entry.pubDate,
    );
    expect(sorted, "index.json отсортирован по pubDate").toBe(true);
  });
});
