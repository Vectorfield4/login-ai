import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("video-generation-vs-studio", () => {
  it("совпадает с instructional-old или scene-defined-new стандартом", () => {
    expectPromptStandard("article", "video-generation-vs-studio");
  });
});
