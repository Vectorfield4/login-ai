import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Live Jev integration contour, kept OUT of `npm run test` (see
 * `vitest.config.ts` exclude and `vitest.integration.config.ts`). It hits
 * Runware and burns tokens, so it runs only through `npm run test:integration`
 * and only when `RUNWARE_API_KEY` is set. Without the key every case is skipped
 * and nothing touches the network.
 *
 * Skills are mounted globally, so the CLIs are resolved from the mount.
 * `OPENCODE_SKILLS_DIR` overrides the default `~/.config/opencode/skills`.
 */

const ROOT = process.cwd();
const SKILLS_ROOT =
  process.env.OPENCODE_SKILLS_DIR ?? path.join(homedir(), ".config", "opencode", "skills");
/** The skills repo itself, one level above the mount. Holds `lib/`. */
const SKILLS_REPO = existsSync(SKILLS_ROOT) ? path.resolve(realpathSync(SKILLS_ROOT), "..") : "";
const hasKey = Boolean(process.env.RUNWARE_API_KEY);
const hasSkills = existsSync(SKILLS_ROOT);
const ARTICLE = "content-pipeline-case-agency";

const line = "-".repeat(72);
const log: string[] = [];

interface Surface {
  title: string;
  /** Path inside the skills mount; relative to `ROOT` when `fromSkills` is false. */
  script: string;
  fromSkills?: boolean;
  /** Resolve `script` against the skills repo instead of the mount. */
  fromRepo?: boolean;
  args: string[];
  input?: string;
}

const SURFACES: Surface[] = [
  {
    title: "article inline (G1 noul checklist)",
    script: "content/write-article/scripts/jev-review.mjs",
    fromSkills: true,
    args: ["--stdin", "--advisory"],
    input: readFileSync(path.join(ROOT, "articles", `${ARTICLE}.ru.md`), "utf8"),
  },
  {
    title: "article review (G1-G4 + G7 metadata)",
    script: "content/write-article/scripts/jev-review.mjs",
    fromSkills: true,
    args: [ARTICLE, "--advisory"],
  },
  {
    title: "service review (G1 + G2 + G5)",
    script: "content/write-service/scripts/jev-review.mjs",
    fromSkills: true,
    args: ["ai-cms-integration", "--advisory"],
  },
  {
    title: "solution review (G1 + G2 + G6 FAQ)",
    script: "content/write-solution/scripts/jev-review.mjs",
    fromSkills: true,
    args: ["content-generation", "--advisory"],
  },
  {
    title: "dedup (near-duplicate shortlist + verdict)",
    script: "content/write-article/scripts/dedup.mjs",
    fromSkills: true,
    args: [ARTICLE, "--advisory"],
  },
  {
    title: "parity (RU<->EN claims)",
    script: "content/write-article/scripts/parity.mjs",
    fromSkills: true,
    args: ["content-pipeline-economics", "--advisory"],
  },
  {
    title: "story gate (cover story before render)",
    script: "creative/generate-image-cover/scripts/story-gate.mjs",
    fromSkills: true,
    args: ["article", "localization-glossary-pipeline", "--advisory"],
  },
  {
    title: "triage (score readiness ranking)",
    script: "content/write-article/scripts/triage.mjs",
    fromSkills: true,
    args: [ARTICLE],
  },
  {
    title: "eval (dual noul vs legacy)",
    script: "lib/prose/eval.mjs",
    fromRepo: true,
    args: [],
  },
];

/** Runs one CLI, records it in the shared log, and returns the exit code. */
function run(surface: Surface): number {
  const base = surface.fromSkills ? SKILLS_ROOT : surface.fromRepo ? SKILLS_REPO : ROOT;
  const script = path.join(base, surface.script);
  const command = `node ${script} ${surface.args.join(" ")}${surface.input ? "  < article body" : ""}`;
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

describe.skipIf(!hasKey || !hasSkills)("jev integration (live, outside CI)", () => {
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
