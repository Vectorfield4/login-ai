# AEO filter (search and reader contract)

The `prose-critic` subagent applies this before returning PASS. An article leads
with the answer, not with a run-up.

## Rules

- One target query and one question. The caller passes them from the spec card
  (`spec-template.md`, section 3). If they are missing, ask for them instead of
  guessing.
- The first sentence answers the question directly, without the body.
- The headline and the first sentence work alone: a manager who reads only them
  gets the point (`common.md`, Two readers).
- The target query appears in the title, the first paragraph or the `excerpt` as
  a phrase a person would type. No keyword stuffing.

## Finding

One line per hit:

- `[file:line] AEO_VIOLATION: first sentence does not answer the question.`
- `[file:line] AEO_VIOLATION: target query missing from the head.`
