import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("video-generation-vs-studio", () => {
  it("совпадает с unified image prompt стандартом", () => {
    expectPromptStandard("article", "video-generation-vs-studio");
  });
});
