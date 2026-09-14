import { create } from "zustand";
import { fetchCases } from "@/entities/case/api/cases";
import type { Case } from "@/entities/case/model/cases";
import { caseFixtures } from "@/shared/mocks/fixtures/cases";

export type CasesStatus = "idle" | "loading" | "ready" | "error";

interface CasesState {
  /**
   * Кейсы приложения. Синхронный seed = дефолтные данные (caseFixtures),
   * поэтому первый рендер не требует загрузки. Когда появится бэкенд,
   * hydrate()/loadCases() перепишут seed ответом fetchCases().
   */
  cases: Case[];
  status: CasesStatus;
  error: string | null;
  loadCases: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useCasesStore = create<CasesState>()((set, get) => ({
  cases: caseFixtures,
  status: "idle",
  error: null,
  loadCases: async () => {
    set({ status: "loading", error: null });
    try {
      const cases = await fetchCases();
      set({ cases, status: "ready" });
    } catch (error) {
      set({
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
  hydrate: async () => {
    if (get().status === "idle" || get().cases.length === 0) {
      await get().loadCases();
    }
  },
}));

/** Селекторы для хуков страниц. */
export const selectCases = (state: CasesState) => state.cases;
export const selectCaseBySlug = (cases: Case[], slug?: string): Case | undefined =>
  cases.find((c) => c.slug === slug);

/** Геттеры для не-хуковых потребителей (seo.ts, lib/relevants.ts) — синхронный seed. */
export const getCases = () => useCasesStore.getState().cases;
export const getCaseBySlug = (slug?: string): Case | undefined =>
  useCasesStore.getState().cases.find((c) => c.slug === slug);
