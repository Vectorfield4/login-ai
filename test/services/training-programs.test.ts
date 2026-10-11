import { describe, expect, it } from "vitest";
import { services } from "@/entities/service/model/fixtures";

/**
 * Training programs mirror a content direction. A program is a practicum on
 * the matching direction service, so customers see the path from a service to
 * the training built on it. The mirror is enforced through `relevants`.
 */
const MIRROR: Record<string, string> = {
  "ai-text-training": "content-generation",
  "ai-image-training": "image-generation",
  "ai-video-training": "video-generation",
  "ai-voice-training": "voice-audio-generation",
  "ai-localization-training": "content-localization",
  "ai-presentations-training": "ai-presentations",
};

const bySlug = new Map(services.map((service) => [service.slug, service]));

describe("training programs", () => {
  it("каждая программа зеркалит направление решения", () => {
    for (const [trainingSlug, directionSlug] of Object.entries(MIRROR)) {
      const training = bySlug.get(trainingSlug);
      expect(training, `${trainingSlug} не заведена`).toBeDefined();
      expect(training?.group, `${trainingSlug}.group`).toBe("training");

      const direction = bySlug.get(directionSlug);
      expect(direction, `${directionSlug} не заведена`).toBeDefined();
      expect(direction?.group, `${directionSlug}.group`).toBe("content");

      const mirror = (training?.relevants ?? []).some(
        (ref) => ref.type === "service" && ref.slug === directionSlug,
      );
      expect(mirror, `${trainingSlug} не ссылается на ${directionSlug}`).toBe(true);
    }
  });
});
