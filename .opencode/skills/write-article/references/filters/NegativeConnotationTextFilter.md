# Negative connotation filter (positive-argument gate)

The `prose-critic` subagent applies this before returning PASS. The section
argues from what the system does and from a number, never from what fails
without it. Scaring the reader into a purchase is the banned move.

## Banned reasoning

| Pattern | Example | Replace with |
| --- | --- | --- |
| Antithesis «не X, а Y» | «Это не чат-бот, а агент» | state Y: «Агент выполняет задачу» |
| «не просто», «не только» | «Не просто отвечает, а действует» | the action |
| Contrary «на деле иначе» | «На деле всё иначе» | the fact |
| Conditional negative | «Если не внедрите, потеряете рынок» | «Внедрение возвращает X за Y» |
| Doomsaying | «Без этого компания проиграет» | the cost of the status quo, with a number |
| Legacy-bashing | «Старые решения безнадёжны» | the criterion where the new option wins |

A limit is stated directly: «кэш окупается на потоках с повторами», never «кэш
работает не всегда». Comparison lives in a criteria table with a scale
(`common.md`), not in dismissal of the alternative.

## Deterministic overlap

`test/copyRules.ts` already hard-fails the RU patterns «не просто … а» and the
rest for every article. This filter catches the semantic forms the regex cannot:
a paragraph built on fear, a legacy-bashing aside that never uses the word «не».

## Finding

One line per hit: `[file:line] NEGATIVE_CONNOTATION_VIOLATION: <argument built
on negation or fear>.`
