import * as stylex from "@stylexjs/stylex";
import type { CSSProperties, ReactNode } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useViewportFit } from "@/shared/hooks/useViewportFit";

const styles = stylex.create({
  panel: {
    position: "absolute",
    top: 0,
    left: "100%",
    minWidth: 200,
    padding: `${tokens.spacing1} 0`,
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurface,
    boxShadow: tokens.shadow8,
    zIndex: tokens.zAppbar,
    display: "flex",
    flexDirection: "column",
  },
});

/**
 * Nested panel of the bar dropdown: it opens to the right of the row that
 * holds it, flips left when that would leave the screen, and lifts itself back
 * into the viewport, so a third level never hangs below the fold or off the
 * right edge. A panel taller than the viewport scrolls instead.
 */
export default function NavFlyout({ children }: { children: ReactNode }) {
  const { ref, fit } = useViewportFit<HTMLDivElement>();
  const sty = stylex.props(styles.panel);
  const fitStyle: CSSProperties = { top: fit.offsetTop };

  if (fit.offsetLeft !== 0) fitStyle.left = fit.offsetLeft;

  if (fit.maxHeight !== undefined) {
    fitStyle.maxHeight = fit.maxHeight;
    fitStyle.overflowY = "auto";
  }

  return (
    <div
      ref={ref}
      role="menu"
      {...sty}
      style={{ ...(sty.style as CSSProperties | undefined), ...fitStyle }}
    >
      {children}
    </div>
  );
}
