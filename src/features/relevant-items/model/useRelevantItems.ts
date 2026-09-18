import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { EntityRef } from "@/features/relevant-items/model/entityRef";
import { type ResolvedRelevant, resolveRelevants } from "@/features/relevant-items/model/relevants";
import { getPathWithoutLang } from "@/shared/i18n";

/**
 * Resolves the block's relevant links against the current path: self references
 * (a link to the page we are already on) are filtered out. href'ы релевантов —
 * чистые пути, поэтому сравниваем с путём БЕЗ языкового префикса.
 */
export function useRelevantItems(items: EntityRef[]): ResolvedRelevant[] {
  const { pathname } = useLocation();
  const currentPath = getPathWithoutLang(pathname);
  return useMemo(() => resolveRelevants(items, currentPath), [items, currentPath]);
}
