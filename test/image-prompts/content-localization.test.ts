import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("content-localization", () => {
  it("совпадает с instructional-old или scene-defined-new стандартом", () => {
    expectPromptStandard("service", "content-localization");
  });
});
