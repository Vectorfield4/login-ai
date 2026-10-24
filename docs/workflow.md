# Workflow: article research & publishing pipeline

Every generated artifact has a producer and a consumer. Orphans are listed in
`docs/capabilities/` audit notes; this document is the canonical map.

## Pipeline (article research)

| # | Stage | Producer (skill) | Output artifact | Consumer (skill/script) |
|---|---|---|---|---|
| 1 | Discovery | `news-fetcher` / `thematic-article-search` / `source-discovery` | `docs/research/generated/<run>.candidates.json` | `candidates-triage` |
| 2 | Triage | `candidates-triage` | shortlist JSON (stdout or `--out`) | `article-research` |
| 3 | Parse | `try-parse-url` / `parse-fallback` / `batch.mjs` | `docs/research/generated/<run>/<slug>.parsed.json` + `batch.json` | `article-research` (reads `extracted`) |
| 3a | Failure triage | `parse-failure-triage` | `generated/<run>/parse-gaps.json` | `parse-gap-review` |
| 3b | Parser gaps | `parse-gap-review` | `generated/<run>/parser-backlog.md` | humans / new parser skills |
| 4 | Research pack | `article-research` (`run.mjs`) | `docs/research/generated/<run>/pack.json` | `research-consume` |
| 5 | Handoff | `research-consume` | handoff JSON (stdout or `--out`) | article step (below) |
| 6 | Article | `write-article` (generation) **or** `translate-article` (hellorobot: translate extracted text) | `articles/<slug>.{ru,en}.md` | build, tests, `wp-publish` |
| 7 | Publish | `wp-publish` | WP post + `result.json` (`--out`) | `wp-record` |
| 8 | Record | `wp-record` | frontmatter `wp_id`/`wp_url`/`status` in article | (terminal) |
| 9 | Cleanup | `cleanup-research` (`clean.mjs`) | deletes stale files in `docs/research/generated/` | (terminal) |

### Article step: generation vs translation

- **loginai-style sites**: `write-article` generates a new article from the pack.
- **hellorobot-style sites**: `translate-article` translates the extracted source text
  (RU/EN mirror), then `wp-publish --upsert`. No generation; the source stays the
  primary reference (`_source_url`).

## Failed parses

A parse is not a dead end. `batch.json` records every failure. The loop is:

1. `parse-failure-triage` reads `batch.json`, classifies failures
   (`js-interstitial`, `waf-403`, `paywall`, `empty`, `timeout`, `non-html`) and
   writes `parse-gaps.json` with a suggested fallback per URL.
2. `parse-gap-review` groups failures by domain and writes `parser-backlog.md`:
   concrete proposals for new extractors (e.g. "decode Google News redirect",
   "mobile UA + JSON-LD for therobotreport.com").
3. A human or an agent turns backlog items into parser skills/scripts; the next
   batch run retries them.

## Sources and parsing

Discovery reads a list; parsing reads one article. The two vocabularies are
separate, and `lib/parse-catalog.mjs` recognizes both so a gap review can point
at the script that already exists.

### Discovery source types (`sources.json`)

| Type | Reads | Parser |
|---|---|---|
| `rss` | RSS 2.0 feed (`<item>`) | `parseRSS` |
| `atom` | Atom feed (`<entry>`) | `parseAtom` |
| `hn` | Hacker News Algolia search JSON (`hits[]`) | `parseHackerNews` |
| `html-list` | a server-rendered newsroom index page; `selector` picks the article links, `baseUrl` bounds them | `parseHtmlList` |
| `json-list` | a newsroom JSON endpoint that returns the article array (client-rendered newsrooms without a feed) | `news-fetcher` / `thematic-article-search` source type |

The feed/list parsers live in `lib/article-search.mjs`; both `news-fetcher` and
`thematic-article-search` call them, so a type added there works in each.

### Parse methods (`method` / `attempts[]`)

| Method | Handles | Where |
|---|---|---|
| `readability` | a normal HTML article, base parse | `try-parse-url/scripts/parse.mjs` |
| `google-news-resolve` | a `news.google.com/(rss/)articles/<id>` link: read the page tokens, then resolve the publisher URL through the DotsSplashUi `batchexecute` RPC (`garturlreq`) | `parse-fallback/scripts/google-news.mjs` (`resolveGoogleNews`) |
| `ua-retry` | a 403 that only rejects the default UA (mobile Chrome, Googlebot) | `parse-fallback` (`fallback`) |
| `reader-proxy` | a 403 that survives the UA swap and a body that only exists after JavaScript: the page is rendered by the reader proxy (`r.jina.ai`) instead of a direct fetch | `lib/reader.mjs` (`fetchViaReader`), reached from `fallback()` and `reader-fetch.mjs` |
| `decode-redirect` | a `url`/`q` redirect parameter | `parse-fallback` |
| `rss-source` | the original feed URL of a candidate | `parse-fallback` |
| `google-cache`, `archive-org` | a cached or archived copy | `parse-fallback` |

Google News is always resolved, never proxied: the reader proxy blocks
`news.google.com` for anonymous use, so a Google News link goes straight to the
RPC resolver and the publisher URL is parsed after that. WAF/JS failures walk
`ua-retry` → `reader-proxy` → cache → archive; captchas and paywalls stay
recorded failures in every path.

## Capability sources

| Stage | Producer | Output | Consumer |
|---|---|---|---|
| Spec | `source-explorer` / `spec-interviewer` | `docs/capabilities/sources/<company>/<source>.md` | `capabilities-index` (implemented) |

## Calibration (Jev)

| Stage | Producer | Output | Consumer |
|---|---|---|---|
| Firings | `recordFirings` | `.cache/jev-calibration/firings.jsonl` | `calibration-report` (planned) |
| Labels | `labelPublished` | `.cache/jev-calibration/labeled.jsonl` | `calibration-report` (planned) |

## Images

| Stage | Producer | Output | Consumer |
|---|---|---|---|
| Cover prompt | `generate-image-cover` | `assets/images/<kind>/<slug>.prompt.txt`, `.meta.json`, `.png` | `image-catalog.mjs` (reads meta, checks `hasPrompt`) |

## Execute tasks

| Stage | Producer | Output | Consumer |
|---|---|---|---|
| Task report | `execute-*` | `artifacts/<task_id>-report.md` | `artifacts-gc` (implemented) |

## Rules

1. Every generated artifact lives under `docs/research/generated/` (gitignored) unless it is curated (e.g. `parse-report.md`).
2. Typed suffixes: `.candidates.json`, `.parsed.json`, `.pack.json`, `.translated.<lang>.md/.json`.
3. Producers print a machine-readable handoff (JSON) or accept `--out`.
4. Consumers accept `--pack`/`--file`/`--sources`/`--url` with aliases.
5. No orphan: each writer has at least one reader; each reader has at least one writer.
6. Run `cleanup-research` (`npm run research:clean`) periodically to remove stale generated files.

## Quick start

```bash
# 1. discover
node scripts/fetch-candidates.mjs --sources scripts/sources.json --out docs/research/generated/run.candidates.json

# 2. triage
node skills/data/candidates-triage/scripts/triage.mjs --file docs/research/generated/run.candidates.json --topic robotics --limit 20 --out docs/research/generated/run.shortlist.json

# 3. parse
node skills/data/try-parse-url/scripts/batch.mjs --file docs/research/generated/run.shortlist.json --out-dir docs/research/generated/run

# 3b. one page through the reader proxy (403 WAF that survives a UA swap, JS-only body)
node skills/data/parse-fallback/scripts/reader-fetch.mjs <url> --out docs/research/generated/run/page.parsed.json

# 4. research pack (mechanical part)
node skills/data/article-research/scripts/run.mjs --candidates docs/research/generated/run.shortlist.json --out docs/research/generated/run/pack.json

# 5. handoff
node skills/data/research-consume/scripts/consume.mjs --pack docs/research/generated/run/pack.json

# 6. write article (LLM step) using primarySourceUrl as _source_url

# 7. publish
node skills/content/wp-publish/scripts/publish.mjs --config wp-site.json --file article.json --upsert

# 8. record frontmatter
node skills/content/wp-record/scripts/record.mjs --result result.json --article articles/<slug>.ru.md --status published

# 9. cleanup
npm run research:clean
```