import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchSolutions } from "../api/solutions";
import { solutionFixtures } from "../mocks/fixtures/solutions";
import {
  getSolutionBySlug,
  getSolutions,
  selectSolutionBySlug,
  selectSolutions,
  useSolutionsStore,
} from "./solutionsStore";

vi.mock("../api/solutions", () => ({ fetchSolutions: vi.fn() }));

const fetchSolutionsMock = vi.mocked(fetchSolutions);

const resetStore = () => {
  useSolutionsStore.setState({ solutions: solutionFixtures, status: "idle", error: null });
};

beforeEach(() => {
  vi.clearAllMocks();
  fetchSolutionsMock.mockResolvedValue(solutionFixtures);
  resetStore();
});

describe("solutionsStore", () => {
  it("синхронно инициализируется дефолтными решениями (seed)", () => {
    expect(useSolutionsStore.getState().status).toBe("idle");
    expect(useSolutionsStore.getState().error).toBeNull();
    expect(useSolutionsStore.getState().solutions).toEqual(solutionFixtures);
  });

  it("селекторы выбирают решения и находят по slug", () => {
    expect(selectSolutions(useSolutionsStore.getState())).toEqual(solutionFixtures);
    expect(getSolutions()).toEqual(solutionFixtures);
    expect(selectSolutionBySlug(solutionFixtures, "computer-vision")?.slug).toBe("computer-vision");
    expect(getSolutionBySlug("computer-vision")?.slug).toBe("computer-vision");
    expect(getSolutionBySlug("undefined-slug")).toBeUndefined();
  });

  it("loadSolutions() при успехе переписывает решения и ставит status=ready", async () => {
    useSolutionsStore.setState({ solutions: [] });
    await useSolutionsStore.getState().loadSolutions();

    const state = useSolutionsStore.getState();
    expect(state.solutions).toEqual(solutionFixtures);
    expect(state.status).toBe("ready");
    expect(state.error).toBeNull();
  });

  it("loadSolutions() при ошибке ставит status=error и сохраняет причину", async () => {
    useSolutionsStore.setState({ solutions: [] });
    fetchSolutionsMock.mockRejectedValueOnce(new Error("network down"));

    await useSolutionsStore.getState().loadSolutions();

    const state = useSolutionsStore.getState();
    expect(state.solutions).toEqual([]);
    expect(state.status).toBe("error");
    expect(state.error).toBe("network down");
  });

  it("hydrate() идемпотентен: не перезагружает готовые данные", async () => {
    useSolutionsStore.setState({ solutions: solutionFixtures, status: "ready" });
    await useSolutionsStore.getState().hydrate();

    expect(fetchSolutionsMock).not.toHaveBeenCalled();
    expect(useSolutionsStore.getState().status).toBe("ready");
  });

  it("hydrate() подгружает решения, когда слой пуст/idle", async () => {
    useSolutionsStore.setState({ solutions: [], status: "idle" });
    await useSolutionsStore.getState().hydrate();

    expect(fetchSolutionsMock).toHaveBeenCalledTimes(1);
    expect(useSolutionsStore.getState().solutions).toEqual(solutionFixtures);
    expect(useSolutionsStore.getState().status).toBe("ready");
  });
});
