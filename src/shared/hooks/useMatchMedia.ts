import { useEffect, useState } from "react";
import { BREAKPOINTS, type Breakpoint } from "../config/breakpoints";

/**
 * Подписка на media-запрос в стиле MUI breakpoints.
 *
 * - `useMatchMedia("(min-width: 900px)")` — произвольный запрос;
 * - `useBreakpointUp("md")` — совместимость с `theme.breakpoints.up`.
 */
export function useMatchMedia(query: string): boolean {
  // Start `false` so the first client render matches the server output (which
  // has no `window`); the effect syncs the real value after mount. Reading
  // `window` in the initializer would instead trip React hydration.
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useBreakpointUp(screen: Breakpoint): boolean {
  return useMatchMedia(`(min-width: ${BREAKPOINTS[screen]}px)`);
}

export function useBreakpointDown(screen: Breakpoint): boolean {
  return useMatchMedia(`(max-width: ${BREAKPOINTS[screen] - 1}px)`);
}
