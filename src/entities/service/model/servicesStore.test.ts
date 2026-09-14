import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchServices } from "@/entities/service/api/services";
import {
  getServiceBySlug,
  getServices,
  selectServiceBySlug,
  selectServices,
  useServicesStore,
} from "@/entities/service/model/servicesStore";
import { serviceFixtures } from "@/shared/mocks/fixtures/services";

vi.mock("../api/services", () => ({ fetchServices: vi.fn() }));

const fetchServicesMock = vi.mocked(fetchServices);

const resetStore = () => {
  useServicesStore.setState({ services: serviceFixtures, status: "idle", error: null });
};

beforeEach(() => {
  vi.clearAllMocks();
  fetchServicesMock.mockResolvedValue(serviceFixtures);
  resetStore();
});

describe("servicesStore", () => {
  it("синхронно инициализируется дефолтными услугами (seed)", () => {
    expect(useServicesStore.getState().status).toBe("idle");
    expect(useServicesStore.getState().error).toBeNull();
    expect(useServicesStore.getState().services).toEqual(serviceFixtures);
  });

  it("селекторы выбирают услуги и находят по slug", () => {
    expect(selectServices(useServicesStore.getState())).toEqual(serviceFixtures);
    expect(getServices()).toEqual(serviceFixtures);
    expect(selectServiceBySlug(serviceFixtures, "software-development")?.slug).toBe(
      "software-development",
    );
    expect(getServiceBySlug("software-development")?.slug).toBe("software-development");
    expect(getServiceBySlug("undefined-slug")).toBeUndefined();
  });

  it("loadServices() при успехе переписывает услуги и ставит status=ready", async () => {
    useServicesStore.setState({ services: [] });
    await useServicesStore.getState().loadServices();

    const state = useServicesStore.getState();
    expect(state.services).toEqual(serviceFixtures);
    expect(state.status).toBe("ready");
    expect(state.error).toBeNull();
  });

  it("loadServices() при ошибке ставит status=error и сохраняет причину", async () => {
    useServicesStore.setState({ services: [] });
    fetchServicesMock.mockRejectedValueOnce(new Error("network down"));

    await useServicesStore.getState().loadServices();

    const state = useServicesStore.getState();
    expect(state.services).toEqual([]);
    expect(state.status).toBe("error");
    expect(state.error).toBe("network down");
  });

  it("hydrate() идемпотентен: не перезагружает готовые данные", async () => {
    useServicesStore.setState({ services: serviceFixtures, status: "ready" });
    await useServicesStore.getState().hydrate();

    expect(fetchServicesMock).not.toHaveBeenCalled();
    expect(useServicesStore.getState().status).toBe("ready");
  });

  it("hydrate() подгружает услуги, когда слой пуст/idle", async () => {
    useServicesStore.setState({ services: [], status: "idle" });
    await useServicesStore.getState().hydrate();

    expect(fetchServicesMock).toHaveBeenCalledTimes(1);
    expect(useServicesStore.getState().services).toEqual(serviceFixtures);
    expect(useServicesStore.getState().status).toBe("ready");
  });
});
