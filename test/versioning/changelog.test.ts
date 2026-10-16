import { describe, expect, it } from "vitest";
import {
  groupCommits,
  isSkippable,
  parseCommit,
  renderChangelog,
} from "../../scripts/changelog.mjs";

describe("changelog", () => {
  it("раскладывает конвенциональные и доменные префиксы по группам", () => {
    const groups = groupCommits([
      "feat(ui): add the hero",
      "content: add the cover",
      "fix: correct the price",
      "docs: explain the route",
      "refactor: split the module",
    ]);
    const byKey = Object.fromEntries(groups.map((group) => [group.key, group.items.length]));
    expect(byKey.feature).toBe(1);
    expect(byKey.content).toBe(1);
    expect(byKey.fix).toBe(1);
    expect(byKey.docs).toBe(1);
    expect(byKey.refactor).toBe(1);
    expect(byKey.other).toBeUndefined();
  });

  it("выкидывает merge и релизный коммит", () => {
    expect(isSkippable("Merge branch 'main'")).toBe(true);
    expect(isSkippable("chore(release): v1.8.0")).toBe(true);
    expect(isSkippable("feat: keep me")).toBe(false);
  });

  it("парсит scope и признак ломающего изменения", () => {
    expect(parseCommit("fix(api)!: drop v1")).toEqual({
      type: "fix",
      scope: "api",
      breaking: true,
      description: "drop v1",
    });
  });

  it("рендерит заголовок, группу и CRLF-переводы", () => {
    const out = renderChangelog({
      version: "1.8.0",
      date: "2026-10-16",
      commits: ["feat: x"],
    });
    expect(out).toContain("# v1.8.0 — 2026-10-16");
    expect(out).toContain("## 🚀 Features");
    expect(out).toContain("- x");
    expect(out.includes("\r\n")).toBe(true);
    expect(out.endsWith("\r\n")).toBe(true);
  });

  it("не повторяет релизный коммит в теле", () => {
    const out = renderChangelog({
      version: "1.8.0",
      date: "2026-10-16",
      commits: ["chore(release): v1.8.0", "fix: a"],
    });
    expect(out).not.toContain("chore(release)");
  });
});
