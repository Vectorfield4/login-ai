# Technology, stack, model & software-type enabler — done (2026-10-17)

## Done

- `entities/technology`: 39 records — 5 broad AI families (`llm`,
  `computer-vision`, `agentic`, `rag`, `nlp`) and 34 granular features
  (`text-to-video`, `image-to-video`, `inpainting`, `text-to-speech`,
  `object-detection`, …). `video`, `image` and `audio` are family keys, not
  records; fixtures are split by category under
  `entities/technology/model/fixtures/`, and `fixtures.ts` is an index.
- `entities/capability`: 10 business contours (`content`, `reputation`,
  `monitoring`, `recommendations`, `seo-reputation`, `presentations`,
  `localization`, `mlops`, `ai-security`, `sovereign-models`). A capability is
  the discrete add-on scope, not the packaged service: `seo-reputation` is the
  reputation-SEO add-on, while `seo-aeo` stays the full service.
- `entities/stack`: 34 records across 10 kinds and 13 product areas — 6
  languages, 2 runtimes, 5 frameworks, 2 libraries, 2 inference engines,
  1 extension, 7 data stores, 1 broker, 7 platforms, 1 API.
- `entities/llm-model`: 2 trained models (`Qwen`, `Llama`).
- `entities/software-type`: 6 types (`erp`, `crm`, `cms`, `mes`, `wms`,
  `task-tracker`) and 12 vendor products.
- The `technologies.*` namespace moved into `entities/technology`; 11 new
  `capabilities.*` keys cover the business contours. RU/EN dictionaries have
  the same keys.
- `test/entities/enabler-coverage.test.ts` guards the catalogs and the add-on
  targets; the 18 former `bundle.ref` values were replaced by `addon` terms,
  with `ai-video-training` the only remaining service bundle.
- `AGENTS.md` and `docs/frontend/feature-slice-design.md` describe the five
  catalogs, the `kind` / `category` axes and the capability-vs-service rule.
- The calculator follow-up is implemented in `widgets/cost-calculator` +
  `features/calculator`, as recorded in `docs/plans/calculator/rfc.md`.

## Acceptance criteria

- [x] `technology` holds AI families and features only; no libraries, services
  or business contours.
- [x] `video`, `image` and `audio` exist as family keys, not as records.
- [x] Business contours live in `capability`, and `seo-reputation` does not
  duplicate the `seo-aeo` service.
- [x] `stack` carries both `kind` and `category`, and the two never repeat each
  other.
- [x] Models (`Qwen`, `Llama`) and software types with their products are
  separate catalogs.
- [x] Service slugs never appear in `technology`, `stack` or `llm-model`.
- [x] Slugs are unique across `technology`, `stack`, `llm-model` and
  `software-type`.
- [x] Every `TechItem.name`, `ModuleProvider.name` and `solutions[].tags` value
  resolves to a catalog entry.
- [x] Every `addon` ref has catalog pricing and every `included` item resolves.
- [x] RU/EN dictionaries have the same keys.

## Verification

`lint` clean (727 files); `test` 109 files / 517 passed / 0 failed; `verify`
built 168 pages, `verify:dist` ok (167 sitemap pages + `/404.html`).

## References

- Commit `92c18d4` — `refactor(entities): extract technology, stack, model and
  software-type catalogs`.
- `docs/plans/calculator/rfc.md` — add-on pricing model, inventory and decisions.
- `src/entities/AGENTS.md`, `docs/frontend/feature-slice-design.md` — layer
  restrictions and catalog layout.
