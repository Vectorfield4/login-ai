// The two Jev primitive shapes, as question factories. Domains compose these
// into their own question sets; the engine never knows what a criterion means.

/** One dominant-label `choice` question over a label→criterion map. */
export const choiceQuestion = (instructions, criteria) => ({
  type: "choice",
  instructions,
  criteria,
});

/** One binary `noul` question stating the desirable property. */
export const noulQuestion = (instructions) => ({
  type: "noul",
  instructions,
});
