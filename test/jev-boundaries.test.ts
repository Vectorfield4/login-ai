import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Architecture guard for the Jev tooling.
 *
 * The engine lives in the shared skills repo, so the application must not
 * import it. This test keeps `src/` free of the tooling.
 */

const ROOT = process.cwd();

const CODE_EXT = new Set([".ts", ".tsx", ".mjs", ".js", ".jsx", ".cjs"]);
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", "build", "coverage", ".cache"]);

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name), out);
    } else if (CODE_EXT.has(entry.name.slice(entry.name.lastIndexOf(".")))) {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

describe("jev: domain stays out of the application", () => {
  it("src/ never imports the Jev engine or the prose domain", () => {
    const offenders: string[] = [];
    for (const file of walk(join(ROOT, "src"))) {
      const text = readFileSync(file, "utf8");
      if (/@login-ai\/(jev|prose)|lib\/(jev|prose)|#lib\//.test(text)) {
        offenders.push(file.slice(ROOT.length + 1));
      }
    }
    expect(offenders, "src/ must not depend on the Jev tooling").toEqual([]);
  });
});
