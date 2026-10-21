# Service catalog expansion — done (2026-10-21)

## Done

- IA foundation: six directions, 14 groups, `/services` hub, group and direction
  routes, breadcrumbs, header nav, SEO metadata and route tests.
- 36 services published in nine waves:
  - Wave 1: `ai-agents`, `ai-chatbots`, `ai-voice-agents`, `corporate-copilot`.
  - Wave 2: `ai-1c-integration`, `ai-bitrix24-integration`,
    `ai-amocrm-integration`, `ai-telegram`, `ai-max`, `ai-n8n-make`.
  - Wave 3: `ai-support-automation`, `speech-analytics`, `ai-sales-agents`,
    `ai-recruiter`, `ai-workflow-automation`.
  - Wave 4: `data-engineering`, `data-annotation`, `synthetic-data`,
    `data-readiness-audit`, `conversational-bi`.
  - Wave 5: `llm-fine-tuning`, `llm-evaluation`, `ai-forecasting`.
  - Wave 6: `ai-consulting`, `ai-readiness-audit`, `ai-governance-compliance`,
    `ai-security-gateway`.
  - Wave 7: `document-processing`, `ai-application-rescue`,
    `prompt-engineering`.
  - Wave 8: `seo`, `aeo`, `geo-ai-search`, `ai-for-site`; the `seo-aeo` hub was
    rewritten and relinked to the four child services.
  - Wave 9: `ai-pilot`, `ai-center-of-excellence`.
- Every service ships a fixture, RU/EN dictionary, price, calculator spec, 3+
  relevant links, a 1376×768 backdrop and no generation-queue record.
- Image pipeline: one template, one style block and one slug-derived composition
  pool for every kind; 30 service backdrops regenerated to the unified standard.
- Main files: `src/entities/service/`, `src/shared/i18n/{ru,en}/calculator.ts`,
  `src/shared/i18n/{ru,en}/services*.ts`, `src/shared/data/{seo,breadcrumbs}.ts`,
  `src/widgets/app-bar/`, `src/pages/[lang]/services*`,
  `assets/images/services/`, `content/generation-queue.json`.

## Acceptance criteria

- [x] 36 services are live under flat `/services/<slug>` routes.
- [x] RU copy is 700+ words; EN is at least 90% of RU.
- [x] Every published service has a price, a calculator with a `setup` term and
  a default estimate that matches the advertised floor.
- [x] Every service has at least 3 relevants across at least 2 types.
- [x] Titles, descriptions, H1 and canonicals are unique; the sitemap contains
  both locales of every route.
- [x] `npm run lint`, `npm run test` and `npm run verify` pass.

## Verification

`npm run lint` clean. `npm run test`: 576 passed, 0 failed, 111 files.
`npm run build`: 267 pages. `npm run verify:dist`: ok — 266 sitemap pages plus
`/404.html`, head and assets valid.

## References

- `docs/plans/service-catalog-expansion-pricing.md` — service floors and
  calculator rules.
- `docs/plans/service-catalog-expansion-intents.md` — intent map and query
  ownership.
- `src/entities/service/AGENTS.md` — service authoring contract.
- `docs/frontend/i18n.md`, `docs/frontend/prose-quality.md` — copy and locale
  rules.
- Published entry points: `/services`, `/services/seo-aeo`, `/services/ai-pilot`,
  `/services/ai-center-of-excellence`.
