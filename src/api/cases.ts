import { caseFixtures } from "../mocks/fixtures/cases";
import type { Case } from "../types/cases";

/**
 * Получить кейсы для приложения. Единственная точка обмена с бэкендом:
 * когда «/api/cases» появится, замена происходит только здесь, без правок JSX:
 *   return fetch("/api/cases").then((r) => r.json()) — или TanStack Query.
 * Сейчас бэкенда нет — возвращаются дефолтные данные (caseFixtures).
 */
export async function fetchCases(): Promise<Case[]> {
  return caseFixtures;
}
