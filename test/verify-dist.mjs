import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = join(root, "dist");
const RASTER_OG = /\.(png|jpe?g|webp)$/i;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

if (!existsSync(dist)) {
  console.error("dist/ не найден — сначала выполни `npm run build`.");
  process.exit(1);
}

function walk(dir) {
  const entries = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) entries.push(...walk(full));
    else entries.push(full);
  }
  return entries;
}

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));

function sitePathToFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const relativePath = clean.replace(/^\/+/, "");
  const candidates = relativePath
    ? [
        join(dist, relativePath),
        join(dist, `${relativePath}.html`),
        join(dist, relativePath, "index.html"),
      ]
    : [join(dist, "index.html")];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

function attr(html, pattern) {
  return pattern.exec(html)?.[1];
}

const sitemapFile = walk(dist).find((file) => /sitemap-\d+\.xml$/.test(file));
check(Boolean(sitemapFile), "нет sitemap-*.xml в dist");
const locs = sitemapFile
  ? [...readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  : [];

check(
  htmlFiles.length === locs.length + 1,
  `в dist ${htmlFiles.length} html, в sitemap ${locs.length} url (+1 ожидается на /404.html)`,
);
check(existsSync(join(dist, "404.html")), "нет dist/404.html");

for (const loc of locs) {
  const url = new URL(loc);
  const file = sitePathToFile(url.pathname);
  if (!file) {
    failures.push(`${loc}: нет собранного файла (sitemap обещает страницу)`);
    continue;
  }

  const html = readFileSync(file, "utf8");
  const page = loc.replace(url.origin, "");
  const isSolutionPage = /^\/(ru|en)\/solutions\/[^/]+\/$/.test(url.pathname);

  check(!html.includes("[object Object]"), `${page}: в разметке [object Object]`);

  const title = attr(html, /<title>([^<]*)<\/title>/);
  check(Boolean(title?.trim()), `${page}: пустой <title>`);

  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  check(canonical === loc, `${page}: canonical=${canonical} != ${loc}`);

  // hreflang: страница обязана объявить свой язык и x-default. Второй язык
  // асимметричных статей может отсутствовать — но если он объявлен, он обязан
  // существовать в dist, иначе краулер получит 404 по hreflang. Свой язык
  // сверяем на существование, а не на равенство canonical: RU-главная живёт
  // сразу в двух адресах (`/` и `/ru/`) и hreflang=ru у неё ведёт в `/`.
  const ownLang = /^\/ru\//.test(url.pathname) ? "ru" : "en";
  const ownHref = attr(
    html,
    new RegExp(`<link rel="alternate" hreflang="${ownLang}" href="([^"]*)"`),
  );
  check(Boolean(ownHref), `${page}: нет hreflang=${ownLang} (свой язык)`);
  if (ownHref) {
    check(
      Boolean(sitePathToFile(new URL(ownHref).pathname)),
      `${page}: hreflang=${ownLang} → ${ownHref} не резолвится в dist`,
    );
  }

  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="(\S+)" href="([^"]*)"/g)];
  const xDefault = attr(html, /<link rel="alternate" hreflang="x-default" href="([^"]*)"/);
  check(Boolean(xDefault), `${page}: нет hreflang=x-default`);
  for (const [, lang, href] of alternates) {
    if (lang === "x-default") continue;
    check(
      ["ru", "en"].includes(lang),
      `${page}: hreflang=${lang} неожиданный (ожидались ru/en/x-default)`,
    );
    const target = new URL(href);
    check(
      Boolean(sitePathToFile(target.pathname)),
      `${page}: hreflang=${lang} → ${href} не резолвится в dist (404 для краулера)`,
    );
  }
  check(
    alternates.length >= 2,
    `${page}: объявлено только ${alternates.length} hreflang (минимум: свой язык + x-default)`,
  );

  // Регресс «порванного CSS»: каждая страница обязана линковать хотя бы один
  // стилевой файл. Из-за импорта CSS внутри страницы Astro уносил весь бандл
  // в чанк одной страницы, и остальные 62 страницы отдавались голой разметкой.
  const stylesheets = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)];
  check(
    stylesheets.length > 0,
    `${page}: нет ни одного <link rel="stylesheet"> — CSS не подключён`,
  );
  for (const [tag] of stylesheets) {
    const href = /href="([^"]*)"/.exec(tag)?.[1];
    if (!href) continue;
    check(
      href.startsWith("/") && Boolean(sitePathToFile(new URL(href, "https://x").pathname)),
      `${page}: stylesheet ${href} не резолвится в dist`,
    );
  }

  const ogUrl = attr(html, /<meta property="og:url" content="([^"]*)"/);
  check(ogUrl === canonical, `${page}: og:url=${ogUrl} != canonical=${canonical}`);
  check(
    Boolean(attr(html, /<meta property="og:title" content="([^"]*)"/)),
    `${page}: нет og:title`,
  );
  check(
    Boolean(attr(html, /<meta property="og:description" content="([^"]*)"/)),
    `${page}: нет og:description`,
  );

  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (ogImage) {
    check(RASTER_OG.test(ogImage), `${page}: og:image=${ogImage} не растр (соцсети SVG не едят)`);
    check(ogImage.startsWith("https://"), `${page}: og:image=${ogImage} не абсолютный URL`);
    const ogWidth = attr(html, /<meta property="og:image:width" content="([^"]*)"/);
    const ogHeight = attr(html, /<meta property="og:image:height" content="([^"]*)"/);
    check(
      ogWidth === "1200" && ogHeight === "630",
      `${page}: og:image ${ogWidth}x${ogHeight} вместо 1200x630`,
    );
    check(
      attr(html, /<meta property="og:image:type" content="([^"]*)"/) === "image/png",
      `${page}: нет og:image:type=image/png`,
    );
    const ogFile = ogImage.startsWith("https://")
      ? sitePathToFile(new URL(ogImage).pathname)
      : undefined;
    if (ogFile) {
      const bytes = readFileSync(ogFile).subarray(0, 4);
      const isPng = bytes.equals(PNG_MAGIC);
      const isJpeg = bytes.subarray(0, 3).equals(JPEG_MAGIC);
      check(isPng || isJpeg, `${page}: og:image=${ogImage} не читается как растр`);
    } else if (ogImage.startsWith("/")) {
      failures.push(`${page}: og:image=${ogImage} отсутствует в dist`);
    }
  } else {
    check(
      !isSolutionPage,
      `${page}: у страницы решения нет og:image (расстеризуй SVG через getImage в BaseLayout)`,
    );
  }

  for (const [tag] of html.matchAll(/<img\s[^>]*>/g)) {
    const imageSrc = attr(tag, /src="([^"]*)"/);
    check(Boolean(imageSrc), `${page}: <img> без src`);
    check(/\salt="/.test(tag), `${page}: <img src="${imageSrc}"> без alt`);
  }

  for (const [, value] of html.matchAll(/(?:src|href)="(\/[^"]*)"/g)) {
    if (value.startsWith("//") || value.startsWith("/#")) continue;
    check(
      Boolean(sitePathToFile(value)),
      `${page}: ссылка ${value} не резолвится в dist (404 в проде)`,
    );
  }

  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(jsonLd.length > 0, `${page}: нет JSON-LD`);
  for (const [, raw] of jsonLd) {
    try {
      JSON.parse(raw);
    } catch (error) {
      failures.push(`${page}: JSON-LD не парсится (${error.message})`);
    }
  }
}

if (failures.length > 0) {
  console.error(`verify-dist: провалено проверок — ${failures.length}`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log(
  `verify-dist: ок — ${locs.length} страниц из sitemap + /404.html, head и ассеты в порядке.`,
);
