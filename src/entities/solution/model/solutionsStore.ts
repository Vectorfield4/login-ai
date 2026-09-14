import { create } from "zustand";
import { fetchSolutions } from "@/entities/solution/api/solutions";
import type { Solution } from "@/entities/solution/model/solutions";
import { solutionFixtures } from "@/shared/mocks/fixtures/solutions";

export type SolutionsStatus = "idle" | "loading" | "ready" | "error";

interface SolutionsState {
  /**
   * Решения. Синхронный seed = дефолтные данные (solutionFixtures), поэтому
   * первый рендер не требует загрузки. Когда появится бэкенд,
   * hydrate()/loadSolutions() перепишут seed ответом fetchSolutions().
   */
  solutions: Solution[];
  status: SolutionsStatus;
  error: string | null;
  loadSolutions: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useSolutionsStore = create<SolutionsState>()((set, get) => ({
  solutions: solutionFixtures,
  status: "idle",
  error: null,
  loadSolutions: async () => {
    set({ status: "loading", error: null });
    try {
      const solutions = await fetchSolutions();
      set({ solutions, status: "ready" });
    } catch (error) {
      set({
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
  hydrate: async () => {
    if (get().status === "idle" || get().solutions.length === 0) {
      await get().loadSolutions();
    }
  },
}));

/** Селекторы для хуков страниц. */
export const selectSolutions = (state: SolutionsState) => state.solutions;
export const selectSolutionBySlug = (solutions: Solution[], slug?: string): Solution | undefined =>
  solutions.find((s) => s.slug === slug);

/** Геттеры для не-хуковых потребителей (seo.ts, lib/relevants.ts) — синхронный seed. */
export const getSolutions = () => useSolutionsStore.getState().solutions;
export const getSolutionBySlug = (slug?: string): Solution | undefined =>
  useSolutionsStore.getState().solutions.find((s) => s.slug === slug);
