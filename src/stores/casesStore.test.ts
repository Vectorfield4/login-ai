import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCases } from "../api/cases";
import { caseFixtures } from "../mocks/fixtures/cases";
import {
  getCaseBySlug,
  getCases,
  selectCaseBySlug,
  selectCases,
  useCasesStore,
} from "./casesStore";

vi.mock("../api/cases", () => ({ fetchCases: vi.fn() }));

const fetchCasesMock = vi.mocked(fetchCases);

const resetStore = () => {
  useCasesStore.setState({ cases: caseFixtures, status: "idle", error: null });
};

beforeEach(() => {
  vi.clearAllMocks();
  fetchCasesMock.mockResolvedValue(caseFixtures);
  resetStore();
});

describe("casesStore", () => {
  it("синхронно инициализируется дефолтными данными (seed)", () => {
    expect(useCasesStore.getState().status).toBe("idle");
    expect(useCasesStore.getState().error).toBeNull();
    expect(useCasesStore.getState().cases).toEqual(caseFixtures);
  });

  it("селекторы выбирают список и кейс по slug", () => {
    const state = useCasesStore.getState();
    expect(selectCases(state)).toEqual(caseFixtures);
    expect(selectCaseBySlug(state.cases, "reputation-monitoring-platform")).toBe(caseFixtures[6]);
    expect(selectCaseBySlug(state.cases, "unknown-slug")).toBeUndefined();
    expect(getCases()).toEqual(caseFixtures);
    expect(getCaseBySlug("retail-support-bot")).toBe(caseFixtures[0]);
    expect(getCaseBySlug()).toBeUndefined();
  });

  it("loadCases() при успехе переписывает кейсы и ставит status=ready", async () => {
    useCasesStore.setState({ cases: [] });
    await useCasesStore.getState().loadCases();

    const state = useCasesStore.getState();
    expect(state.cases).toEqual(caseFixtures);
    expect(state.status).toBe("ready");
    expect(state.error).toBeNull();
  });

  it("loadCases() при ошибке ставит status=error и сохраняет причину", async () => {
    useCasesStore.setState({ cases: [] });
    fetchCasesMock.mockRejectedValueOnce(new Error("network down"));

    await useCasesStore.getState().loadCases();

    const state = useCasesStore.getState();
    expect(state.cases).toEqual([]);
    expect(state.status).toBe("error");
    expect(state.error).toBe("network down");
  });

  it("hydrate() идемпотентен: не перезагружает готовые данные", async () => {
    useCasesStore.setState({ cases: caseFixtures, status: "ready" });
    await useCasesStore.getState().hydrate();

    expect(fetchCasesMock).not.toHaveBeenCalled();
    expect(useCasesStore.getState().status).toBe("ready");
  });

  it("hydrate() подгружает данные, когда слой пуст/idle", async () => {
    useCasesStore.setState({ cases: [], status: "idle" });
    await useCasesStore.getState().hydrate();

    expect(fetchCasesMock).toHaveBeenCalledTimes(1);
    expect(useCasesStore.getState().cases).toEqual(caseFixtures);
    expect(useCasesStore.getState().status).toBe("ready");
  });
});
