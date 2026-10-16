import { describe, expect, it } from "vitest";
import { firstMeaningfulLine, validateSubject } from "../../scripts/commit-msg.mjs";

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
      expect(validateSubject(subject), subject).toBeNull();
    }
  });

  it("отклоняет неизвестный префикс и голый текст", () => {
    expect(validateSubject("wip: something")).not.toBeNull();
    expect(validateSubject("just words")).not.toBeNull();
  });

  it("пропускает merge, revert и fixup", () => {
    expect(validateSubject("Merge branch 'main'")).toBeNull();
    expect(validateSubject('Revert "feat: x"')).toBeNull();
    expect(validateSubject("fixup! feat: x")).toBeNull();
  });

  it("берёт первую значимую строку, пропуская комментарии", () => {
    expect(firstMeaningfulLine("# comment\r\n\r\nfeat: real\r\nmore")).toBe("feat: real");
  });
});
