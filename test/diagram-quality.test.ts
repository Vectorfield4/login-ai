import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Diagram quality gate (plan: docs/plans/service-diagrams-2-plan.md).
 *
 * The audit found 90/100 diagrams were a flat A -> B -> C chain, all
 * `flowchart LR`, with no `subgraph` and no non-flowchart type. This gate keeps
 * that from coming back: a flowchart must carry structure (a branch, a merge, a
 * loop or a `subgraph`), each service needs one diagram that is richer still
 * (a loop or two planes), and the catalog keeps a healthy mix of diagram types.
 *
 * Only the English sources are asserted; the RU/EN parity check reads both.
 */

const DIAGRAMS_SRC = path.join(process.cwd(), "src/shared/assets/diagrams");

const EDGE =
  /([a-zA-Z0-9_]+)\s*(?:\[[^\]]*\]|\([^)]*\)|\{[^}]*\})?\s*(?:--[->x]|---|==>|-\.->|--[ox])\s*(?:\|[^|]*\|\s*)?([a-zA-Z0-9_]+)/g;

const SKIP =
  /^(flowchart|graph|subgraph|end|direction|linkStyle|style|classDef|class|click|%%|state |participant|note |alt|else|opt|loop|rect|activate|deactivate)/i;

type DiagramType = "flowchart" | "state" | "sequence" | "er";

interface Diagram {
  service: string;
  slug: string;
  lang: string;
  type: DiagramType;
  rich: boolean;
  deep: boolean;
}

function diagramType(text: string): DiagramType {
  if (/^\s*sequenceDiagram/m.test(text)) return "sequence";
  if (/^\s*stateDiagram/m.test(text)) return "state";
  if (/^\s*erDiagram/m.test(text)) return "er";
  return "flowchart";
}

/** Branch / merge / loop / `subgraph` facts for a flowchart body. */
function flowchartShape(text: string): { rich: boolean; deep: boolean } {
  const out = new Map<string, number>();
  const inc = new Map<string, number>();
  const nodes = new Set<string>();
  const adj = new Map<string, string[]>();

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || SKIP.test(trimmed)) continue;
    EDGE.lastIndex = 0;
    for (let match = EDGE.exec(trimmed); match !== null; match = EDGE.exec(trimmed)) {
      const [, from, to] = match;
      nodes.add(from);
      nodes.add(to);
      out.set(from, (out.get(from) ?? 0) + 1);
      inc.set(to, (inc.get(to) ?? 0) + 1);
      if (!adj.has(from)) adj.set(from, []);
      adj.get(from)?.push(to);
    }
  }

  let cyclic = false;
  for (const start of nodes) {
    const seen = new Set<string>();
    const stack = [start];
    while (stack.length) {
      const cur = stack.pop() as string;
      for (const next of adj.get(cur) ?? []) {
        if (next === start) {
          cyclic = true;
          break;
        }
        if (!seen.has(next)) {
          seen.add(next);
          stack.push(next);
        }
      }
      if (cyclic) break;
    }
    if (cyclic) break;
  }

  const branch = [...nodes].some((n) => (out.get(n) ?? 0) > 1);
  const merge = [...nodes].some((n) => (inc.get(n) ?? 0) > 1);
  const planes = (text.match(/\bsubgraph\b/g) ?? []).length;

  return {
    rich: branch || merge || cyclic || planes >= 1,
    deep: cyclic || planes >= 2,
  };
}

const files = readdirSync(DIAGRAMS_SRC).filter((f) => f.endsWith(".mmd"));

const diagrams: Diagram[] = files.map((file) => {
  const [service, slug, lang] = file.replace(/\.mmd$/, "").split(".");
  const text = readFileSync(path.join(DIAGRAMS_SRC, file), "utf8");
  const type = diagramType(text);
  const shape = type === "flowchart" ? flowchartShape(text) : { rich: true, deep: true };
  return { service, slug, lang, type, ...shape };
});

const en = diagrams.filter((d) => d.lang === "en");

describe("diagram quality", () => {
  it("every diagram carries structure beyond a bare chain", () => {
    const flat = en.filter((d) => !d.rich).map((d) => `${d.service}.${d.slug}`);
    expect(flat).toEqual([]);
  });

  it("every service has at least one loop or two-plane diagram", () => {
    const byService = new Map<string, Diagram[]>();
    for (const d of en) {
      if (!byService.has(d.service)) byService.set(d.service, []);
      byService.get(d.service)?.push(d);
    }
    const shallow = [...byService.entries()]
      .filter(([, list]) => !list.some((d) => d.deep))
      .map(([service]) => service);
    expect(shallow).toEqual([]);
  });

  it("keeps a mix of diagram types", () => {
    const count = (type: DiagramType) => en.filter((d) => d.type === type).length;
    expect(count("flowchart")).toBeLessThanOrEqual(65);
    expect(count("state") + count("sequence") + count("er")).toBeGreaterThanOrEqual(30);
  });

  it("RU and EN use the same diagram type", () => {
    const enByKey = new Map(
      diagrams.filter((d) => d.lang === "en").map((d) => [`${d.service}.${d.slug}`, d.type]),
    );
    const mismatched = diagrams
      .filter((d) => d.lang === "ru")
      .filter((d) => enByKey.get(`${d.service}.${d.slug}`) !== d.type)
      .map((d) => `${d.service}.${d.slug}`);
    expect(mismatched).toEqual([]);
  });
});
