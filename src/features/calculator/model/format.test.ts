import { describe, expect, it } from "vitest";
import { formatRange, formatWeeks } from "./format";

describe("formatRange", () => {
  it("схлопывает точку в одно число", () => {
    expect(formatRange("ru", { low: 1000, high: 1000 })).toBe("1\u00A0000 ₽");
  });

  it("рисует диапазон через тире", () => {
    expect(formatRange("ru", { low: 1000, high: 2000 })).toBe("1\u00A0000 ₽ – 2\u00A0000 ₽");
  });

  it("учитывает локаль", () => {
    expect(formatRange("en", { low: 1200, high: 1200 })).toBe("₽1,200");
  });

  it("сжимает крупные суммы до миллионов", () => {
    expect(formatRange("ru", { low: 2_000_000, high: 2_000_000 })).toBe("2 млн. ₽");
    expect(formatRange("ru", { low: 1_450_000, high: 1_450_000 })).toBe("1,45 млн. ₽");
    expect(formatRange("en", { low: 2_000_000, high: 2_000_000 })).toBe("₽2M");
  });
});

describe("formatWeeks", () => {
  it("ставит переведённую единицу", () => {
    expect(formatWeeks({ low: 6, high: 6 }, "нед.")).toBe("6 нед.");
    expect(formatWeeks({ low: 6, high: 9 }, "нед.")).toBe("6–9 нед.");
  });
});
