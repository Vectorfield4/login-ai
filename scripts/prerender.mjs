import { build } from "vite";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

/** Все маршруты: статика + slug-фикстуры × язык. */
function allRoutes() {
  const staticPaths = ["/", "/services", "/cases", "/investors", "/contacts"];
  const solutionSlugs = ["computer-vision", "ai-copilots", "manufacturers", "video-generation", "audio-generation", "reputation-analytics", "data-analytics", "sales-automation", "search-systems"];
  const serviceSlugs = ["software-development", "ai-consulting", "ai-team"];
  const caseSlugs = ["reputation-monitoring-platform", "retail-support-bot", "quality-vision-line", "logistics-analytics", "food-traceability", "healthcare-support", "claim-monitoring"];
  const all = [...staticPaths, ...serviceSlugs.map((s) => `/services/${s}`), ...solutionSlugs.map((s) => `/solutions/${s}`), ...caseSlugs.map((s) => `/cases/${s}`)];
  return all.flatMap((path) =>
    ["ru", "en"].map(
      (lang) =>
        path === "/"
          ? `/${lang}`
          : `/${lang}${path}`,
    ),
  );
}

async function main() {
  // 1) Клиентская сборка
  console.log("[prerender] building client...");
  await build({
    configFile: join(ROOT, "vite.config.ts"),
    root: ROOT,
    build: { outDir: DIST, emptyOutDir: true },
  });

  // 2) SSR-сборка пререндера
  console.log("[prerender] building SSR prerender bundle...");
  await build({
    configFile: join(ROOT, "vite.config.ts"),
    root: ROOT,
    build: {
      outDir: join(DIST, "ssr"),
      emptyOutDir: true,
      rollupOptions: {
        input: join(ROOT, "src/prerender.tsx"),
      },
      ssr: true,
    },
  });

  // 3) Загружаем SSR-модуль
  const mod = await import(pathToFileURL(join(DIST, "ssr", "prerender.js")).href);
  const { prerender } = mod;

  // 4) Шаблон index.html
  const template = readFileSync(join(DIST, "index.html"), "utf-8");

  // 5) Генерируем HTML для каждого маршрута
  for (const url of allRoutes()) {
    const result = prerender({ url });
    const dir = url === "/ru" ? DIST : join(DIST, url.slice(1));

    // Встраиваем body в <div id="root">
    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${result.html}</div>`,
    );

    // Стили в <head>
    const styles = result.head.elements
      .filter((e) => e.startsWith("<style"))
      .join("\n");
    if (styles) {
      html = html.replace("</head>", `${styles}\n</head>`);
    }

    // Title
    html = html.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${result.head.title}</title>`,
    );

    // Meta description
    const newMeta = result.head.elements.find(
      (e) => e.startsWith('<meta name="description"'),
    );
    if (newMeta) {
      html = html.replace(
        /<meta name="description"[^>]*>/,
        newMeta,
      );
    }

    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
    console.log(`[prerender] ${url} -> ${join(dir, "index.html")}`);
  }

  console.log("[prerender] done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
