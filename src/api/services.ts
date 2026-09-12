import { serviceFixtures } from "../mocks/fixtures/services";
import type { Service } from "../types/services";

/**
 * Услуги. Сейчас — локальные данные; когда появится бэкенд, здесь будет
 * fetch("/api/services") — единственная точка замены.
 */
export async function fetchServices(): Promise<Service[]> {
  return serviceFixtures;
}
