import { describe, expect, it } from "vitest";
import { resolveAddon } from "./resolveAddon";

describe("resolveAddon", () => {
  it("резолвит коэффициент capability", () => {
    expect(resolveAddon("text-to-video")?.setupFactor).toBe(0.2);
  });

  it("резолвит коэффициент capability", () => {
    expect(resolveAddon("localization")?.setupFactor).toBe(0.1);
  });

  it("резолвит коэффициент software-type", () => {
    expect(resolveAddon("crm")?.setupFactor).toBe(0.35);
  });

  it("неизвестный ref даёт undefined", () => {
    expect(resolveAddon("does-not-exist")).toBeUndefined();
  });
});
