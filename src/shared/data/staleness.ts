/**
 * Staleness report for the `updatedAt` gate, section 7 of
 * `docs/plans/content-expansion-plan.md`.
 *
 * A source (article or entity) links a target. When the target was updated
 * after the source, the source may still describe the old version and should be
 * re-read. This is a report: callers decide whether to warn or fail.
 */

/** A node with an optional revision date (ISO `YYYY-MM-DD` or fuller). */
export interface StaleNode {
  id: string;
  updatedAt?: string;
}

/** A directed reference from one node to another. */
export interface StaleRef {
  sourceId: string;
  targetId: string;
}

export interface StaleEdge {
  source: string;
  target: string;
  sourceUpdatedAt: string;
  targetUpdatedAt: string;
}

/** Edges whose target is newer than its source; edges missing a date are skipped. */
export function computeStaleEdges(nodes: StaleNode[], refs: StaleRef[]): StaleEdge[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const stale: StaleEdge[] = [];
  for (const ref of refs) {
    const source = byId.get(ref.sourceId);
    const target = byId.get(ref.targetId);
    if (!source?.updatedAt || !target?.updatedAt) continue;
    if (target.updatedAt > source.updatedAt) {
      stale.push({
        source: ref.sourceId,
        target: ref.targetId,
        sourceUpdatedAt: source.updatedAt,
        targetUpdatedAt: target.updatedAt,
      });
    }
  }
  return stale;
}
