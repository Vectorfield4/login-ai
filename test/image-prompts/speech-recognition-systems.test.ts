import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("speech-recognition-systems", () => {
  it("совпадает с instructional-old или scene-defined-new стандартом", () => {
    expectPromptStandard("service", "speech-recognition-systems");
  });
});
