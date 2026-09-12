import { HttpResponse, http } from "msw";
import { caseFixtures } from "./fixtures/cases";
import { serviceFixtures } from "./fixtures/services";
import { solutionFixtures } from "./fixtures/solutions";

export const handlers = [
  http.get("/api/health", () => HttpResponse.json({ status: "ok" })),
  // Контракты бэкенда зафиксированы заранее; сейчас данные те же, что в seed-фикстурах.
  http.get("/api/cases", () => HttpResponse.json(caseFixtures)),
  http.get("/api/services", () => HttpResponse.json(serviceFixtures)),
  http.get("/api/solutions", () => HttpResponse.json(solutionFixtures)),
];
