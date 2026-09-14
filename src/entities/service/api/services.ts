import type { Service } from "@/entities/service/model/services";
import { serviceFixtures } from "@/shared/mocks/fixtures/services";

/**
 * Услуги. Сейчас — локальные данные; когда появится бэкенд, здесь будет
 * fetch("/api/services") — единственная точка замены.
 */
export async function fetchServices(): Promise<Service[]> {
  return serviceFixtures;
}
