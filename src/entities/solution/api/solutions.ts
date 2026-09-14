import type { Solution } from "@/entities/solution/model/solutions";
import { solutionFixtures } from "@/shared/mocks/fixtures/solutions";

/**
 * Решения. Сейчас — локальные данные; когда появится бэкенд, здесь будет
 * fetch("/api/solutions") — единственная точка замены.
 */
export async function fetchSolutions(): Promise<Solution[]> {
  return solutionFixtures;
}
