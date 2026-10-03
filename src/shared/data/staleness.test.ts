import { describe, expect, it } from "vitest";
import { computeStaleEdges } from "./staleness";

describe("computeStaleEdges", () => {
  it("флагует ссылку, если цель обновлена позже источника", () => {
    const stale = computeStaleEdges(
      [
        { id: "news:post", updatedAt: "2026-09-01" },
        { id: "service:x", updatedAt: "2026-10-01" },
      ],
      [{ sourceId: "news:post", targetId: "service:x" }],
    );
    expect(stale).toEqual([
      {
        source: "news:post",
        target: "service:x",
        sourceUpdatedAt: "2026-09-01",
        targetUpdatedAt: "2026-10-01",
      },
    ]);
  });

  it("не флагует, когда цель старше или равна источнику", () => {
    const nodes = [
      { id: "news:post", updatedAt: "2026-10-01" },
      { id: "service:x", updatedAt: "2026-09-01" },
    ];
    expect(computeStaleEdges(nodes, [{ sourceId: "news:post", targetId: "service:x" }])).toEqual(
      [],
    );
  });

  it("пропускает рёбра без даты хотя бы на одном конце", () => {
    const nodes = [{ id: "news:post", updatedAt: "2026-09-01" }, { id: "service:x" }];
    expect(computeStaleEdges(nodes, [{ sourceId: "news:post", targetId: "service:x" }])).toEqual(
      [],
    );
  });
});
