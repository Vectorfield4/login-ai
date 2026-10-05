import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Renders every Mermaid source under `src/shared/assets/diagrams/` into SVG.
 *
 * File convention: `<serviceSlug>.<diagramSlug>.<lang>.mmd`. Each source
 * produces two committed assets next to the other service art:
 * `<base>.svg` (light) and `<base>.dark.svg`. `app/data/serviceDiagrams.ts`
 * resolves them, so no Mermaid code reaches the browser bundle.
 *
 * Run `npm run diagrams` after editing a source and commit the SVG output.
 * Generation needs a headless browser (Puppeteer, shipped with mermaid-cli);
 * the build itself never calls this.
 */

const root = fileURLToPath(new URL("..", import.meta.url));
const sourceDir = join(root, "src/shared/assets/diagrams");
const outputDir = join(root, "src/shared/assets/images/diagrams");
const cli = join(root, "node_modules/@mermaid-js/mermaid-cli/src/cli.js");

mkdirSync(outputDir, { recursive: true });

const render = (input, output, theme) => {
  execFileSync(
    process.execPath,
    [cli, "-i", input, "-o", output, "-b", "transparent", "-t", theme, "-q"],
    { stdio: "inherit" },
  );
};

const sources = readdirSync(sourceDir)
  .filter((file) => file.endsWith(".mmd"))
  .sort();

for (const file of sources) {
  const base = file.slice(0, -".mmd".length);
  const input = join(sourceDir, file);
  render(input, join(outputDir, `${base}.svg`), "neutral");
  render(input, join(outputDir, `${base}.dark.svg`), "dark");
  console.log(`diagram: ${base}`);
}

console.log(`done: ${sources.length} source(s)`);
