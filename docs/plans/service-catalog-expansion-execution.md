# Service catalog expansion: linear execution

Status: draft. Companion to `docs/plans/service-catalog-expansion.md`.
Started 2026-10-18.

## Verdict

The plan is executable as a linear path. Three conditions matter:

1. Wave 0, the IA foundation, precedes publishing. Content drafting can start
   after the scope is fixed, but no new page goes live before the IA.
2. Solutions in Waves 10 and 11 need at least one precedent. Without it they
   stay drafts.
3. The `seo-aeo` hub is rewritten before `seo`, `aeo` and `geo-ai-search` are
   published, so the hub owns the combined query.

Priority comes from competitor coverage, page depth and our readiness.

## LLM speed optimizations

### Two-tier gate

Service gate, fast:

- required keys in RU and EN;
- RU word count at least 700;
- features, process, fit, relevants and FAQ counts;
- price present;
- calculator spec valid;
- cover exists;
- targeted Vitest for the changed service.

Wave gate, slow:

- `npm run lint`;
- `npm run test`;
- `npm run verify`;
- sitemap and route checks;
- full prose and richness suite.

Final phase:

- `verify:dist`;
- SEO audit;
- internal link audit;
- performance check.

Do not run the full suite after every file. Run it at the wave gate.

### Test movement

| Check | When |
|---|---|
| word count, key parity, counts | per service, fast script or targeted test |
| price and calculator spec | per service |
| relevants and links | per service |
| cover exists | per service, before publish |
| full `npm run test` | wave gate |
| `npm run lint` | wave gate |
| `npm run verify` | wave gate |
| `verify:dist`, SEO audit | final phase |

Moving the full suite later is safe when the fast gate covers the publish
blockers. Cover, price, calculator and relevants cannot move.

### Batch passes per wave

Instead of one service end to end, run the wave in passes:

1. Briefs for all services in the wave.
2. Fixtures and index updates.
3. RU copy.
4. EN mirror.
5. Prices and calculators.
6. Covers in parallel.
7. Targeted tests and fixes.
8. Wave gate.

This keeps one context per artifact type and cuts switching.

### Templates

Use the closest existing service as a template:

| Wave | Template |
|---|---|
| Agents | `agentic-systems` solution, `ai-crm-integration` |
| Platforms | `ai-crm-integration`, `ai-erp-integration` |
| Data | `computer-vision-systems`, `mlops-platforms` |
| Models | `deterministic-rag-systems`, `mlops-platforms` |
| Trust | `ai-security-audit`, `corporate-ai-training` |
| Search | `seo-aeo`, `content-generation` |
| Solutions | `customer-experience`, `manufacturers` |

Write a compact brief per service with all keys and copy points. Fill the
fixture and i18n from the brief, not from a blank page.

### Calculator lite

P1 services use 4-6 fields. P2 and P3 use 3-4 fields. Expand after the first
deals. This keeps the calculator test green without a large spec.

### Covers in parallel

After the briefs are ready, dispatch cover generation for the wave in one batch.
The art agent works while copy is written. Do not wait for all covers before
writing text.

### Reuse existing content

Wire existing articles to new pages before writing new ones. The blog already
covers agents, fine-tuning, prompt injection, conversational BI and CRM
automation.

### Defer what can wait

- diagrams for new groups only if the group rule requires them;
- cases without real data;
- new articles;
- full SEO audit;
- final coefficient tuning.

### Guardrails

- Do not defer cover, price, calculator or relevants before publishing.
- Do not batch more than one wave at a time.
- Do not let the EN mirror drift below 90% of RU.
- A local check script can print counts and missing keys before Vitest. Add it
  when the first wave starts.

## Subagent orchestration

OpenCode subagents run in their own sessions and can be invoked in parallel.
Use them for isolated, high-context work. Keep shared files and final gates in
the main agent.

### Roles

| Agent | Type | Access | Use |
|---|---|---|---|
| Build, main | primary | all | plan, briefs, shared files, wave gate, git |
| explore | built-in | read-only | find template services, keys and files; link audit |
| scout | built-in | read-only, external | platform docs, EU AI Act, ISO 42001 |
| general | built-in | all | parallel drafting, EN mirror, targeted test runs |
| art-agent | existing | bash, no edit | covers and backdrops |
| service-critic | existing | read-only | service prose gate |
| prose-critic | existing | read-only | article prose gate |
| competitor-scout | created | webfetch, no edit | competitor coverage matrix |

Only `competitor-scout` is new. The rest already exist.

### Why this helps

- `explore` and `scout` keep large repo and web reads out of the main context.
- `general` can draft one slug, mirror another and run targeted tests in a
  separate session.
- `art-agent` is slow and long-running; it runs while copy is written.
- `service-critic` and `prose-critic` are read-only gates and can run in
  parallel with the next slug.
- `competitor-scout` turns public sitemaps into a coverage matrix without
  keyword tools.

### competitor-scout output

`competitor-scout` reads the plan and the intent map, fetches `robots.txt` and
`sitemap.xml` for 8-15 competitors, maps URLs to our clusters and returns:
cluster, competitors, count, depth, our readiness, priority, gaps and blocked
sources. It does not write files or claim search volumes.

### Shared-file rule

Only the main agent edits:

- `src/entities/service/model/fixtures.ts`
- `src/entities/service/i18n/index.ts`
- `src/entities/solution/model/fixtures.ts`
- `src/entities/solution/i18n/index.ts`
- `test/services/calculators.test.ts`
- `src/entities/service/model/groupServices.ts`
- `src/shared/i18n/{ru,en}/servicesGroups.ts`
- `src/shared/i18n/{ru,en}/servicesDirections.ts`
- `src/widgets/app-bar/model/nav.ts`
- `src/shared/data/seo.ts`
- `src/shared/data/breadcrumbs.ts`
- `content/generation-queue.json`, except the art-agent's own record updates

Subagents write only their slug's fixture and i18n files. When `general`
drafts, give it a per-slug scope and tell it not to touch shared files.

### Per-wave pipeline

1. Main writes the briefs.
2. Parallel: `explore` finds templates, `scout` checks platform docs, and
   `competitor-scout` has already built the matrix in Phase 0.
3. Main pre-writes the queue records for the wave.
4. Parallel: `general` drafts slug A, `general` mirrors EN slug B, `art-agent`
   covers slug C.
5. Main wires shared indexes, calculators and cross-service relevants.
6. `general` runs targeted tests on finished slugs. `service-critic` gates
   finished copy.
7. Main runs the wave gate.

Do not run two art-agents that write the same queue file. Pre-write the records
or serialize the art-agent calls.

### Model and permissions

| Agent | Model | Temp | Permissions |
|---|---|---|---|
| competitor-scout | fast | 0.1 | edit deny, bash deny, webfetch allow, task deny |
| general | same as main | default | full access, prompt-scoped, no shared files |
| explore | fast | 0.1 | read-only |
| scout | fast | 0.1 | read-only external |
| art-agent | existing | 0.3 | bash allow, edit deny, task deny |
| service-critic | existing | 0.1 | edit deny, bash deny, task deny |
| prose-critic | existing | 0.1 | edit deny, bash deny, task deny |

`general` is full-access, so scope each call to one slug, one file set and one
task. The main agent reviews the diff.

Agents live in the shared `D:\docs\GitHub\skills\agent` repo and load through the
global mount at `~/.config/opencode/agent`. A new agent file loads on the next
OpenCode restart.

### Expected gains

- The main context holds the plan and briefs, not full test logs or competitor
  pages.
- Targeted test runs and competitor research happen in separate sessions.
- Covers run while copy is written.
- Two slugs can move at once through two `general` calls.
- Critics run in parallel with the next slug.

### Risks

- `general` has full access. Scope it to one slug and review the diff.
- Parallel writers can conflict on shared index files. The shared-file rule
  prevents this.
- Parallel art-agents can race on `content/generation-queue.json`. Pre-write or
  serialize.
- Subagents lack the full plan context. Give each a compact brief and the exact
  template path.
- More agents mean more token spend. Use them for isolated, large tasks.
- A subagent can return a confident wrong result. The main agent runs the wave
  gate and reviews the diff.

## Linear path

### Phase 0: Scope lock, no code

0.1 Dispatch `competitor-scout` with the competitor list and our clusters. It
returns the coverage matrix and writes no files.
0.2 Confirm 36 services and 11 solutions (solution plan: Waves 10-11).
0.3 Confirm P1, P2 and P3 by coverage: 3+ competitors, 1-2, none.
0.4 Confirm price bands and packages as drafts.
0.5 Confirm six directions, 14 groups and the URL map.
0.6 Confirm the precedent policy for solutions
    (`docs/frontend/content-contract.md`).

Exit: scope, order and prices are signed off as drafts.

### Phase 1: Wave 0, IA foundation

1.1 Add the direction model and the group-to-direction map.
1.2 Add the new groups and the group order.
1.3 Map the existing 36 services to directions and groups.
1.4 Add the direction route.
1.5 Rebuild `/services` as a hub.
1.6 Update the header menu and breadcrumbs.
1.7 Add RU and EN dictionaries for directions and new groups.
1.8 Update SEO route metadata.
1.9 Update group, breadcrumb, nav and route tests.
1.10 Run lint, test and verify.

Exit: the framework is green and no new page is live.

Wave 1 copy drafting can start during Phase 1. Publishing waits for the gate.

### Phase 2: Wave 1, agents core

Services in order: `ai-agents`, `ai-chatbots`, `ai-voice-agents`,
`corporate-copilot`.

For each service, run the per-service loop below. Then run the wave gate.

Exit: 4 pages live, wave gate green.

### Phase 3: Wave 2, platforms

Services: `ai-1c-integration`, `ai-bitrix24-integration`,
`ai-amocrm-integration`, `ai-telegram`, `ai-max`, `ai-n8n-make`.

Dependency: existing CRM, ERP and CMS pages for cross-links. The
`ai-integrations` group needs deliverables and tradeoffs. `ai-max` is split
from Telegram: its scope includes MAX onboarding, KYC and legal support, so it
does not share a page with `ai-telegram`.

Exit: 6 pages live, wave gate green.

### Phase 4: Wave 3, agents scale

Services: `ai-support-automation`, `speech-analytics`, `ai-sales-agents`,
`ai-recruiter`, `ai-workflow-automation`.

Dependency: Wave 1 pages for cross-links. Speech analytics uses retainer
pricing.

Exit: 5 pages live, wave gate green.

### Phase 5: Wave 4, data

Services: `data-engineering`, `data-annotation`, `synthetic-data`,
`data-readiness-audit`, `conversational-bi`.

Dependency: the new `data` group, ML pages for cross-links, and diagrams if the
group rule requires them.

Exit: 5 pages live, wave gate green.

### Phase 6: Wave 5, models and forecasting

Services: `llm-fine-tuning`, `llm-evaluation`, `ai-forecasting`.

Dependency: the new `models` group, MLOps and RAG pages for cross-links.

Exit: 3 pages live, wave gate green.

### Phase 7: Wave 6, trust

Services: `ai-consulting`, `ai-readiness-audit`, `ai-governance-compliance`,
`ai-security-gateway`.

Dependency: the new `security`, `strategy` and `governance` groups, and the
existing security audit for cross-links.

Exit: 4 pages live, wave gate green.

### Phase 8: Wave 7, engineering

Services: `document-processing`, `ai-application-rescue`,
`prompt-engineering`.

Dependency: the `engineering` group techStack rule and existing software and
highload pages.

Exit: 3 pages live, wave gate green.

### Phase 9: Wave 8, search and site

Order matters:

9.1 Rewrite the `seo-aeo` hub: comparison, price, calculator, packages, links.
9.2 `seo`.
9.3 `aeo`.
9.4 `geo-ai-search`.
9.5 `ai-for-site`.

Dependency: the `web-growth` group, the query ownership matrix, and no redirect.

Exit: hub rewrite plus 4 pages live, wave gate green.

### Phase 10: Wave 9, scale offers

Services: `ai-pilot`, `ai-center-of-excellence`.

Dependency: strategy and governance pages for cross-links. The CoE uses program
pricing.

Exit: 2 pages live, wave gate green.

### Phases 11-12: Waves 10-11, industry solutions

The solution waves moved to `docs/plans/solution-catalog-expansion.md`. They
depend on services from Phases 2-9 and on one precedent per solution
(`docs/frontend/content-contract.md`).

### Phase 13: Wave 12, precedents and SEO audit

Real cases, articles, internal links, sitemap, 404, performance and a final SEO
audit. Cases without real data stay drafts.

Exit: growth and conversion review.

## Per-service loop

1. Write the brief: query, ICP, pain, mechanism, 4 features, 4 process steps,
   2 fit items, 4 FAQ, 3 relevants, price, calculator fields, cover idea.
2. Add the fixture.
3. Write the RU dictionary.
4. Write the EN dictionary.
5. Set the price floor.
6. Add the calculator spec and its labels in RU and EN.
7. Add relevants and internal links.
8. Add the cover queue record, generate the cover, remove the record.
9. Run the fast service gate and targeted tests.
10. Publish and run the SEO check.

## Per-wave gate

- RU and EN copy pass the prose gates.
- Every service has a cover.
- Every published service has a price and a calculator.
- Relevants resolve and internal links are added.
- Titles, descriptions, H1 and canonical are unique.
- `npm run lint`, `npm run test`, `npm run verify` are green.
- The sitemap contains the new routes.

## Dependencies and blockers

1. Wave 0 must precede publishing.
2. Solutions need a precedent. Without it, they stay drafts.
3. The `seo-aeo` hub rewrite precedes its three child services.
4. Covers are a hard gate.
5. Calculator labels need RU and EN parity.
6. New groups need quality rules, otherwise thin pages can pass.
7. Data and models need diagrams if the group rule is extended to them.

## Precedent coverage for solutions

Moved to `docs/plans/solution-catalog-expansion.md`.

## First three actions

1. Dispatch `competitor-scout` and review its matrix.
2. Implement Wave 0.
3. Write the Wave 1 brief for `ai-agents`.
