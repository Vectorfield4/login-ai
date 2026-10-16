import { describe, expect, it } from "vitest";
import { bumpVersion, formatVersion, parseVersion } from "../../scripts/version.mjs";

describe("version bump", () => {
  it("патч поднимает только patch", () => {
    expect(bumpVersion("1.7.7", "patch")).toBe("1.7.8");
  });

  it("минор сбрасывает patch", () => {
    expect(bumpVersion("1.7.7", "minor")).toBe("1.8.0");
  });

  it("мажор сбрасывает minor и patch", () => {
    expect(bumpVersion("1.7.7", "major")).toBe("2.0.0");
  });

  it("parse и format — обратная пара", () => {
    expect(parseVersion("1.8.0")).toEqual({ major: 1, minor: 8, patch: 0 });
    expect(formatVersion({ major: 2, minor: 0, patch: 1 })).toBe("2.0.1");
  });

  it("падает на неверном формате или неизвестном виде", () => {
    expect(() => parseVersion("1.8")).toThrow();
    expect(() => parseVersion("v1.8.0")).toThrow();
    expect(() => bumpVersion("1.7.7", "majorx" as never)).toThrow();
  });
});
