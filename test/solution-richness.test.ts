import { describe, expect, it } from "vitest";
import { solutions } from "@/entities/solution/model/fixtures";
import type { Solution } from "@/entities/solution/model/solutions";

/**
 * Richness gate for solutions, mirroring `test/service-richness.test.ts`.
 * Published solutions must clear every rule so a solution page has the same
 * depth as a service page. Drafts and soft rules only warn. See
 * `docs/plans/marketing-trust-audit.md`.
 */

const n = (list: readonly unknown[] | undefined): number => list?.length ?? 0;

interface Rule {
  id: string;
  ok: (s: Solution) => boolean;
}

const RULES: Rule[] = [
  { id: "features>=4", ok: (s) => n(s.features) >= 4 },
  {
    id: "process>=4",
    ok: (s) => n(s.processSteps) >= 4 && (s.processSteps ?? []).every((p) => p.processType),
  },
  {
    id: "fit>=2+negative",
    ok: (s) => n(s.fitItems) >= 2 && (s.fitItems ?? []).some((f) => f.positive === false),
  },
  {
    id: "relevants>=3+2types",
    ok: (s) => n(s.relevants) >= 3 && new Set((s.relevants ?? []).map((r) => r.type)).size >= 2,
  },
  { id: "faq>=4", ok: (s) => n(s.faqItems) >= 4 },
  { id: "proof>=1", ok: (s) => n(s.proofItems) >= 1 },
  { id: "sections>=2", ok: (s) => n(s.sections) >= 2 },
  { id: "audiences>=1", ok: (s) => n(s.audiences) >= 1 },
  { id: "tags>=1", ok: (s) => n(s.tags) >= 1 },
  { id: "cta-banner", ok: (s) => s.ctaBanner !== undefined },
];

const published = solutions.filter((solution) => solution.draft !== true);
const drafts = solutions.filter((solution) => solution.draft === true);

const violations = (solution: Solution): string[] =>
  RULES.filter((rule) => !rule.ok(solution)).map((rule) => rule.id);

describe("solution richness", () => {
  it("опубликованные решения проходят все правила насыщенности", () => {
    const offenders = published.flatMap((solution) =>
      violations(solution).map((id) => `${solution.slug}: ${id}`),
    );
    expect(
      offenders,
      "решение ниже пола насыщенности (docs/plans/marketing-trust-audit.md)",
    ).toEqual([]);
  });

  it("драфты дают только warnings и не валят suite", () => {
    const draftWarn = drafts.flatMap((solution) =>
      violations(solution).map((id) => `${solution.slug}: ${id}`),
    );
    if (draftWarn.length) {
      console.warn(`[richness] драфты решений ниже пола (warnings):\n  ${draftWarn.join("\n  ")}`);
    }
    expect(drafts.every((solution) => solution.draft === true)).toBe(true);
  });
});
