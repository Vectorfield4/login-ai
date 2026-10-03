import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { accent, accentSurface } from "./accent";

function channel(hex: string, index: number): number {
  const value = Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  return 0.2126 * channel(hex, 0) + 0.7152 * channel(hex, 1) + 0.0722 * channel(hex, 2);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("accent contrast", () => {
  it("акцент читается на поверхности в обеих темах (WCAG AA 4.5:1)", () => {
    expect(contrast(accent.light, accentSurface.light)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(accent.dark, accentSurface.dark)).toBeGreaterThanOrEqual(4.5);
  });

  it("tokens.stylex.ts повторяет значения accent.ts (StyleX требует литералы)", () => {
    const source = readFileSync(join(process.cwd(), "src/shared/design/tokens.stylex.ts"), "utf8");
    for (const value of Object.values(accent)) {
      expect(source).toContain(value);
    }
  });
});
