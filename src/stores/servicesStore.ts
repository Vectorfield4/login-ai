import { create } from "zustand";
import { fetchServices } from "../api/services";
import { serviceFixtures } from "../mocks/fixtures/services";
import type { Service } from "../types/services";

export type ServicesStatus = "idle" | "loading" | "ready" | "error";

interface ServicesState {
  /**
   * Услуги. Синхронный seed = дефолтные данные (serviceFixtures), поэтому
   * первый рендер не требует загрузки. Когда появится бэкенд,
   * hydrate()/loadServices() перепишут seed ответом fetchServices().
   */
  services: Service[];
  status: ServicesStatus;
  error: string | null;
  loadServices: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useServicesStore = create<ServicesState>()((set, get) => ({
  services: serviceFixtures,
  status: "idle",
  error: null,
  loadServices: async () => {
    set({ status: "loading", error: null });
    try {
      const services = await fetchServices();
      set({ services, status: "ready" });
    } catch (error) {
      set({
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
  hydrate: async () => {
    if (get().status === "idle" || get().services.length === 0) {
      await get().loadServices();
    }
  },
}));

/** Селекторы для хуков страниц. */
export const selectServices = (state: ServicesState) => state.services;
export const selectServiceBySlug = (services: Service[], slug?: string): Service | undefined =>
  services.find((s) => s.slug === slug);

/** Геттеры для не-хуковых потребителей (seo.ts) — синхронный seed. */
export const getServices = () => useServicesStore.getState().services;
export const getServiceBySlug = (slug?: string): Service | undefined =>
  useServicesStore.getState().services.find((s) => s.slug === slug);
