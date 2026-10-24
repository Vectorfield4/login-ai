import { useLayoutEffect, useRef, useState } from "react";

/** Space kept between a fitted panel and the viewport edge, px. */
export const VIEWPORT_MARGIN = 12;

/** Row the panel hangs off: viewport offset and width, px. */
export interface FitAnchor {
  top: number;
  left: number;
  width: number;
}

/** Panel size as rendered, px. */
export interface FitPanel {
  width: number;
  height: number;
}

/** Visible viewport size, px. */
export interface FitViewport {
  width: number;
  height: number;
}

/** How a panel anchored at its row's `top: 0; left: 100%` stays on screen. */
export interface FlyoutFit {
  /** Offset from the anchor, px. Negative lifts the panel up. */
  offsetTop: number;
  /** Offset from the anchor, px. Negative flips the panel to the anchor's left. */
  offsetLeft: number;
  /**
   * Height cap for a panel taller than the viewport, px. The caller scrolls the
   * panel when the cap is set, because lifting alone cannot fit the content.
   */
  maxHeight?: number;
}

/**
 * Fits a panel that hangs off a menu row inside the viewport.
 *
 * Vertically the panel is anchored at `top: 0` of its row, so a row near the
 * bottom of a menu pushes the whole panel below the fold: the fit lifts it
 * until its bottom sits `VIEWPORT_MARGIN` above the edge, and caps the height
 * when even the lifted panel cannot fit. Horizontally the panel opens at
 * `left: 100%`, so the deepest level can run off the right edge on a narrow
 * desktop: the fit flips it to the anchor's left instead.
 */
export function computeFlyoutFit(
  anchor: FitAnchor,
  panel: FitPanel,
  viewport: FitViewport,
): FlyoutFit {
  const usableHeight = viewport.height - VIEWPORT_MARGIN * 2;
  const maxHeight = panel.height > usableHeight ? usableHeight : undefined;
  const fitted = maxHeight ?? panel.height;
  const cap = maxHeight === undefined ? {} : { maxHeight };

  // The lift never crosses the top margin: a panel that would overshoot is
  // capped first, and a capped panel starts above `VIEWPORT_MARGIN` by
  // construction.
  const bottomFits = anchor.top + fitted <= viewport.height - VIEWPORT_MARGIN;
  const offsetTop = bottomFits ? 0 : viewport.height - VIEWPORT_MARGIN - anchor.top - fitted;
  const rightFits = anchor.left + anchor.width + panel.width <= viewport.width - VIEWPORT_MARGIN;

  return { offsetTop, offsetLeft: rightFits ? 0 : -panel.width, ...cap };
}

/**
 * Measured viewport fit for a panel whose offset parent is the row it belongs
 * to. The panel anchors itself with `position: absolute; top: 0; left: 100%`,
 * so the parent rect gives the unshifted position and `scrollHeight` the
 * uncapped height — `rect.height` would report an already applied cap and
 * toggle it forever.
 */
export function useViewportFit<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [fit, setFit] = useState<FlyoutFit>({ offsetTop: 0, offsetLeft: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const element = ref.current;
      const anchor = element?.parentElement;
      if (!element || !anchor) return;
      const anchorRect = anchor.getBoundingClientRect();
      const panelRect = element.getBoundingClientRect();
      setFit(
        computeFlyoutFit(
          { top: anchorRect.top, left: anchorRect.left, width: anchorRect.width },
          { width: panelRect.width, height: element.scrollHeight },
          { width: window.innerWidth, height: window.innerHeight },
        ),
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { ref, fit };
}
