// The content gates' answer→finding mapping, over the generic collectors in
// `lib/jev/findings.mjs`.

import { collectChoices, noulFinding } from "@login-ai/jev/findings.mjs";
import { wordCount } from "@login-ai/jev/text.mjs";

/** G1 verdicts into findings. Shared by both prose document shapes. */
export function filterFindings(units, answers, findings, minConfidence) {
  collectChoices({
    units,
    answers,
    prefix: "u",
    minConfidence,
    ruleFor: (choice) => `${choice.toUpperCase()}_CANDIDATE`,
    findings,
  });
}

/** G2: a linked target the model confidently reads as off-topic. */
export function relevanceFindings(targets, answers, findings) {
  targets.forEach((target, i) => {
    if (!target.text) return;
    noulFinding(findings, answers[`rel${i}`], {
      line: 0,
      rule: "RELEVANT_FIT_CANDIDATE",
      detail: `${target.type}:${target.slug}`,
    });
  });
}

/** `--strict`: independent `noul` probes for the negation and grounding filters. */
export function strictFindings(units, answers, findings) {
  const rules = [
    ["sneg", "NEGATIVE_CONNOTATION_CANDIDATE"],
    ["sfake", "FAKE_DEPTH_CANDIDATE"],
  ];
  units.forEach((unit, i) => {
    if (wordCount(unit.text) < 4) return;
    for (const [prefix, rule] of rules) {
      noulFinding(findings, answers[`${prefix}${i}`], {
        line: unit.line,
        rule,
        detail: unit.text.slice(0, 90),
      });
    }
  });
}
