# Jev (`typesafe:jev@1`) в WriteArticle / WriteService — done (2026-10-13)

## Done

- Транспорт: `scripts/jev/core.mjs` — один HTTP-вызов `POST https://api.runware.ai/v1/decisions`
  (`typesafe:jev@1`), ретрай 429/529, `no-op` без `RUNWARE_API_KEY`. Плюс `prompts.mjs`
  (вопросы/пороги/`PROMPT_VERSION`), `lines.mjs` (карта строк md/ts + `serviceBlocks`),
  `review.mjs` (CLI), `eval.mjs` + `eval-fixtures.json`. MCP не задействован.
- Гейты — одним батч-вызовом на документ: G1 фильтры по абзацам/строкам (`choice`),
  G2 relevants (`noul`), G3 жанр/структура, G4 AEO lead-hook, G5 семантика блоков сервиса.
  Пороги `choice.confidence ≥ 0.5`, `noul ≤ 0.2`; флаги `--strict`, `--min-confidence`, `--lang`,
  `--json`, `--advisory`.
- Скиллы: `write-article/SKILL.md` шаг 8, `write-service/SKILL.md` шаг 3; `publish.mjs --jev`
  (оба); `write-article/references/jev.md`; вендорский `.opencode/skills/typesafe-ai/`;
  `prose-critic` сужён (фильтры читаются по требованию), `service-critic` без изменений;
  заметка в `AGENTS.md`.

## Acceptance criteria

- [x] Один батч-вызов Jev на документ покрывает G1–G5.
- [x] Advisory-находки `[file:line] RULE (conf)`; `publish.mjs --jev` скипает при кандидатах;
      без ключа — тихий пропуск, exit 0, CI сети не касается.
- [x] `eval.mjs` калибрует G1 на RU+EN фикстурах.
- [x] Оба скилла задокументированы; `prose-critic` без обязательного чтения шести фильтров.

## Verification

`npm run lint` — clean (560 файлов); `npm run test` — 389 passed / 0 failed;
`node scripts/jev/eval.mjs` — 16/16 dominant-label (RU+EN). Живые прогоны:
`system-one-primitives-agents` → `SYNTHETIC_DEPTH` (l.19), `STRUCTURE_MISMATCH`;
`highload-backend` → `RELEVANT_FIT (0.13) — solution:medical-clinics`.

## References

- `write-article/references/jev.md`; вендорский skill `github.com/typesafe-ai/skills`;
  Runware compatible API `runware.ai/docs/tools/compatible-apis`.
