---
title: "AI agents in support: where autonomy ends"
description: "A look at what an agent closes on its own, where a human is required, and why response time drops less than the pitch suggests."
publishedAt: 2026-02-18
readingTimeMin: 6
tags: ["Agentic systems", "Customer service"]
relatedServices: ["customer-experience"]
relatedSolutions: ["agentic-systems"]
relatedCases: ["retail-support-bot"]
---

Automating support promises to cut response time several times over. In
practice response time does drop, but the manual workload does not always
follow. The gap shows up in the first week of operation, and it shows up in
three signs.

## What an agent actually closes

Routine questions, order status, refunds, plan changes. Here an agent beats a
person: it does not tire at the end of a shift and it never answers "call us
back next week". In the online store case study, these conversations are 62%
of the total after the rollout.

## Where a human is required

Refunds with a disputed amount, quality complaints, anything where the customer
checks a promise with money. In those scenarios the agent has to stop and hand
the conversation over rather than finish the answer.

> A mistake costs more than a missing answer: one wrongly confirmed refund
> costs more than ten automatic replies nobody needed.

## Why the response time metric misleads

Median response time drops almost immediately, because the agent answers
everything. What drops with it is the share of conversations closed without a
person. Track a pair of metrics instead: the share of dialogs closed without
escalation, and the number of refunds filed because of the agent.

| Metric | Before | After |
| --- | --- | --- |
| Median response time | 4 min 12 s | 11 s |
| Closed without a person | 18% | 62% |
| Refunds with disputed amount | 0.4% | 0.9% |

The third row is the price of the second. Track it separately, and once it
grows past the baseline, move escalation to first contact: the customer
reaches a person before forming a false expectation.

## What we changed in the scripts

The agent stopped promising timelines it cannot track. Instead of "we will
return it tomorrow" it checks the order status and names the date from the
system. A promise nobody can verify turns into a refund; honest uncertainty
turns into a clarifying question. Complaints stopped rising, and the share of
closed conversations stayed at 62%.
