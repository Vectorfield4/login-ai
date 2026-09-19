import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { server } from "./server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Тесты всегда стартуют с русской локали; localStorage очищается между тестами
beforeEach(() => {
  window.localStorage.clear();
});

// jsdom не реализует scroll (ScrollRestoration React Router вызывает window.scrollTo)
Object.defineProperty(window, "scrollTo", {
  value: () => {},
  writable: true,
});
