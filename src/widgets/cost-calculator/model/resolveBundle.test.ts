import { describe, expect, it } from "vitest";
import { getServiceBySlug } from "@/entities/service";
import { resolveBundle } from "./resolveBundle";

describe("resolveBundle", () => {
  it("тянет цену услуги по слагу, без дублирования сумм", () => {
    expect(resolveBundle("video-generation")).toEqual(getServiceBySlug("video-generation")?.price);
    expect(resolveBundle("ai-video-training")?.amount).toBe(240000);
  });

  it("неизвестный слаг отдаёт undefined", () => {
    expect(resolveBundle("does-not-exist")).toBeUndefined();
  });
});
