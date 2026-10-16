import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { findFinishedPlans } from "../../scripts/release.mjs";

describe("release plan cleanup", () => {
  const roots: string[] = [];

  afterEach(() => {
    for (const root of roots) rmSync(root, { recursive: true, force: true });
  });

  it("отбирает только полностью закрытые планы", () => {
    const root = mkdtempSync(join(tmpdir(), "login-ai-plans-"));
    roots.push(root);
    const plans = join(root, "docs/plans");
    mkdirSync(plans, { recursive: true });
    writeFileSync(join(plans, "done.md"), "# done\r\n\r\n- [x] one\r\n- [x] two\r\n");
    writeFileSync(join(plans, "open.md"), "# open\r\n\r\n- [x] one\r\n- [ ] two\r\n");
    writeFileSync(join(plans, "empty.md"), "# empty\r\n\r\nno checklist here\r\n");

    expect(findFinishedPlans(root)).toEqual(["docs/plans/done.md"]);
  });
});
