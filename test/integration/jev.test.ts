import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Live Jev integration contour — kept OUT of `npm run test` (see
 * `vitest.config.ts` exclude and `vitest.integration.config.ts`). It hits
 * Runware and burns tokens, so it runs only through `npm run test:integration`
 * and only when `RUNWARE_API_KEY` is set; without the key every case is skipped
 * and nothing touches the network.
 *
 * It exercises the real CLIs end to end (spawned as the skills run them) and
 * writes one log file per run under `.cache/jev-integration/` so a human can
 * read how each gate processed the fixtures.
 */

const ROOT = process.cwd();
const hasKey = Boolean(process.env.RUNWARE_API_KEY);
const ARTICLE = "content-pipeline-case-agency";

const line = "-".repeat(72);
const log: string[] = [];

interface Surface {
  title: string;
  script: string;
  args: string[];
  input?: string;
}

const SURFACES: Surface[] = [
  {
    title: "article inline (G1 noul checklist)",
    script: ".opencode/skills/write-article/scripts/jev-review.mjs",
    args: ["--stdin", "--advisory"],
    input: readFileSync(path.join(ROOT, "articles", `${ARTICLE}.ru.md`), "utf8"),
  },
  {
    title: "article review (G1-G4 + G7 metadata)",
    script: ".opencode/skills/write-article/scripts/jev-review.mjs",
    args: [ARTICLE, "--advisory"],
  },
  {
    title: "service review (G1 + G2 + G5)",
    script: ".opencode/skills/write-service/scripts/jev-review.mjs",
    args: ["ai-cms-integration", "--advisory"],
  },
  {
    title: "solution review (G1 + G2 + G6 FAQ)",
    script: ".opencode/skills/write-solution/scripts/jev-review.mjs",
    args: ["content-generation", "--advisory"],
  },
  {
    title: "dedup (near-duplicate shortlist + verdict)",
    script: ".opencode/skills/write-article/scripts/dedup.mjs",
    args: [ARTICLE, "--advisory"],
  },
  {
    title: "parity (RU<->EN claims)",
    script: ".opencode/skills/write-article/scripts/parity.mjs",
    args: ["content-pipeline-economics", "--advisory"],
  },
  {
    title: "story gate (cover story before render)",
    script: ".opencode/skills/generate-image-cover/scripts/story-gate.mjs",
    args: ["article", "speech-recognition-domain", "--advisory"],
  },
  {
    title: "triage (score readiness ranking)",
    script: ".opencode/skills/write-article/scripts/triage.mjs",
    args: [ARTICLE],
  },
  {
    title: "eval (dual noul vs legacy)",
    script: "lib/prose/eval.mjs",
    args: [],
  },
];

/** Runs one CLI, records it in the shared log, and returns the exit code. */
function run(surface: Surface): number {
  const script = path.join(ROOT, surface.script);
  const command = `node ${surface.script} ${surface.args.join(" ")}${surface.input ? "  < article body" : ""}`;
  const result = spawnSync(process.execPath, [script, ...surface.args], {
    cwd: ROOT,
    encoding: "utf8",
    input: surface.input,
  });
  log.push(
    line,
    `# ${surface.title}`,
    `$ ${command}`,
    "",
    (result.stdout ?? "").trim(),
    (result.stderr ?? "").trim(),
    `exit=${result.status}`,
    "",
  );
  return result.status ?? 1;
}

describe.skipIf(!hasKey)("jev integration (live, outside CI)", () => {
  it("runs every Jev surface and writes a log", () => {
    const failures: string[] = [];
    for (const surface of SURFACES) {
      const status = run(surface);
      if (status !== 0) failures.push(`${surface.title}: exit ${status}`);
    }

    const dir = path.join(ROOT, ".cache", "jev-integration");
    mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const file = path.join(dir, `jev-${stamp}.log`);
    writeFileSync(file, `${log.join("\n")}\n`, "utf8");
    console.log(`jev integration log -> ${path.relative(ROOT, file)}`);

    expect(failures, "every Jev surface must exit 0").toEqual([]);
  }, 900_000);
});
