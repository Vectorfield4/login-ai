import { solutionFixtures } from "../mocks/fixtures/solutions";
import type { Solution } from "../types/solutions";

/**
 * Решения. Сейчас — локальные данные; когда появится бэкенд, здесь будет
 * fetch("/api/solutions") — единственная точка замены.
 */
export async function fetchSolutions(): Promise<Solution[]> {
  return solutionFixtures;
}
