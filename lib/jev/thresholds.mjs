// Threshold policy for the Jev gates: the numbers every domain shares. A rubric
// set lives with its domain; the bar it must clear lives here.

export const THRESHOLDS = {
  /** Minimum `choice.confidence` before a dominant-label verdict is reported. */
  choiceConfidence: 0.5,
  /** A `noul` at or above this is a strong yes; at or below (1 - it) a strong no. */
  noul: 0.8,
};
