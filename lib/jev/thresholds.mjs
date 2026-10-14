// Threshold policy for the Jev gates: the numbers every domain shares. A rubric
// set lives with its domain; the bar it must clear lives here.

export const THRESHOLDS = {
  /** Minimum `choice.confidence` before a dominant-label verdict is reported. */
  choiceConfidence: 0.5,
  /** A `noul` at or above this is a strong yes; at or below (1 - it) a strong no. */
  noul: 0.8,
  /**
   * G1 noul-checklist corridors on the violation probability `p = answer.noul`.
   * `act` — a confident violation, reported as `<FILTER>_CANDIDATE`;
   * `review` — the dead zone between `review` and `act`, one `<FILTER>_UNSURE`
   * per unit for the critic; below `review` the unit is clean. The gap between
   * the two is deliberate hysteresis against threshold flapping, kept narrow
   * enough that short fragments do not flood the report.
   */
  violation: { act: 0.8, review: 0.65 },
};
