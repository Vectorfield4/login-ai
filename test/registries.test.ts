import { Sparkles } from "lucide-react";
import { describe, expect, it } from "vitest";
import { ENTITY_ICONS, resolveEntityIcon } from "@/shared/data/iconCatalog";

/**
 * The icon resolver has a silent fallback: an unknown or empty key renders
 * `Sparkles`, which was only visible on screen before. Service grouping lives in
 * `test/services/groups.test.ts`.
 */
describe("resolveEntityIcon", () => {
  it("известный ключ резолвится, неизвестный и пустой → Sparkles", () => {
    expect(resolveEntityIcon("code")).toBe(ENTITY_ICONS.code);
    expect(resolveEntityIcon("no-such-icon")).toBe(Sparkles);
    expect(resolveEntityIcon(undefined)).toBe(Sparkles);
  });
});
