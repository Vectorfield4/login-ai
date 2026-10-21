import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Architecture guards for the Jev tooling.
 *
 * The engine is tooling-only and Runware-only, so these tests pin the transport
 * and keep the domain out of the application: `src/` must not import the Jev
 * engine, and no code path may reintroduce a native TypeSafe endpoint or SDK.
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

const read = (file: string) => readFileSync(file, "utf8");

describe("jev: transport is Runware-only", () => {
  const client = read(join(ROOT, "lib", "jev", "client.mjs"));

  it("pins the model and endpoint", () => {
    expect(client).toContain("typesafe:jev@1");
    expect(client).toContain("https://api.runware.ai/v1/decisions");
  });

  it("carries no native TypeSafe endpoint or SDK", () => {
    for (const forbidden of ["api.typesafe.ai", "docs.typesafe.ai", "jev-latest", "@typesafe-ai"]) {
      expect(client, `${forbidden} in lib/jev/client.mjs`).not.toContain(forbidden);
    }
  });
});

describe("jev: domain stays out of the application", () => {
  it("src/ never imports the Jev engine or the prose domain", () => {
    const offenders: string[] = [];
    for (const file of walk(join(ROOT, "src"))) {
      const text = read(file);
      if (/@login-ai\/(jev|prose)|lib\/(jev|prose)/.test(text)) {
        offenders.push(file.slice(ROOT.length + 1));
      }
    }
    expect(offenders, "src/ must not depend on the Jev tooling").toEqual([]);
  });
});

describe("jev: no native transport in tooling code", () => {
  it("lib/ carries no native TypeSafe endpoint, SDK or model alias", () => {
    const targets = walk(join(ROOT, "lib"));
    const offenders: string[] = [];
    for (const file of targets) {
      const text = read(file);
      for (const forbidden of [
        "api.typesafe.ai",
        "docs.typesafe.ai",
        "jev-latest",
        "@typesafe-ai",
      ]) {
        if (text.includes(forbidden))
          offenders.push(`${file.slice(ROOT.length + 1)}: ${forbidden}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
