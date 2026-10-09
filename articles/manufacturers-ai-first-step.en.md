---
title: "AI in manufacturing: start with one process"
description: "Where to start with AI in manufacturing: pick the first process by volume, written rules, and the cost of a mistake, wire up the data, and close the loop on operator confirmations."
publishedAt: 2027-02-02
category: industry
excerpt: "AI in manufacturing starts with one process where volume is steady, rules are written, and a mistake is cheap. We cover picking the first area, wiring the data, and the limits of the pilot."
tags: ["Manufacturing", "AI adoption", "Computer vision", "Agents"]
relatedServices: []
relatedSolutions: ["manufacturers"]
relatedCases: ["quality-vision-line"]
---

A pilot spread across several processes leaves it unclear which area produced the effect, so the spend has no basis. Start with one process where volume is steady, rules are written, and a mistake is cheap. Most often that is incoming requests and standard documents; line quality control comes second, once the first pilot has metric numbers. [Solutions for manufacturers](https://loginai.ru/en/solutions/manufacturers).

## Context: why the pilot narrows to one process

A plant has dozens of areas: requests, procurement, documents, quality, planning. AI does not land on all of them at once, and the constraint is not technical. A metric is counted for one area: while the pilot is spread across five processes, it is unclear what produced the effect and what to compare it against.

It helps to split two questions. "What does one operation cost" compares processes against each other. "What does the area cost per month" describes the budget: the one-time setup plus the variable output. Both numbers come from one estimate, but they answer different questions, and mixing them in a talk with the director does not help.

The narrow scope also sets the schedule. A pilot on one process starts in two to four weeks, because the data and rules are gathered for a single operation. The cost of an operation is counted before the start: staff time, the price of a mistake, and volume. For order processing that is usually 120 to 450 rubles per unit, and the spread comes from the industry. A pilot on a process with 200 requests a day pays off in a month, and on steady volume with written rules the agent reaches the level of an experienced employee in two to three weeks.

## Where to look: four candidates for the first pilot

A candidate is scored on three axes: steady volume, written rules, and the cost of a mistake. Readiness for the pilot is the lowest of the three scores on a scale from one to five.

| First process | Volume | Rules | Cost of a mistake | Readiness, 1-5 |
| --- | --- | --- | --- | --- |
| Incoming requests and orders | steady, from 100 a day | written | low: an operator checks before sending | 5 |
| Standard documents and approvals | medium | written | medium: edits happen before signing | 4 |
| Line quality control | steady, every unit | partial: defect classes | medium: disputes go to an operator | 3 |
| Internal assistant for policies | variable | written | low | 3 |

Incoming requests sit at the top: steady flow, written rules, and an operator catches a mistake before it lands. Line quality control comes next. Its volume is steady, but the rules split into defect classes, and a false reject of a good part stops the line, so manual recheck joins the area. The assistant for policies forgives mistakes, but a variable volume hides the effect in hours for the first month.

The second candidate follows from what is left. If requests are covered, the next step is documents and approvals: the same rules apply, but a mistake costs more, because the draft goes to signature. The line is launched as a separate pilot: it needs cameras, lighting, and defect labeling, and the setup takes longer than an accounting integration.

## What to instrument in the first process

Instrumenting a process means giving the agent access to the data, taking base metrics, and fixing the place of the human.

Access to the system. The agent needs an API to the record system: read from 1C, write to CRM, pull attachments from email. With open interfaces the setup takes days. Start with one record system: a link between two systems gives 80% of the effect.

Order in the reference data. Duplicate records and empty fields feed the agent garbage, so cleaning the reference data before the start saves support time. A week on reference data saves months of support.

The base metric. Before automation, four numbers are fixed: operations per day, time per operation, the share of errors, and the share of operations closed without a human. The same four numbers are taken after the pilot, and the comparison shows the effect.

Failure behavior. Before launch, timeout, retry, and operator escalation are described. That keeps the queue from stalling without an answer, and an incident does not go unnoticed.

Rights and roles. Before the start, the systems the agent can reach are fixed: it does not see personal data unrelated to the task. An operation log and access limits close most security questions.

The boundary is issued up front. The agent prepares a decision, and for money operations an employee confirms it: requests speed up by a third, and an unapproved payment stays rare. The agent closes 80% of typical cases on its own, and disputes go to a human for review.

## How the loop closes

The loop closes on operator confirmations: every manual decision becomes a labeled example. In the line quality control case, disputed cases went to an operator, and the answers went into labeling. Over six weeks the share of disputed cases fell from 6.1% to 4.0%, missed defects fell by 90%, and inspection ran five times faster.

Accuracy grows on that stream. The model is fine-tuned once a quarter: disputed examples are collected, labeled with the plant specialists, and the scenarios are updated. Where a human stays is the autonomy boundary, and we broke it down for support work in the [breakdown on where agent autonomy ends](https://loginai.ru/en/news/ai-agents-support-autonomy).

Scenarios have an owner. When disputed examples are collected but no one owns the labeling, accuracy slowly falls on new request types. The process owner is named in writing together with the escalation order.

Monitoring is set up from day one. The share of operations without a human, the number of escalations, and accuracy on a control sample land on one screen with the trend in view. Without it, disputed examples get lost in the general flow.

## Where the first pilot gets stuck

The pilot boundaries are set in advance, because part of the processes does not pay off.

A process with no written rules has nothing to automate: when a decision rests on an employee's experience, the model has no support.

Scattered systems give the agent an empty input: without order in CRM and ERP there is nowhere to pull data from, and fixing the record system comes first.

A high cost of a mistake stays with a human. Legal, financial, and safety-related wording is checked by an employee, and the agent prepares a draft.

On the line, disputed cases remain a permanent line item. In our case that is 4% of the flow: an operator reviews them until the defect distribution shifts. The saving there is counted by the number of checks taken off the operator: in the case that is four minutes per unit.

Data preparation takes about a month: indexing, cleaning, and labeling. That is the most underestimated part of the project, and it goes into the pilot schedule.

Employees get a new role: review the cases handed to the agent, fine-tune the model, and edit the scenarios. Hiring for routine operations stops, and the team load shifts to disputed cases.

Low volume does not cover the setup: on a process with a dozen operations a month, manual work costs less, because the fixed part has no time to spread across the volume. After the pilot an SLA is fixed: response time on an incident, the update window for scenarios, and the escalation order. That makes a silent failure visible, when the agent stops answering.

## What to do next

Run the pilot on one process and measure the four numbers before and after. Two to four weeks give you the hours, the share of operations without a human, and a list of disputed cases that points to the next area. The saving is confirmed on your own data.

The fixed part of the setup is paid once and spread across the whole volume: the scenario library, the access, and the rule stay with you. Support for an average area costs from ten thousand rubles a month, and it barely grows with volume.

[Solutions for manufacturers](https://loginai.ru/en/solutions/manufacturers) cover both scenarios from the table: an agent for requests and documents and computer vision for the line. Start with the process that scores highest on the readiness scale, and move the next areas along the ready rule.
