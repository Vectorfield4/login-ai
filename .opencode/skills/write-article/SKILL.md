---
name: write-article
description: Use when writing or publishing a news article for the login-ai blog (articles/<slug>.ru.md / .en.md) — picking a genre, assembling the spec, drafting RU and the EN mirror, wiring links and cover, and clearing the prose gates. Triggers: "WriteArticle", "write article", "news article", "написать статью", "новый разбор", "пост в новости", "материал по плану", and genre names: product, research, technical, case-study, corporate, industry, media, community.
---

# WriteArticle

Operationalizes the methodology of the «Новости и разборы» section. One article
is one genre, one structure, one funnel stage. The skill turns a calendar row
from `docs/plans/news-content-plan.md` into a published RU/EN pair.

## Read first

- `references/common.md` — the skeleton and composition rules every genre obeys.
- `references/filters/` — the semantic gates: `FakeDepthTextFilter.md`,
  `SyntheticDepthTextFilter.md`, `NegativeConnotationTextFilter.md`,
  `StructuralSlopTextFilter.md`, `AeoTextFilter.md`.
- `references/spec-template.md` — the 12-section spec card.
- `references/genres/<genre>.md` — the block for the chosen genre.
- `references/acceptance.md` — spec and article acceptance checks.
- `docs/frontend/prose-quality.md`, `docs/frontend/news.md`.

## Genres

| Genre | Funnel | Structure | RU volume |
| --- | --- | --- | --- |
| `product` | решение / выбор | PSI или How-To | 600–900 |
| `research` | охват | PSI, Breakdown или Journey | 900–1500 |
| `technical` | выбор / охват | Breakdown или How-To | 1000–1500 |
| `case-study` | решение | PSI или Journey | 900–1300 |
| `corporate` | охват | PSI или Journey | 600–900 |
| `industry` | охват / выбор | Comparison или Breakdown | 900–1400 |
| `media` | охват | Breakdown | 500–900 |
| `community` | охват | PSI | 500–800 |

## Procedure

1. Pick the genre and funnel stage from the calendar row.
2. Load `references/common.md`, `references/filters/*.md`,
   `references/spec-template.md`, and the genre reference. Assemble the spec.
   Run `references/acceptance.md`. Stop for approval if the row lacks a number
   or a link target.
3. Write RU first. One structure, one CTA, a number in every claim.
4. Write the EN mirror when the calendar row is marked `RU+EN`; it is not
   shorter than 90% of the RU volume. When an EN pair exists, that floor holds.
5. Generate the cover `articles/images/<slug>.png` per
   `articles/images/README.md`, and update its "Awaiting generation" table.
6. Set frontmatter: `title` (10–120), `description` (50–300), `publishedAt`,
   `category`, `tags`, `excerpt`, `featured`, and `mediaUrl` for media.
   `author` stays empty (default team by locale).
7. Run the `prose-critic` subagent on the draft. It is the primary editorial
   gate: fix the returned violation log and re-run until `VERDICT: PASS`. The
   agent loads only after an OpenCode restart once its file is added.
8. Run `npm run lint`, `npm run test`, `npm run verify`.

## Acceptance criteria

- [ ] One genre, one structure from `references/structures/`, one funnel stage.
- [ ] RU ≥ the genre floor; an EN pair, when present, ≥ 90% of RU.
- [ ] Every benefit claim carries a number, source, or explicit limit.
- [ ] At least one commercial link; links to drafts are acceptable.
- [ ] No banned lexicon or negation-based reasoning.
- [ ] `prose-critic` returns `VERDICT: PASS`.
- [ ] `category`/`excerpt` match the schema; cover present; `mediaUrl` for media.
- [ ] `lint`, `test`, `verify` green.

## Failure modes

- `copy-guards.test.ts` fails: banned lexicon or EN typography inside a
  **dictionary** string (chrome, service, solution, case). Article markdown is
  not swept by it.
- `prose-quality.test.ts` fails: a service or solution **dictionary** misses its
  RU floor or its EN mirror drops under 90%. It does not measure articles.
- `astro-content.test.ts` fails: a dictionary key exists in one language only.
- `articles.test.ts` fails: a categorized article is under its RU genre floor, an
  EN pair is under 90% of RU, or an article carries banned lexicon or EN
  typography.
- `staleness.test.ts` warns: the article links an entity updated after it.
- `verify:dist` fails on `og:image`: cover is SVG or not a 1200×630 PNG.
- Link vanishes from the page: the target entity is still `draft: true`
  (`dropDraftLinks` unwraps it; the link returns on publication).
- The suite checks volume and lexicon only. Editorial quality, the two-reader
  test and AEO are not machine-checked; the `prose-critic` pass and a human hold
  those.
