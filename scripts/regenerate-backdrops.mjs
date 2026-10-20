#!/usr/bin/env node
import { randomUUID } from "node:crypto";
/**
 * Re-render queued backdrops through Runware in parallel and replace their PNGs.
 *
 * Usage:
 *   node scripts/regenerate-backdrops.mjs --kind service [--limit 30] [--concurrency 5] [--remove]
 *
 * The prompt is the existing `<slug>.prompt.txt`; run the image-prompt builder
 * first if the record changed. The script verifies the real pixel size before
 * replacing the asset. `--remove` drops the queue entry after a successful
 * render, matching the publishing convention.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { KIND_DIRS, ROOT, readQueue, removeEntry } from "./generation-queue.mjs";

const API = "https://api.runware.ai/v1";
const MODEL = "google:4@3";
const WIDTH = 1376;
const HEIGHT = 768;
const COST_PER_IMAGE = 0.06895;

const args = process.argv.slice(2);
const flag = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
};
const has = (name) => args.includes(name);

const kind = flag("--kind");
const limit = Number(flag("--limit") ?? "0");
const concurrency = Math.max(1, Number(flag("--concurrency") ?? "5"));
const remove = has("--remove");

if (!kind || !KIND_DIRS[kind]) {
  console.error("usage: node scripts/regenerate-backdrops.mjs --kind article|service|solution");
  process.exit(2);
}
if (!process.env.RUNWARE_API_KEY && !process.env.OPENCODE_RUNWARE_API_KEY) {
  console.error("RUNWARE_API_KEY is not set");
  process.exit(2);
}

const apiKey = process.env.RUNWARE_API_KEY ?? process.env.OPENCODE_RUNWARE_API_KEY;
const entries = readQueue().filter((entry) => entry.kind === kind);
const targets = limit > 0 ? entries.slice(0, limit) : entries;
if (!targets.length) {
  console.error(`no queued ${kind} records`);
  process.exit(1);
}

/** Parse PNG width/height from the IHDR chunk. */
function pngSize(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") throw new Error("not a PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

async function render(entry) {
  const promptPath = join(ROOT, KIND_DIRS[kind], `${entry.slug}.prompt.txt`);
  if (!existsSync(promptPath)) throw new Error(`missing prompt: ${promptPath}`);
  const positivePrompt = readFileSync(promptPath, "utf8").trim();

  const response = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        taskType: "imageInference",
        taskUUID: randomUUID(),
        positivePrompt,
        model: MODEL,
        width: WIDTH,
        height: HEIGHT,
        outputFormat: "PNG",
        outputType: "URL",
        numberResults: 1,
      },
    ]),
  });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) {
    throw new Error(`runware: ${JSON.stringify(payload.errors ?? payload)}`);
  }
  const image = payload.data?.[0];
  if (!image?.imageURL) throw new Error("runware: no imageURL");

  const imageResponse = await fetch(image.imageURL);
  if (!imageResponse.ok) throw new Error(`download ${imageResponse.status}`);
  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  const size = pngSize(buffer);
  if (size.width < 1200 || size.height < 630) {
    throw new Error(`too small: ${size.width}x${size.height}`);
  }

  const cacheDir = join(ROOT, ".cache/covers", entry.slug);
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(join(cacheDir, "generated.png"), buffer);
  copyFileSync(join(cacheDir, "generated.png"), join(ROOT, KIND_DIRS[kind], `${entry.slug}.png`));
  return { slug: entry.slug, ...size, imageURL: image.imageURL };
}

async function pool(items, size, worker) {
  const results = [];
  const queue = [...items];
  const runners = Array.from({ length: Math.min(size, queue.length) }, async () => {
    while (queue.length) {
      const item = queue.shift();
      results.push(await worker(item));
    }
  });
  await Promise.all(runners);
  return results;
}

const started = Date.now();
let done = 0;
const failures = [];

await pool(targets, concurrency, async (entry) => {
  try {
    let result;
    try {
      result = await render(entry);
    } catch {
      result = await render(entry);
    }
    done += 1;
    console.log(`[${done}/${targets.length}] ${result.slug} ${result.width}x${result.height}`);
    if (remove) removeEntry(kind, entry.slug);
  } catch (error) {
    failures.push({ slug: entry.slug, error: String(error.message ?? error) });
    console.error(`[fail] ${entry.slug}: ${error.message ?? error}`);
  }
});

const seconds = ((Date.now() - started) / 1000).toFixed(1);
console.log(
  `\nrendered ${done}/${targets.length} ${kind} image(s) in ${seconds}s; ` +
    `estimated cost $${(done * COST_PER_IMAGE).toFixed(2)}`,
);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
