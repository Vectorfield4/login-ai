import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { EntityRef } from "../types/entityRef";
import { type ResolvedRelevant, resolveRelevants } from "./relevants";

/**
 * Resolves the block's relevant links against the current path: self references
 * (a link to the page we are already on) are filtered out.
 */
export function useRelevantItems(items: EntityRef[]): ResolvedRelevant[] {
  const { pathname } = useLocation();
  return useMemo(() => resolveRelevants(items, pathname), [items, pathname]);
}
