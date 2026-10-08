# News writing specs — done (2026-10-08)

## Done

- Промпты и каркас превращены в скилл `write-article`
  (`.opencode/skills/write-article/`).
- `SKILL.md`: назначение, таблица восьми жанров, процедура, критерии приёмки,
  failure modes.
- `references/common.md`: обязательные правила (два читателя, положительный
  аргумент, одна структура, числа, линковка, AEO, паритет RU/EN, запрещённая
  лексика, гейты).
- `references/spec-template.md`: каркас спецификации на 12 разделов.
- `references/genres/<genre>.md`: по блоку на каждый из восьми жанров
  (`product`, `research`, `technical`, `case-study`, `corporate`, `industry`,
  `media`, `community`).
- `references/acceptance.md`: проверка спецификации и статьи.
- Контент-план ссылается на скилл вместо этого файла.

## Acceptance criteria

- [x] Восемь жанров разобраны по отдельным референсам.
- [x] Инструкция разбита: общие правила, каркас, жанры, приёмка не дублируются.
- [x] Скилл лежит в `.opencode/skills/write-article/` и подхватится после
      рестарта opencode.

## Verification

`lint` clean; изменение документации и скилла, тесты не затронуты (последний
прогон: `test` 342 passed / 0 failed).

## References

- Контент-план: `docs/plans/news-content-plan.md`.
- Гайд раздела: `docs/frontend/news.md`.
- Предпосылки: `docs/plans/news-enablers.md`.
