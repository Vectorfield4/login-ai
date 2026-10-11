import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { services } from "@/entities/service/model/fixtures";
import type { Service } from "@/entities/service/model/services";

/**
 * Richness gate (plan: docs/plans/service-richness-audit.md).
 *
 * Published services must clear every rule. Drafts are not gated — they only
 * print warnings, mirroring the "publishable" split of the volume gate. Soft
 * rules (`proof>=2`) warn for everyone and never fail the suite. The baseline
 * ratchet reached zero, so the rules are unconditional.
 */

const DIAGRAMS_DIR = path.join(process.cwd(), "src/shared/assets/images/diagrams");

const SPECIALTY = ["tradeoffs", "outcomes", "mechanism", "scope", "deliverables"] as const;

const n = (list: readonly unknown[] | undefined): number => list?.length ?? 0;

const specialtyCount = (s: Service): number => SPECIALTY.filter((key) => n(s[key]) > 0).length;

function diagramsResolve(s: Service): boolean {
  return (s.mechanism ?? []).every((item) => {
    if (!item.diagram) return true;
    return (["ru", "en"] as const).every((lang) => {
      const base = path.join(DIAGRAMS_DIR, `${s.slug}.${item.diagram}.${lang}`);
      return existsSync(`${base}.svg`) && existsSync(`${base}.dark.svg`);
    });
  });
}

interface Rule {
  id: string;
  ok: (s: Service) => boolean;
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
  { id: "specialty>=2", ok: (s) => specialtyCount(s) >= 2 },
  { id: "result-block", ok: (s) => n(s.outcomes) + n(s.deliverables) > 0 },
  { id: "faq>=4", ok: (s) => n(s.faqItems) >= 4 },
  {
    id: "block>=3items",
    ok: (s) => SPECIALTY.every((key) => n(s[key]) === 0 || n(s[key]) >= 3),
  },
  { id: "diagram-resolves", ok: diagramsResolve },
  {
    id: "ml/ai-infra:mechanism+diagram",
    ok: (s) =>
      !["ml", "ai-infra"].includes(s.group) ||
      (n(s.mechanism) > 0 && (s.mechanism ?? []).some((m) => m.diagram)),
  },
  {
    id: "ai-integrations:deliverables",
    ok: (s) => s.group !== "ai-integrations" || n(s.deliverables) > 0,
  },
  {
    id: "ai-integrations:tradeoffs",
    ok: (s) => s.group !== "ai-integrations" || n(s.tradeoffs) > 0,
  },
  {
    id: "engineering:techstack+(scope|mechanism)",
    ok: (s) =>
      s.group !== "engineering" || (n(s.techStack) > 0 && (n(s.scope) > 0 || n(s.mechanism) > 0)),
  },
  { id: "web-growth:outcomes", ok: (s) => s.group !== "web-growth" || n(s.outcomes) > 0 },
  { id: "training:outcomes", ok: (s) => s.group !== "training" || n(s.outcomes) > 0 },
  { id: "training:faq>=5", ok: (s) => s.group !== "training" || n(s.faqItems) >= 5 },
];

const published = services.filter((service) => service.draft !== true);
const drafts = services.filter((service) => service.draft === true);

/** Soft floors: reported as warnings, never fail the suite. */
const WARN_RULES: Rule[] = [{ id: "proof>=2", ok: (s) => n(s.proofItems) >= 2 }];

const violations = (service: Service): string[] =>
  RULES.filter((rule) => !rule.ok(service)).map((rule) => rule.id);

const warnViolations = (service: Service): string[] =>
  WARN_RULES.filter((rule) => !rule.ok(service)).map((rule) => rule.id);

describe("service richness", () => {
  it("опубликованные услуги проходят все правила насыщенности", () => {
    const offenders = published.flatMap((service) =>
      violations(service).map((id) => `${service.slug}: ${id}`),
    );
    expect(
      offenders,
      "услуга ниже пола насыщенности (docs/plans/service-richness-audit.md)",
    ).toEqual([]);
  });

  it("мягкие правила и драфты дают только warnings и не валят suite", () => {
    const draftWarn = drafts.flatMap((service) =>
      [...violations(service), ...warnViolations(service)].map((id) => `${service.slug}: ${id}`),
    );
    const softWarn = published.flatMap((service) =>
      warnViolations(service).map((id) => `${service.slug}: ${id}`),
    );
    if (draftWarn.length) {
      console.warn(`[richness] драфты ниже пола (warnings):\n  ${draftWarn.join("\n  ")}`);
    }
    if (softWarn.length) {
      console.warn(`[richness] мягкие правила (warnings):\n  ${softWarn.join("\n  ")}`);
    }
    expect(drafts.every((service) => service.draft === true)).toBe(true);
  });
});
