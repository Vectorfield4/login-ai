import { describe, expect, it } from "vitest";
import {
  firstMeaningfulLine,
  loadConvention,
  validateSubject,
} from "../../scripts/commit-msg.mjs";

const allowed = loadConvention();

describe("commit-msg", () => {
  it("принимает конвенциональные и доменные префиксы", () => {
    const ok = [
      "feat: x",
      "fix(ui): y",
      "docs: z",
      "content: a",
      "skill: b",
      "agent: c",
      "news: d",
      "diagrams: e",
      "plan: f",
      "chore(release): v1.8.0",
    ];
    for (const subject of ok) {
      expect(validateSubject(subject, allowed), subject).toBeNull();
    }
  });

  it("отклоняет неизвестный префикс и голый текст", () => {
    expect(validateSubject("wip: something", allowed)).not.toBeNull();
    expect(validateSubject("just words", allowed)).not.toBeNull();
  });

  it("пропускает merge, revert и fixup", () => {
    expect(validateSubject("Merge branch 'main'", allowed)).toBeNull();
    expect(validateSubject('Revert "feat: x"', allowed)).toBeNull();
    expect(validateSubject("fixup! feat: x", allowed)).toBeNull();
  });

  it("берёт первую значимую строку, пропуская комментарии", () => {
    expect(firstMeaningfulLine("# comment\r\n\r\nfeat: real\r\nmore")).toBe("feat: real");
  });
});
