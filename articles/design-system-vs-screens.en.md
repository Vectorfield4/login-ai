---
title: "Design system or separate screens: what pays off across 5 to 20 screens"
description: "We compare a design system with separate screens on four axes: the estimate at 5 and 20 screens, changes after release and the number of component variants."
publishedAt: 2026-10-24
draft: false
category: industry
excerpt: "A design system adds RUB 30,000-60,000 to screen work, or 2.5 to 7.5 screens. We show the volume where it pays back and the cases where separate screens stay cheaper."
tags: ["Design system", "UI screens", "UI/UX design", "Software development"]
relatedServices: ["ui-ux-design", "software-development"]
relatedSolutions: []
relatedCases: []
planNumber: 78
funnel: MoFu
persona: CTO
targetQuery: "design system or separate screens"
---

Below eight screens separate screens are cheaper: a library of repeatable components with states, spacing rules and version rules at RUB 30,000-60,000 does not pay back in that volume. From eight screens it returns the surcharge through changes after release and raises the team's throughput.

## Four axes and the scale

The comparison runs on four axes, and each one is measured by a number. The screen rate is RUB 8,000-12,000, the design system is RUB 30,000-60,000. The RUB 60,000 base for structure and concept is identical in both options, so it stays out of the comparison; the five screens are counted separately, at RUB 8,000-12,000 each.

Estimate at five screens. Lower edge of the scale: up to RUB 60,000. Upper edge: RUB 150,000 and above.

Estimate at twenty screens. Lower edge: up to RUB 160,000. Upper edge: RUB 400,000 and above.

Edits per change after release. Lower edge: one edit. Upper edge: twenty, one per screen that holds the component.

Component variants by the twentieth screen. Lower edge: one component with states. Upper edge: forty, two variants per screen.

| Axis | Separate screens | Design system |
| --- | --- | --- |
| Estimate at 5 screens | 1 · RUB 40,000-60,000 | 4 · RUB 70,000-120,000 |
| Estimate at 20 screens | 2 · RUB 160,000-240,000 | 4 · RUB 190,000-300,000 |
| Edits per change after release | 4 · up to 12 | 1 · one |
| Component variants by screen 20 | 4 · up to 20 | 1 · one with states |

The score in a cell is the position on the axis, and the exact range sits next to it. The table misses two cases that decide the outcome. First: the screens share no components, each has its own layout, and a library has nothing to collect. Second: the product lives on one table with ten modes, and the only shared part is the header.

## Separate screens: where they win

The initial estimate is the strength of this option. Five screens cost RUB 40,000-60,000 at RUB 8,000-12,000 each, two consolidated review rounds land on named screens, and handover ships as a package per screen.

The option fits a product with one role and one release: the team builds the interface, ships it and freezes the work. At five to seven screens a library does not pay back, because the shared components are few: header, button, field, modal. Four components across seven screens make twenty-eight edit points, and in the first version they cause no trouble.

The boundary shows up in the second release. A header change that sits on twelve screens turns into twelve edits, and each one can drift its own way. By the twentieth screen the file holds up to twenty variants of one button when every screen draws it from scratch.

## Design system: where it wins

The system sells the cost of change. The library costs RUB 30,000-60,000, which is 2.5 to 7.5 screens at the marginal rate. At five screens it adds 50-150% to screen work, at twenty screens 13-38%. Revisions after release pay that surcharge back.

The mechanism is short. A shared component is edited once and reaches every screen: a header on twelve screens takes one edit instead of twelve. If you change a component that sits on eight screens three times after release, the system delivers twenty-four edits against three.

Handover changes the package. Instead of twenty layouts the team receives a library with states, spacing rules, version rules and documentation. For a CTO this is throughput: a new page assembles from ready elements, and the question of which button belongs here is answered by a component reference.

The system carries a maintenance cost. The library needs an owner, because without one the components drift away from the product and local exceptions appear after two releases. If the journeys change after the first version, part of the components is rebuilt, and that is a second pass through the budget.

## The break-even

First conclusion: below eight screens the system remains a surcharge that only future changes can justify.

The second conclusion covers changes. The break-even is 22 saved edits per release. At an edit price of RUB 1,400-2,900 that volume covers the RUB 30,000-60,000 library in one release; half the volume covers the threshold over two releases. One edit is one operation in one file, so the break-even stays in edits and screens.

The third conclusion covers time. The calculator counts 0.15-0.25 weeks per screen and 1.75-3.25 weeks for structure: twenty screens take 4.75-8.25 weeks. The design system is not estimated in weeks, which is a limit of the calculation, and it goes into the plan as a separate line.

## Verdict by fit

Five to seven screens, one role, one release: separate screens. Screen work is RUB 40,000-60,000, and a library does not pay back across four shared components.

Eight to fourteen screens, two or three roles, releases after handover: a hybrid. The system covers five to seven repeated elements (button, field, table row, menu, modal), separate screens cover the rest. Five of the seven repeated elements across eight screens cover 40 of 56 edit points, and the library does not turn into a separate product.

Fifteen to twenty screens, or several products with a shared interface: the system. RUB 30,000-60,000 pays back with a component on eight or more screens and three changes after release; the handover gives development states, spacing and version rules.

Pages with different layouts and no shared components: separate screens at any volume. Two shared elements cost less to draw twice than to build into a library for RUB 30,000.

For a CTO the result counts in edits per release and in the number of screens they touch; a designer's hour stays out of that count.

## Assumptions

The calculation rests on our rates: RUB 8,000-12,000 per screen, RUB 30,000-60,000 for the system, RUB 60,000 for the base. It is not a market measurement and not a delivery promise. The number of edits depends on how many screens share a component, and that count comes from your file before the work starts.

## What to do before deciding

Build the screen inventory and mark how many screens share the header, the button, the field, the table row and the modal. The inventory is the input document for the choice: it shows what can go into a library at all.

The baseline is two figures: edits per change after release and component variants. Both are counted before the work, from the current file or from the last release.

The check runs 14 days after the first release: how many new component variants appeared and how many screens needed a manual edit. It repeats the same measurement as the start, so the comparison stays honest.

The rollout condition is deterministic. A component on eight or more screens plus three changes per release means the system goes to its own line. Fewer than eight screens means separate screens stay, and components are fixed inside the file.

The [UI/UX design calculator](https://loginai.ru/en/services/ui-ux-design) prices both options: it returns a range by screen count, complexity, research and the system. [Software development](https://loginai.ru/en/services/software-development) builds the library in code and assembles the pages. How to read the estimate line by line is covered in the [seven-line breakdown](https://loginai.ru/en/news/ui-ux-cost-breakdown).
