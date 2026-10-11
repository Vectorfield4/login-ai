import { describe, expect, it, vi } from "vitest";

vi.mock("astro:assets", () => ({ getImage: vi.fn() }));

import { getServiceDiagram } from "@/app/data/serviceDiagrams";
import { getServiceImage } from "@/app/data/serviceImages";

/**
 * Asset manifests for services. The backdrop gate checks files on disk, but the
 * resolvers that feed the hero, `og:image` and the mechanism diagrams were
 * untested, so a broken manifest passed the suite and broke the page.
 */
describe("service backdrop manifest", () => {
  it("находит backdrop по слагу", () => {
    const image = getServiceImage("ai-crm-integration");
    expect(image).toBeTruthy();
  });

  it("возвращает undefined для чужого или пустого слага", () => {
    expect(getServiceImage("no-such-service")).toBeUndefined();
    expect(getServiceImage(undefined)).toBeUndefined();
  });
});

describe("service diagram manifest", () => {
  it("находит light/dark SVG по слагам", () => {
    const diagram = getServiceDiagram("computer-vision-systems", "pipeline", "ru");
    expect(diagram).toBeDefined();
    expect(diagram?.light).toBeTruthy();
    expect(diagram?.dark).toBeTruthy();
  });

  it("языки и слаги изолированы", () => {
    expect(getServiceDiagram("computer-vision-systems", "no-such-diagram", "ru")).toBeUndefined();
    expect(getServiceDiagram("computer-vision-systems", "no-such-diagram", "en")).toBeUndefined();
    expect(getServiceDiagram("no-such-service", "pipeline", "ru")).toBeUndefined();
  });
});
