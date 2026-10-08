# Fake depth filter (anti-gloss gate)

The `prose-critic` subagent applies this before returning PASS. It targets text
that sounds substantial but names no mechanism, limit or number. It is a judged
rule set, not a regex pass: read the claim and ask what stands behind it.

## Stance

The section reads as field notes, not a press release. Every text brings a
number, a limit or the cost of a mistake. A paragraph that survives with no
number, no limit and no mechanism is gloss.

## Grounding

- No happy path. When the text introduces an architecture or a shift, it names
  at least one trade-off or limitation. A flawless rollout reads as fiction.
- A metric carries its operating boundary: hardware tier, model context limit,
  dataset or document volume, load. An unbounded "scales infinitely" claim is a
  violation.
- A superlative without a number is a violation. "Enterprise-grade" passes only
  when it maps to a named standard (SOC 2, ISO 27001).

## Evidence and qualifiers

- A number on every benefit claim. «Быстро» becomes «за 40 мс», «дешевле»
  becomes «в 400 раз».
- A number carries a source, date or condition. With no source, write «нужен
  замер».
- Name who the solution is not for, and the condition under which it breaks.
  «Подход работает на Astro 7 и React 19, на более старых версиях сборка
  падает». Limits and errors sit in the body, not in footnotes.

## Call to action

The action names the next step, not the sale. «Посмотреть демо», «развернуть
шаблон», «проверить конфиг в песочнице» beat «оставьте заявку сейчас». A
technical reader follows a low-threshold step and ignores a hard sell.

## Banned idioms and their replacement

| Banned | Required replacement |
| --- | --- |
| «Продукт корпоративного уровня», "enterprise-grade solution" | the named standard (SOC 2, ISO 27001) or the concrete capability |
| «Бесшовная интеграция», "seamless integration" | the mechanism: webhook, shared DB view, queue subscription, API call |
| «Отказоустойчивость из коробки», "out-of-the-box resilience" | the retry, fallback or failover policy, with its threshold |

"seamless" already sits in the EN banned lexicon in
`docs/frontend/prose-quality.md`; the Russian «бесшовный» is banned here. When
the mechanism is unknown, the text states «нужен замер» instead of the adjective.

## Finding

One line per hit: `[file:line] FAKE_DEPTH_VIOLATION: <claim> names no boundary,
trade-off or mechanism.`
