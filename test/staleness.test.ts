import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cases } from "@/entities/case/model/fixtures";
import { services } from "@/entities/service/model/fixtures";
import { solutions } from "@/entities/solution/model/fixtures";
import { computeStaleEdges, type StaleNode, type StaleRef } from "@/shared/data/staleness";

/**
 * `updatedAt` staleness report (plan, section 7): a published source that links
 * an entity updated after it should be re-read. Reads real articles and fixtures;
 * when no `updatedAt` is set anywhere the report is empty.
 */

const articlesDir = join(process.cwd(), "articles");

function frontmatter(text: string): Record<string, string> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!match) return {};
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    fields[line.slice(0, idx).trim()] = value;
  }
  return fields;
}

function slugList(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

describe("staleness report", () => {
  it("нет ссылок на сущности, обновлённые после источника", () => {
    const nodes: StaleNode[] = [];
    const refs: StaleRef[] = [];

    for (const service of services) {
      nodes.push({ id: `service:${service.slug}`, updatedAt: service.updatedAt });
    }
    for (const solution of solutions) {
      nodes.push({ id: `solution:${solution.slug}`, updatedAt: solution.updatedAt });
    }
    for (const item of cases) {
      nodes.push({ id: `case:${item.slug}`, updatedAt: item.updatedAt });
    }

    for (const file of readdirSync(articlesDir)) {
      if (!file.endsWith(".md")) continue;
      const lang = file.endsWith(".en.md") ? "en" : "ru";
      const id = `news:${file.replace(/\.(ru|en)\.md$/, "")}:${lang}`;
      const fields = frontmatter(readFileSync(join(articlesDir, file), "utf8"));
      nodes.push({ id, updatedAt: fields.updatedAt });
      for (const slug of slugList(fields.relatedServices)) {
        refs.push({ sourceId: id, targetId: `service:${slug}` });
      }
      for (const slug of slugList(fields.relatedSolutions)) {
        refs.push({ sourceId: id, targetId: `solution:${slug}` });
      }
      for (const slug of slugList(fields.relatedCases)) {
        refs.push({ sourceId: id, targetId: `case:${slug}` });
      }
    }

    const stale = computeStaleEdges(nodes, refs);
    if (stale.length > 0) {
      console.warn(`staleness: ${stale.length} ссылок на обновлённые сущности`);
      for (const edge of stale) {
        console.warn(
          `  ${edge.source} (${edge.sourceUpdatedAt}) → ${edge.target} (${edge.targetUpdatedAt})`,
        );
      }
    }
    expect(stale).toEqual([]);
  });
});
